import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {auth, db, storage} from '../../firebase/config'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

class AgregarImagen extends Component {

    constructor(){
        super()
        this.state={
            description:'',
            foto: ''
        }
    }

    enviarPost(description, foto){
        console.log(description, foto, 'sent')
        console.log(auth.currentUser.email, description, foto, 'enviarpost')
        db.collection('posts').add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            description: description,
            likes:[],
            comments:[],
            foto : foto
        })
        .then(resp => {
            this.props.navigation.navigate('Home')
        })
        .then(resp => console.log('hizo el posteo'))
        .catch(err => console.log(err))

    }
 
    pickImage = async () => {
        let results = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1],
        })
        
        this.handleImagePicked(results);
       }

    handleImagePicked = async (results) => {
        try {
          if (!results.cancelled) {
            this.aceptarImagen(results.uri);
          }
        } catch (e) {
          console.log(e);
          alert("Image upload failed");
        }
    };

    aceptarImagen(){
        console.log('efecutado')
        fetch(this.state.foto)
        .then(res => res.blob())
        .then(imagen => {
            const ref = storage.ref(`fotos/${Date.now()}.jpg`)
            ref.put(imagen)
            .then(()=> {
                ref.getDownloadURL()
                .then((url)=> this.cuandoSubaLaImagen(url))
                .catch(err => console.log(err))
            })
  
        })
        .catch(err => console.log(err))
    }
    cuandoSubaLaImagen(url){
        console.log('url, ', url)
        this.setState({
            foto: url,
            mostrarCamara:false,
            
        })
    }
    render() {
        return (
            <View style = {styles.container}>
            
                <View>
                    <TouchableOpacity onPress={() => this.pickImage()}>
                        <Text style={styles.texto}><MaterialIcons name="add-photo-alternate" size={24} color="white"/> Agregar foto de la galeria</Text>
                    </TouchableOpacity>
                </View>
                        <View>
                <TextInput
                    keyboardType='default'
                    onChangeText={text => this.setState({description:text})}
                    value={this.state.description}
                    style={styles.input}
                    placeholder='Deja tu descripcion'
                />
                <TouchableOpacity
                onPress={()=> this.enviarPost(this.state.description, this.state.foto)}
              style={styles.botton} >
                    <Text  style={styles.texto}>Enviar Post</Text>
                </TouchableOpacity>
            
              </View>  
            
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        fontFamily: "CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif",
    textAlign: "center",
    fontWeight:"bold",
    },
    input:{
        borderWidth:1,
        height:48,
        fontFamily: "CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif",
    textAlign: "center",
    fontWeight:"bold",
    },
    mostrarCamara: {
        backgroundColor: 'rgb(20,150,20)',
        padding: 10,
        marginBottom: 15,
        fontFamily: "CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif",
    textAlign: "center",
    fontWeight:"bold",
    },
    mostrarCamaraTxt: {
        color: 'rgb(240,240,240)',
        fontFamily: "CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif",
    textAlign: "center",
    fontWeight:"bold",
    },
    botton: {
        width: "40",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
            backgroundColor: "#B5B2B2",
            padding: 10,
            marginLeft: 20,
    },
    texto:{
        fontFamily: "CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif",
        textAlign: "center",
        fontWeight:"bold",
    }
  
})

export default AgregarImagen
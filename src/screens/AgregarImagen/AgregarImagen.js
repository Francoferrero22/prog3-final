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

    enviarPost(description){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            description: description,
            likes:[],
            comments:[],
            foto : this.props.id
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
        fetch(this.state.foto)
        .then(res => res.blob())
        .then(imagen => {
            const ref = storage.ref(`fotos/${Date.now()}.jpg`)
            ref.put(imagen)
            .then(()=> {
                ref.getDownloadURL()
                .then((url)=> this.props.cuandoSubaLaImagen(url))
                .catch(err => console.log(err))
            })
  
        })
        .catch(err => console.log(err))
    }
    cuandoSubaLaImagen(url){
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
                        <Text><MaterialIcons name="add-photo-alternate" size={24} color="white"/> Agregar foto de la galeria</Text>
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
                    <Text>Enviar Post</Text>
                </TouchableOpacity>
            
              </View>  
            
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    input:{
        borderWidth:1,
        height:48
    },
    mostrarCamara: {
        backgroundColor: 'rgb(20,150,20)',
        padding: 10,
        marginBottom: 15,
    },
    mostrarCamaraTxt: {
        color: 'rgb(240,240,240)'
    },
    botton: {
        width: "80%",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
            backgroundColor: "blue",
            padding: 10,
            marginLeft: 20,
    }
})

export default AgregarImagen
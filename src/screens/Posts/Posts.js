import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {auth, db} from '../../firebase/config'
import Camara from '../../components/Camara/Camara'


class Posts extends Component {

    constructor(){
        super()
        this.state={
            description:'',
            mostrarCamara: true,
            foto: ''
        }
    }

    enviarPost(description){
        console.log(this.state.foto, 'foto url')
        db.collection('posts').add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            description: description,
            likes:[],
            comments:[],
            foto : this.state.foto
        })
        .then(resp => {
            this.props.navigation.navigate('Home')
        })
        .then(resp => console.log('hizo el posteo'))
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
             {
                this.state.mostrarCamara ?
                <Camara
                cuandoSubaLaImagen = {(url) => this.cuandoSubaLaImagen(url)}
                /> :
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
            }
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
    
})

export default Posts
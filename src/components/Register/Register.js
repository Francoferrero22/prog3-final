import { Text, View, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import {db , auth} from '../../firebase/config'
import Camara from '../Camara/Camara'

class Register extends Component {
    constructor(props){
        super(props)
        this.state ={
            props: props,
            email: '',
            user: '',
            password: '',
            bio: '',
            error:'',
            foto: {},

        }
    }
  
    onSubmit(email, user, password, bio, foto){
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(res => {
            db.collection('users').add({ 
                owner: auth.currentUser.email,
                userName: this.state.user,
                bio: this.state.bio,
                createdAt: Date.now(),
                foto: this.state.foto,
         })
        .then(() => { 
        this.props.navigation.navigate('Login') })
    })    
    .catch(error => this.setState({
        error: error.message
    }))
    }
   
    cuandoSubaLaImagen(url){
        this.setState({
            foto: url,
            mostrarCamara:false,
            
        })
    }
  
     
render() {
        return (

            
            <View style= {styles.container}>
                <Text style={styles.titulo}>Register</Text>
                {this.state.error !== '' ? <Text >{this.state.error}</Text> : null}
                <View style={styles.inputView}>
                <TextInput 
                style = {styles.TextInput}
                    keyboardType='email-address'
                    placeholder='Email'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email} />
                    </View>
                    <View style= {styles.inputView}>
                <TextInput 
                style = {styles.TextInput}
                    keyboardType='default'
                    placeholder='Usuario'
                    onChangeText={text => this.setState({ user: text })}
                    value={this.state.user} />
                    </View>
                <View style= {styles.inputView}>
                <TextInput 
                style = {styles.TextInput}
                    keyboardType='default'
                    placeholder='Contraseña'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password} />
                    </View>
                    <View style={styles.inputView}>
                <TextInput 
                style = {styles.TextInput}
                keyboardType='default'
                    placeholder='Bio'
                    onChangeText={text => this.setState({ bio: text })}
                    value={this.state.bio} />
                    </View>
                     { 
                    this.state.mostrarCamara ?
                  
                    <View style={{width:'100vw', height:'100vh'}}>
                        <Camara cuandoSubaLaImagen={url =>this.cuandoSubaLaImagen(url)}/>
                    </View>
             :
             <TouchableOpacity onPress={()=> this.setState({mostrarCamara: true})}>
                 <Text style={styles.texto}> Subir Imagen de Perfil</Text> 
          </TouchableOpacity>  }

     
 
 
 
 
 <TouchableOpacity onPress={()=>this.onSubmit()} style={styles.registerBtn}>
                    <Text style={styles.texto}>Registrarme</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.registerBtn}>
                    <Text style={styles.texto}>Si ya tenés un usuario, logueate acá</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titulo:{
        fontFamily: "CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif",
        textAlign: "center",
        fontWeight:"bold",
        fontSize:100
      },
      texto:{
        fontFamily: "CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif",
        textAlign: "center",
        fontWeight:"bold",
      },
    container:{
      flex: 1,
      justifyContent:'center',
      alignItems: 'center',
    
    },
      inputView: {
        backgroundColor: "blue",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        backgroundColor: "#B5B2B2",
        fontFamily: "CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif",
    textAlign: "center",
    fontWeight:"bold",
      },
      
      TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
        backgroundColor: "#B5B2B2",
        fontFamily: "CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif",
    textAlign: "center",
    fontWeight:"bold",
      },
      loginBtn: {
        width: "80",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        padding: 10,
        marginLeft: 20,
        backgroundColor: "#B5B2B2",
        
      },
registerBtn: {
    width: "80",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        padding: 10,
        marginLeft: 20,
        backgroundColor: "#B5B2B2",
        
}
  })




export default Register;
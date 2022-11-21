import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db , auth} from '../../firebase/config'


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

        }
    }

    onSubmit(){
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(res => {
            db.collection('users').add({ 
                owner: auth.currentUser.email,
                userName: this.state.user,
                bio: this.state.bio,
                createdAt: Date.now(),
/*                 photo: this.state.photo
 */        })
        .then(() => {
            this.setState({ 
            email: '',
            user: '',
            password: '',
            bio: '',
            error: ''
        })
        this.state.navigation.navigate('Login') })
    })    
    .catch(error => this.setState({
        error: error.message
    }))
    }
    

render() {
        return (

            
            <View style= {styles.container}>
                <Text>REGISTER</Text>
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
                <TouchableOpacity onPress={()=>this.onSubmit()} style={styles.registerBtn}>
                    <Text >Registrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.registerBtn}>
                    <Text >Si ya tenés un usuario, logueate acá</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: 'gray',
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
      },
      
      TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
      },
      loginBtn: {
        width: "80%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        backgroundColor: "blue",
        padding: 10,
        marginLeft: 20,
      },
registerBtn: {
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




export default Register;
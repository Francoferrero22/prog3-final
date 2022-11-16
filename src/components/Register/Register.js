import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'

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
                owner: this.state.email,
                userName: this.state.user,
                bio: this.state.bio,
                createdAt: Date.now(),
                photo: this.state.photo
        })
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
            <View >
                <Text>REGISTER</Text>
                {this.state.error !== '' ? <Text >{this.state.error}</Text> : null}
                <TextInput 
                    keyboardType='email-address'
                    placeholder='email'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email} />
                <TextInput 
                    keyboardType='default'
                    placeholder='usuario'
                    onChangeText={text => this.setState({ user: text })}
                    value={this.state.user} />
                <TextInput 
                    keyboardType='default'
                    placeholder='contraseña'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password} />
                <TextInput 
                    keyboardType='default'
                    placeholder='bio'
                    onChangeText={text => this.setState({ bio: text })}
                    value={this.state.bio} />
                <TouchableOpacity onPress={() => this.onSubmit()}>
                    <Text >Registrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text >Si ya tenés un usuario, logueate acá</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

        




export default Register;
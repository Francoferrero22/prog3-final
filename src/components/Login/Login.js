import { auth } from "../../firebase/config";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { Component } from 'react'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:''
        }
    }
    loguear(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then(resp => {
            this.props.navigation.navigate('TabNavigation')
        })
        .catch( err => console.log(err))
    }

render() {
    console.log(this.props)
    return (
      <View>
        <Text>Login</Text>
        <TextInput
            
            keyboardType='email-address'
            placeholder='Ingresa tu email'
            onChangeText={text => this.setState({email: text})}
            value={this.state.email}
        />
        <TextInput
           
            keyboardType='default'
            placeholder='Ingresa tu Password'
            onChangeText={text => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
        />
        <View>
            <TouchableOpacity onPress={()=> this.loguear(this.state.email, this.state.password)}>
                <Text>Log In</Text>
            </TouchableOpacity>
            <Text>
              Aun no tienes una cuenta
            </Text>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Register')}>
              <Text>Registrate</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('Home')}>
              <Text>Volver al home</Text>
            </TouchableOpacity>
        </View>
    )
  }
}


export default Login

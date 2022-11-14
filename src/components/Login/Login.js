import { auth } from "../../firebase/config";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { Component } from 'react'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:'',
            login: false
        }
    }
    onSubmit(email,password){
        auth.signInWithEmailAndPassword(email, password)
        .then(resp => {this.setState({login: true})
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
               style={styles.input}
            keyboardType='email-address'
            placeholder='Ingresa tu email'
            onChangeText={text => this.setState({email: text})}
            value={this.state.email}
        />
        <TextInput
              style={styles.input}
            keyboardType='default'
            placeholder='Ingresa tu Password'
            onChangeText={text => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
        />
        <View>
            <TouchableOpacity onPress={()=> this.onSubmit(this.state.email,this.state.password)}>
                <Text>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Register')}>
              <Text>Registrate</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
  }
}
const styles = StyleSheet.create({
    input:{
        borderWidth:1
    }
})

export default Login

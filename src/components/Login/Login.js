import { auth } from "../../firebase/config";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { Component } from 'react'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:'',
            login: false,
            error: ''
        }
    }
    onSubmit(email,password){
        auth.signInWithEmailAndPassword(email, password)
        .then(resp => {this.setState({login: true})
            this.props.navigation.navigate('TabNavigation')
        })
        .catch(error => this.setState({
            error: error.message
        }))
    }

render() {
    console.log(this.props)
    return (
      <View style={styles.container}>
        <Text style={styles.titu}>Login</Text>
        {this.state.error !== '' ? <Text >{this.state.error}</Text> : null}
        <View style= {styles.inputView}>
        <TextInput
               style={styles.TextInput}
            keyboardType='email-address'
            placeholder='Ingresa tu email'
            onChangeText={text => this.setState({email: text})}
            value={this.state.email}
        />
        </View>
        <View style= {styles.inputView}>
        <TextInput
              style={styles.TextInput}
            keyboardType='default'
            placeholder='Ingresa tu contraseña'
            onChangeText={text => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
        />
        </View>
        <View>
            <TouchableOpacity onPress={()=> this.onSubmit(this.state.email,this.state.password)} style={styles.loginBtn}>
                <Text>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Register')} style={styles.registerBtn}>
              <Text>Registrate</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
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
export default Login

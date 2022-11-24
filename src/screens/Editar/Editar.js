import { Text, View,StyleSheet,TextInput, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config';
import Perfil from '../../screens/Perfil/Perfil';

class Editar extends Component {
    constructor(props){
        super(props);
        this.state = {
           user: "",
           perfil: ""
           
        }
    }

    actualizar(){
      db.collection("users")
      .doc(this.props.route.params.id)
      .update({
        user: this.state.user,
        perfil: this.state.perfil
      })
      .then(()=>{
        {this.props.navigation.navigate("Perfil")}
      })
      .catch((error) => console.log(error))
    }
 

  render() {
    return (
      <View style={styles.container} >
        <TextInput 
        style = {styles.input}
        onChangeText={ (text) => this.setState({ user: text})}
        placeholder = "Editar nombre de usuario"
        value= {this.state.user}
        />
        <TextInput 
        style = {styles.input}
        onChangeText={ (text) => this.setState({ perfil: text})}
        placeholder = "Editar bio"
        value= {this.state.perfil}
        />
         <View>
            <TouchableOpacity  onPress={() => this.actualizar()}>
                <Text style = {styles.botonColor}> Cambiar</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
  }
}


export default Editar
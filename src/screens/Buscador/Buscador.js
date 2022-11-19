import { Text, View, StyleSheet, FlatList, TextInput } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from  '../../firebase/config'
import {Searchbar} from "react-native-paper"

class Buscador extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buscar: false,
            value: "",
            perfiles: [],
            perfilesFiltrados: [],
            error: ""
        }
    }

componentDidMount() {
    db.collection('users').onSnapshot
    
    docs => {

        let usuarios = []

        docs.forEach((doc) => {
            usuarios.push({
                id:doc.id,
                data:doc.data()
            })
        })

        this.setState({
            perfiles: usuarios, buscar: true
        })
    }
}

preventSubmit(e){
    e.preventDefault()

    this.setState({error: ""})

    let textoFilter = this.state.value.toLowerCase

    if (this.state.value === "") {
        this.setState({CampoNoVacio: "¡No puedes enviar un campo vacío!"})
    } else {
        this.setState({CampoNoVacio:""})

        let usuariosFiltrados = this.state.perfiles.filter(perfil => perfil.data.username?.toLowerCase().includes(textoFilter))

        if(usuariosFiltrados.length === 0)
        return this.setState({ error: "¡Ese usuario no existe!", usuariosFiltrados:[]})

        this.setState({ perfilesFiltrados: usuariosFiltrados})
    }
}

controlChanges(e){
    e.preventDefault()

    this.setState({error: ""})

    if(e.target.value === ""){
        this.setState({
            perfilesFiltrados: []
        })
    } else {

        let usuariosFiltrados = this.state.perfiles.filter(perfil => perfil.data.username?.toLowerCase().includes(textoFilter))

        if(usuariosFiltrados.length === 0)
        return this.setState({ error: "¡Ese usuario no existe!", usuariosFiltrados:[]})

        this.setState({ perfilesFiltrados: usuariosFiltrados})
    }
}

clear (){
    this.setState({
        buscar: false,
        value: "",
        result: [],
        usuariosFiltrados: []
    })
}


render() {
    return (
        <View style = {styles.Searchbar}>

            <Searchbar 
            style = {styles.inputSearch} placeholder="Buscar usuarios"
            onChangeText= {text => (this.setState({value: text}))}
            value={this.state.value}
            onChange={(e) => this.controlChanges}

            />

            <Text style={styles.error}> {this.state.CampoNoVacio}</Text>

            <Text>{this.state.usuariosFiltrados}</Text>

            <FlatList

                data={this.state.usuariosFiltrados}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => 

                <View style = {styles.conteiner}>
                    <Image source={item.data.photo}
                           style={styles.image} />
                    <Text style={styles.textName}> {this.data.username}</Text>
                </View>
               }
            />

        </View>
    )
}
}

const styles = StyleSheet.create({

    Searchbar:{
        textAlign: "center"
    },

    inputSearch:{
        color: "#2d2d2e"


    },

})

export default Buscador
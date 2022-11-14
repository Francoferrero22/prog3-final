import { Text, View, TouchableOpacity, StyleSheet, TextInput, FlatList, TextInput } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from  '../../firebase/config'
import Posts from '../Posts/Posts'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

class Buscador extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buscar: "",
            posts: []
        }
    }

filter() {
    db.collection('posts')
    .where('user', '==', this.state.search)
    .orderBy('createdAt', 'desc')
    .onSnapshot((docs) => {

        let posteos = []

        docs.forEach((doc) => {
            posteos.push({
                id:doc.id,
                data:doc.data()
            })
        })

        this.setState({
            posts: posteos
        })
    })
}

render() {
    return (
        <View style = {StyleSheet.background}>

            <TextInput
            style={StyleSheet.buscar}
            onChangeText={(buscarText)=>
            
                this.setState({buscar:buscarText})}
            
            placeholder="buscar"
            keyboardType='email-adress'>

            </TextInput>

            <TouchableOpacity onPress={()=> this.filter()}>

               <FontAwesomeIcon icon={faSearch}>
                  <Text> Buscar </Text>
               </FontAwesomeIcon>

            </TouchableOpacity>

            <FlatList

                data={this.state.posts}
                keyExtractor={(post) => post.id}
                renderItem={({ item }) => 
                <Posts postData={item} />}

            ></FlatList>

        </View>
    )
}
}

const styles = StyleSheet.create({
    background:{
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center'
    },

    buscar:{

        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: "#23a456"
    }
})

export default Buscador
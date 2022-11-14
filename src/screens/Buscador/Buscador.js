import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from  '../../firebase/config'
import Posts from '../Posts/Posts'

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

}
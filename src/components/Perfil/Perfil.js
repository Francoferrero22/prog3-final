import React, { Component } from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AsyncStorage from '@react-native-async-storage/async-storage'
import { db } from '../../firebase/config';
import Posts from '../Posts/Posts'

const Stack = createNativeStackNavigator();

class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posteos: [],
            username:'',
            email:'',
            bio: '', 
            foto: '',
            cantidadPosts: '',
            miPerfil: false,    
        }
    }


    async componentDidMount() {
        const username = await this.getRememberedUser();
        this.setState({
            username: username || '',
            rememberMe: username ? true : false
        });
        
    }
    getRememberedUser = async () => {
        try {
            console.log('asd')
            // const username = await AsyncStorage.getItem('10');
            /*if (username !== null) {

                 db.FindBy(username)
    
                
            } */
            
        } catch (error) {

        }
    }

   

    render() {
        return (
            <View>
             <Text>Mi perfil </Text>
            <Text> {this.state.username}</Text>
            <Text> {this.state.bio}</Text>
            <Text> {this.state.foto}</Text>
            <Text> {this.state.cantidadPosts}</Text>
            {this.state.posteos && this.state.posteos.length > 0 && 
            <FlatList
                data={this.state.posts}
                keyExtractor={(post) => post.id}
                renderItem={({ item }) => 
                <Posts postData={item}  />}

                ></FlatList>}
            <Text> </Text>
            <Text> </Text>
            <Text> </Text>

            
            </View>

        )
    }







}
const style = StyleSheet.create({
    container: {

        textAlign: 'center',
        padding: '10px',
        width: '100%',
        height: '100%',
        padding: '4px',
        backgroundColor: 'blue',


    },
    zona: {

        borderColor: 'white'
    }
})

export default Perfil;
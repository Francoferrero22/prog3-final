import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import { db } from '../../firebase/config';
//import avatar from '../../assets/avatar.jpeg';
import Posts from '../../components/Posts/Posts'
import {FontAwesome} from '@expo/vector-icons'

class PerfilUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUsuario: {},
            props: props,
            posteos: []
        }
    }


    componentDidMount() {
        console.log(this.props, this.props.route, 'data ruta')
    
        db.collection('users').where('owner', '==', this.props.route.params.email).onSnapshot(
            docs => {
                docs.forEach(doc => {
                    this.setState({
                        dataUsuario: doc.data()
                    })
                })
            })

        db.collection('posts').where('owner', '==', this.props.route.params.email).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                });
                this.setState({
                    posteos: posts
                })
            }
        )

        console.log(this.state.dataUsuario, this.state.posteos)

    }

    render() {
        return (
            <View style={style.container}>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeNavigation')}>
                        <FontAwesome name='backward' color='black' size={16} />
                    </TouchableOpacity>
                
                <View style={style.containerPic}>
                    <Image
                        style={style.image}
                        source={this.state.dataUsuario.photo === '' ? avatar : this.state.dataUsuario.photo}
                    />
                    <View style={style.containerText}>
                        <Text style={style.username}>{this.state.dataUsuario.userName}</Text>
                        <Text style={style.username}>{this.state.dataUsuario.owner}</Text>
                        {this.state.dataUsuario.bio != '' ? 
                                <Text style={style.bio}>{this.state.dataUsuario.bio}</Text>
                            : null}
                        <Text style={style.bio}>Cantidad de posteos: {this.state.posteos.length}</Text>
                        <FlatList
                            data={this.state.posteos}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({item}) => <Posts navigation={this.props.navigation} id={item.id} data={item.data} profile={true} />}
                        />
                    </View>
                </View>
                
                
             
            </View>

        )
    }







}
const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: 'rgb(0,0,0)'
    },
    back:{
        marginBottom: 15,
        marginTop: 10,
        marginLeft: 10
    },
    image: {
        width: 100,
        height: 100
    },
    containerPic: {
        flex: 2,
        flexDirection: 'row'
    },
    containerText: {
        margin: 15,
        width: '70vw',
        flexGrow: 1,
        flex: 1
    },
    username: {
        fontSize: 20,
        fontWeight: '600',
        color: 'rgb(255,255,255)'
    },
    bio: {
        fontSize: 16,
        color: 'rgb(255,255,255)'
    },
    posteos: {
        marginTop: 120
    },
    logout: {
        color: '#0d9900'
    }
})

export default PerfilUsuario;
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import { auth, db } from '../../firebase/config';
import avatar from '../../../assets/avatar.png';
import Posts from '../../components/Posts/Posts'
import {FontAwesome} from '@expo/vector-icons'



class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUsuario: {},
            props: props,
            posteos: [],
            miPerfil:{}
        }
    }


    componentDidMount() {
      
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                docs.forEach(doc => {
                    this.setState({
                        dataUsuario: doc.data()
                    })
                })
            })

        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
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

    }
    


    logout(){
        auth.signOut()
        .then(()=> this.props.navigation.navigate('Login'))
    }



    render() {
        return (
            <View style={style.container}>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeNavigation')}>
                        <FontAwesome name='backward' color='black' size={25} />
                    </TouchableOpacity>
                    
                <View style={style.containerPic}>
                    <Image
                        style={style.image}
                        source={ ! this.state.dataUsuario.foto ? avatar : this.state.dataUsuario.foto}
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
                            renderItem={({item}) => <Posts navigation={this.props.navigation} id={item.id} data={item.data} Perfil={true} />}
                        />
                        <TouchableOpacity onPress={() => this.logout()}>
                            <Text style={style.logout}>Cerrar sesión</Text>
                        </TouchableOpacity>
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
        fontFamily: "CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif",
    
    },

    image:{
        width:50,
        height:50,
        

    },
    
    containerPic: {
        flex: 2,
        flexDirection: 'row',
        width:350,
        height:600,
        textAlign:"center",
        marginLeft:400

    
    },
    containerText: {
        margin: 15,
        width: '70vw',
        flexGrow: 1,
        flex: 1,
        textAlign:"center"

        

    },
    username: {
        fontSize: 20,
        fontWeight: '600',
        color: 'rgb(0,0,0)',
        textAlign:"center"
    },
    bio: {
        fontSize: 16,
        color: 'rgb(0,0,0)',
        textAlign:"center"
    },
    posteos: {
        marginTop: 120,
        textAlign:"center"
    },
    logout: {
        color: 'black',
        fontFamily: "CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif",
        fontWeight:"bold",
        fontSize: 20,

    },
})
export default Perfil;


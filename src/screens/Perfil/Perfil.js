import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import { auth, db } from '../../firebase/config';
import avatar from '../../../assets/avatar.png';
import Posts from '../../components/Posts/Posts'


class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUsuario: {},
            props: props,
            posteos: []
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
                <View style={style.containerPic}>
                    <Image
                        style={style.image}
                        source={this.state.dataUsuario.foto === '' ? avatar : this.state.dataUsuario.foto}
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
        //backgroundColor: 'rgb(0,0,0)'
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
        color: 'rgb(0,0,0)'
    },
    bio: {
        fontSize: 16,
        color: 'rgb(0,0,0)'
    },
    posteos: {
        marginTop: 120
    },
    logout: {
        color: '#0d9900'
    }
})
export default Perfil;


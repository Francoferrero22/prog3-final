import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import { db } from '../../firebase/config';
//import avatar from '../../assets/avatar.jpeg';


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

    }

    render() {
        return (
            <View style={style.container}>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('TabNavigation')}>
                    
                </TouchableOpacity>
                <View style={style.containerPic}>
                    <Image
                        style={style.image}
                        source={this.state.dataUsuario.photo === '' ? avatar : this.state.dataUsuario.photo}
                    />
                    <View style={style.containerText}>
                        <Text style={style.username}>{this.state.dataUsuario.userName}</Text>
                        {this.state.dataUsuario.bio != '' ? 
                                <Text style={style.bio}>{this.state.dataUsuario.bio}</Text>
                            : null}
                        <Text style={style.bio}>Cantidad de posteos: {this.state.posteos.length}</Text>
                    </View>
                </View>
                
                
                <FlatList 
                        style={style.posteos}
                        data={this.state.posteos}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => <Card data={item}/>}
                />
            </View>

        )
    }







}


export default PerfilUsuario;
import { Text, View, FlatList, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import {db} from  '../../firebase/config'
import {FontAwesome} from '@expo/vector-icons'


class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state =
            {usuarios: [],
            buscar: "",
            usuarioFiltrado: [],
            busco: false
        }
            
        }
        componentDidMount(){
            db.collection('users').onSnapshot(docs => {
                let users = []
                docs.forEach(doc => {
                  users.push({
                    id: doc.id,
                    data: doc.data()
                  })
                })
                this.setState({
                  usuarios: users,
                },
                () => console.log(this.state.usuarios)
                )
              })
            }

            prevenirRefresch(event) {
                event.preventDefault();
            }

            filtrarUsuarios(){
                console.log(this.state.buscar)
                let usuariosfiltrados = this.state.usuarios.filter((usuario) => usuario.data.userName.toLowerCase().includes(this.state.buscar.toLowerCase()))
                console.log(usuariosfiltrados)

                this.setState({
                    usuarioFiltrado: usuariosfiltrados,
                    busco: true
                  })

            }
    
            
            
            render() {

                console.log(this.state.usuarioFiltrado)
                return (
                    <View >


                    <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeNavigation')}>
                        <FontAwesome name='backward' color='black' size={16} />
                    </TouchableOpacity>

                        <TextInput
                            
                            keyboardType='default'
                            placeholder='Busca aca!'
                            onChangeText={text => this.setState({buscar: text})}
                            value={this.state.buscar}
                        />
                            <TouchableOpacity onSubmit={event => this.prevenirRefresch(event)}
                            onPress={() => this.filtrarUsuarios()}>
                                <Text>Search</Text>
                            </TouchableOpacity>

                            {this.state.busco == false ? <Text></Text> : this.state.usuarioFiltrado.length == 0 ? 
                            <Text>No existen usuarios con ese nombre</Text>

                         : <FlatList
                            data={this.state.usuarioFiltrado}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({item}) =>  <TouchableOpacity onPress={() => this.props.navigation.navigate('PerfilUsuario', {email: item.data.owner})}> <Text> Encontramos al usuario: {item.data.owner}</Text></TouchableOpacity>}
                          />}

                            
                      
                    </View>
                );
                }
               }
        //      const styles = StyleSheet.create({
                 
        //  })


        
export default Buscador
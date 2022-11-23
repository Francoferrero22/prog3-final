import { Text, View, FlatList, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import {db} from  '../../firebase/config'
import {FontAwesome} from '@expo/vector-icons'
import { ThemeProvider } from '@react-navigation/native';


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
             const styles = StyleSheet.create({
        //         container:{
        //             flex:1,
        //             justifyContent:'center',
        //             alignItems:'center', 
        //             backgroundColor: '#8fbc8f', 
        //           },
        //         input:{
        //             borderWidth:2,
        //             height:40,
        //             width:'90%',
        //             borderRadius:20,
        //             borderColor:'black',
        //             padding:10,
        //             margin:10
        //         },
        //         to:{
        //             width:200,
        //             height:50,
        //             margin: 5,
        //             backgroundColor:'#9370db',
        //             textAlign:'center',
        //             borderRadius:40,
        //             alignItems:'center',
        //             justifyContent:'center',
        //             marginTop:10, 
        //             borderColor:'black',
        //             borderWidth:2,
                
        //         },
        //         bold:{
        //             fontWeight: 'bold'
            
        //         }
         })


        
export default Buscador
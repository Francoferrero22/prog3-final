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
                    <View  >


                    <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeNavigation')}>
                        <FontAwesome name='backward' color='black' size={25} />
                    </TouchableOpacity>

                    <View style={styles.todo}>

                        <TextInput
                            
                            keyboardType='default'
                            placeholder='Busca aca!'
                            onChangeText={text => this.setState({buscar: text})}
                            value={this.state.buscar}
                            style={styles.inputSearch}
                        />
                            <TouchableOpacity onSubmit={event => this.prevenirRefresch(event)}
                            onPress={() => this.filtrarUsuarios()} style={styles.button}>
                                <Text style={styles.search}>Search</Text>
                            </TouchableOpacity>

                            {this.state.busco == false ? <Text></Text> : this.state.usuarioFiltrado.length == 0 ? 
                            <Text style={styles.search2}>No existen usuarios con ese nombre</Text>

                         : <FlatList
                            data={this.state.usuarioFiltrado}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({item}) =>  <TouchableOpacity onPress={() => this.props.navigation.navigate('PerfilUsuario', {email: item.data.owner})} > <Text style={styles.search2}> Encontramos al usuario: {item.data.owner}</Text></TouchableOpacity>}
                          />}

                    </View>   
                      
                    </View>
                );
                }
               }

               
          const styles = StyleSheet.create({
                todo:{
                    fontFamily: "CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif",
                    textAlign: "center",
                    marginTop: 40,
                    fontWeight:"bold"
                  },
                  search:{
                    fontWeight:"bold"
                  },
                  search2:{
                    fontWeight:"bold",
                    marginTop:20,
                  },
                  inputSearch: {
                    width: 300,
                    flex: 0.3,
                    backgroundColor: "white",
                    borderWidth: 1.5,
                    borderRadius: 20,
                    textAlign:"center",
                    marginLeft:450,
                    size: 40,
                    fontWeight:"bold"
                  },
                  button: {
                    backgroundColor: "#B5B2B2",
                    borderBottomWidth: 2,
                    borderRadius: 30,
                    shadowColor: "#422800",
                    shadowRadius: 4,
                    color: "#422800",
                    marginTop: 30,
                    width: 180,
                    height: 25,
                    marginLeft: 510,
                    fontWeight:"bold"
                    
                  },
                  titulo:{
                    fontSize: 30,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 40
                
                  },
          })


        
export default Buscador
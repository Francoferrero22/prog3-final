import { Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import {db} from  '../../firebase/config'


class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state =
            {usuarios: [],
            valorInput: ""};
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
            controlarCambiosDelInput(event) {
                this.setState({valorInput: event.target.value}, ()=> this.props.filtrar(this.state.valorInput));
            }
            render() {
                return (
                    <View >
                        <TextInput
                            
                            keyboardType='default'
                            placeholder='Busca aca!'
                            onChangeText={text => this.setState({buscar: text})}
                            valorInput={this.state.buscar}
                        />
                            <TouchableOpacity onSubmit={event => this.prevenirRefresch(event)} onChange={(event=> this.controlarCambiosdelInput(event))} value={this.state.valorInput}>
                                <Text>Search</Text>
                            </TouchableOpacity>
                      
                    </View>
                );
                }
               }
        //     const styles = StyleSheet.create({
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
        // })


        
export default Buscador
import { Text, View, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from  '../../firebase/config'
import firebase from 'firebase'
import {FontAwesome} from '@expo/vector-icons'



class Comments extends Component {
    constructor(props){
        super(props) 
        this.state = {
            nuevoComentario:'',
            id:'',
            data:{},
          }
    }

    componentDidMount () {
        db.collection("posts")
        .doc(this.props.route.params.id)
        .onSnapshot(doc => {
            this.setState({
                id: doc.id,
                data: doc.data()
            }, () => console.log(this.state.data))
            console.log(doc)
        })

    }

    
    addComentario(idDoc, text){
        if (this.state.nuevoComentario === "" || this.state.nuevoComentario === false) {
            alert("¡No puedes enviar un campo vacío!")
        }else{
             db.collection('posts')
        .doc(idDoc)
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            comment: text
          })
        })

        .then(()=> (this.setState({comments: ''})))
        .catch(err => console.log(err))
        }
       
      }

     

    render() {
        console.log(this.props)
        return (
            <View>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeNavigation')}>
            <FontAwesome name='backward' color='black' size={16} />
            </TouchableOpacity>

        <Text>Comentarios de esta publicación</Text>
        <View>
          <FlatList
          data={this.state.data.comments}
          keyExtractor={item => item.createdAt.toString()}
          renderItem={({item}) => <View>
            <Text>{item.owner} comentó: </Text>
            <Text>{item.comment}</Text>
          </View>
            }
          />
        </View>
        <View>
          <TextInput
            onChangeText={text => this.setState({nuevoComentario: text})}
             style = {styles.input}
            keyboardType='default'
            placeholder='Hacé tu comentario!'
            value={this.state.nuevoComentario}
          />
          <TouchableOpacity onPress={()=> this.addComentario(this.state.id, this.state.nuevoComentario)}>
            <Text>Enviar comentario</Text>
          </TouchableOpacity>
        </View>
      </View>
      
        )

    }
}

 const styles = StyleSheet.create({
    input: {
        borderWidth:1,
        height:32
      }
  })

 export default Comments
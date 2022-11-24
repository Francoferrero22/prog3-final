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
            comentariosOrdenados:[],
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
            }, () => this.ordenarComentario())
            console.log(doc)
        })

        

    }

     ordenarComentario(){
      
       let comentariosOrdenados = []
       let comentariosAscendentes = this.state.data?.comments?.map((comentario)=>comentario.createdAt)

       

       comentariosAscendentes?.sort()
       comentariosAscendentes?.reverse()
       comentariosAscendentes?.map((comentario)=>(
          comentariosOrdenados= comentariosOrdenados?.concat(this.state.data?.comments?.filter((nuevoComentario) => nuevoComentario.createdAt?.toString().includes(comentario?.toString()) ))
         ))

         
         
     this.setState({
       comentariosOrdenados:comentariosOrdenados
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
            comment: text,
          })
        })
        }
       
    }

    

    render() {
      console.log(this.state.comentariosOrdenados)
      console.log(this.state.data.comments)
        return (
            <View>

            <TouchableOpacity style={styles.itemContainer} onPress={() => this.props.navigation.navigate('HomeNavigation')}>
            <FontAwesome name='backward' color='black' size={16} />
            </TouchableOpacity>

        <Text style={styles.titulo}>Comentarios de esta publicación</Text>
        <View>

          <FlatList
          data={this.state.comentariosOrdenados}
          keyExtractor={item => item.createdAt.toString()}
          renderItem={({item}) => <View>
            <Text>{item.owner} comentó: </Text>
            <Text>{item.comment}</Text>
          </View>
            }
          />
        </View>
        <View>

          {this.state.data?.comments?.length === 0 ?

          <><Text>Aún no hay comentarios, ¡sé el primero!</Text><TextInput
                  onChangeText={text => this.setState({ nuevoComentario: text })}
                  style={styles.inputSearch}
                  keyboardType='default'
                  placeholder='Hacé tu comentario!'
                  value={this.state.nuevoComentario} /></>

          :

          <TextInput
            onChangeText={text => this.setState({nuevoComentario: text})}
            style={styles.inputSearch}
            keyboardType='default'
            placeholder='Hacé tu comentario!'
            value={this.state.nuevoComentario}
          />
        }
          
          <TouchableOpacity onPress={()=> this.addComentario(this.state.id, this.state.nuevoComentario)} style={styles.button}>
            <Text>Enviar comentario</Text>
          </TouchableOpacity>
        </View>
      </View>
      
        )

    }
}

 const styles = StyleSheet.create({

  inputSearch: {
    width: 400,
    height: 30,
    borderBottomColor: "brown"


  }



  


  })

 export default Comments
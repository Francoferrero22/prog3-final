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
            <FontAwesome name='backward' color='black' size={25} />
            </TouchableOpacity>

        <View style={styles.todo}>

        <Text style={styles.titulo}>Comentarios de esta publicación</Text>


          <FlatList
          style ={styles.flatlist}
          data={this.state.comentariosOrdenados}
          keyExtractor={item => item.createdAt.toString()}
          renderItem={({item}) => <View>
            <Text style ={styles.flatlist1} >{item.owner} comentó: </Text>
            <Text style ={styles.flatlist2}>{item.comment}</Text>
          </View>
            }
          />
        </View>
        <View>

          {this.state.data?.comments?.length === 0 ?

          <><Text style = {styles.textito}>Aún no hay comentarios, ¡sé el primero!</Text><TextInput
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
            <Text style={styles.titulo2}>Enviar comentario</Text>
          </TouchableOpacity>
        </View>
      </View>
      
        )

    }
}

 const styles = StyleSheet.create({

  todo:{
    fontFamily: "CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif",
    textAlign: "center",
    marginTop: 40,
  },
  inputSearch: {
    width: 300,
    flex: 0.3,
    backgroundColor: "white",
    borderWidth: 1.5,
    borderRadius: 20,
    textAlign:"center",
    marginLeft:450,
    size: 40
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
    
  },
  titulo:{
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40

  },
  titulo2:{
    fontSize: 17,
    fontWeight: "550",
    textAlign: "center",

  },
  itemContainer:{
    marginLeft: 30,
    marginTop: 30
  },
  textito:{
    textAlign:"center",
    marginBottom: 20
  },
  flatlist1:{
    marginBottom:20,

  },
  flatlist2:{
    marginBottom:20,
    fontWeight: "800"
    
  }




  


  })

 export default Comments
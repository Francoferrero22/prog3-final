import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth} from '../../firebase/config';
import {FontAwesome} from '@expo/vector-icons' 
import firebase from 'firebase'

class Posts extends Component {

  constructor(props){
    super(props)
    this.state = {
        likesCount:props.data.likes.length,
        commentCount: props.data.comments.length,
        isMyLike: false
    }
}

componentDidMount(){
  let myLike = this.props.data.likes.includes(auth.currentUser.email)
  if(myLike){
    this.setState({
      isMyLike:true
    })
  }
}

like(){ 
  db.collection('posts')
  .doc(this.props.id)
  .update({
    likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
  })
  .then(()=> {
    this.setState({
      isMyLike:true,
      likesCount: this.state.likesCount + 1
    })
  })
  .catch(err => console.log(err))

}

unlike(){
  db.collection('posts')
  .doc(this.props.id)
  .update({
    likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
  })
  .then(()=> {
    this.setState({
      isMyLike:false,
      likesCount: this.state.likesCount - 1
    })
  })
  .catch(e => console.log(e))
}


    borrarPost (){
      console.log('borrado!', this.props.id, this.props.data)
      db.collection('posts').doc(this.props.id).delete()
  }

  componentDidMount() {
    console.log(this.props, 'barrani')
  }
  

  render() {
    return (
      <View style={styles.todoo}>
        
        
        <View style={styles.todo}> 
          { this.props.Perfil && 
          <View><TouchableOpacity  onPress={() => this.borrarPost()} style={styles.todo2}> <Text> BORRAR POST </Text> </TouchableOpacity> </View> }
          
          <TouchableOpacity style={styles.todoa} onPress={() => this.props.navigation.navigate('PerfilUsuario', {email: this.props.data.owner})}> <Text style={styles.todo}>{this.props.data.owner}
        </Text>
        </TouchableOpacity>
          <Image   
            style={styles.photo}
            source={{uri: this.props.data.foto}}
            resizeMode='cover'/>
        <Text style={styles.todo}>{this.props.data.description}</Text>
        
        
        </View>
        <View>


        <Text style={styles.todo2}>Likes: {this.state.likesCount}</Text>
        <Text style={styles.todo3}>Comentarios: {this.state.commentCount}</Text>   
        {
           this.state.isMyLike ?
                <TouchableOpacity onPress={()=> this.unlike()}> 
                    <FontAwesome name='heart' color='red' size={25} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=> this.like()}>
                    <FontAwesome name='heart-o' color='red' size={25} />
                </TouchableOpacity>

        }
        </View>

        <View>
          
          <TouchableOpacity onPress={() => this.props.navigation.navigate(
            'Comments', {id: this.props.id}
            )}>
            <Text style={styles.todo4}>Agregar comentario</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  photo:{
      height:250,
  },
  titulo1:{
    fontFamily: "Playfair Dispair",
    fontWeight:"bold",
    fontSize: 100,
    marginLeft: 40

  },
  todo:{
    fontFamily: "CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif",
    fontWeight:"bold",
    marginBottom:2,
    marginTop: 20,
    
  },
  todoa:{
    fontFamily: "CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif",
    fontWeight:"bold",
    marginBottom:3,
  },
  todo2:{
    fontFamily: "CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif",
    fontWeight:"500",
    marginBottom:6,
    marginTop:5,
    color:"black"
  },
  todo3:{
    fontFamily: "CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif",
    fontWeight:"500",
    marginBottom:10,
    fontWeight:"500"
  },
  todo4:{
    fontFamily: "CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif",
    marginBottom:5,
    marginTop:5,
    fontWeight:"bold",
    fontSize:17

  },
  
 
}) 
export default Posts
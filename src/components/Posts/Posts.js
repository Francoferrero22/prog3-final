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
      <View >
        <View> 
          { this.props.Perfil && 
          <View><TouchableOpacity onPress={() => this.borrarPost()}> <Text> BORRAR POST </Text> </TouchableOpacity> </View> }
          <Image   
            style={styles.photo}
            source={{uri: this.props.data.foto}}
            resizeMode='cover'/>
        <Text>{this.props.data.description}</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('PerfilUsuario', {email: this.props.data.owner})}> <Text>{this.props.data.owner}
        </Text>
        </TouchableOpacity>
        
        </View>
        <View>


        <Text>Likes: {this.state.likesCount}</Text>  
        {
           this.state.isMyLike ?
                <TouchableOpacity onPress={()=> this.unlike()}> 
                    <FontAwesome name='heart' color='red' size={16} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=> this.like()}>
                    <FontAwesome name='heart-o' color='red' size={16} />
                </TouchableOpacity>

        }
        </View>

        <View>
          <Text>Comentarios: {this.state.commentCount} </Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate(
            'Comments', {id: this.props.id}
            )}>
            <Text>Agregar comentario</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  photo:{
      height:250
  },
 
}) 
export default Posts
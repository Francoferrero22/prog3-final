import { Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { db } from '../../firebase/config';
class Posts extends Component {

    constructor(props){
        super(props)
        this.state = {
            likesCount: props.data.likes.length,
            commentCount: props.data.comments.length,
            isMyLike: false
        }
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
          {this.props.profile && 
          <View><TouchableOpacity onPress={() => this.borrarPost()}> <Text> borrar post </Text> </TouchableOpacity> </View> }
          <Image   
            style={styles.photo}
            source={{uri: this.props.data.foto}}
            resizeMode='cover'/>
          </View>
        <Text>{this.props.data.description}</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('PerfilUsuario')}> <Text>{this.props.data.owner}</Text></TouchableOpacity>

        
        {
           this.state.isMyLike ?
                <TouchableOpacity>
                    <Text>Unlike</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity>
                    <Text>Like</Text>
                </TouchableOpacity>

        }
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
import { Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native'
import React, { Component } from 'react'

class Posts extends Component {

    constructor(props){
        super(props)
        this.state = {
            likesCount: props.data.likes.length,
            commentCount: props.data.comments.length,
            isMyLike: false
        }
    }

  render() {
    return (
      <View >
    <Image   style={styles.photo}
                    source={{uri: this.props.data.foto}}
                    resizeMode='cover'/>
        <Text>{this.props.data.description}</Text>
        <Text>{this.props.data.owner}</Text>

        
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
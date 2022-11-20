import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, {Component} from 'react'
import Posts from '../../components/Posts/Posts'
import {db} from '../../firebase/config'

  
  class Home extends Component {
    constructor(){
      super()
      this.state={
        posts :[]
      }
    }

    componentDidMount(){
        db.collection('posts')
        .orderBy('createdAt','desc')
        .limit(3)
        .onSnapshot(docs => {
            let posts = []
            docs.forEach(doc => {
              posts.push({
                id: doc.id,
                data:doc.data()
              
              })
            })

    this.setState({

      posts : posts
 })
})
}
render(){
    return(
        <>
      

          <View tyle={styles.container1} >
          <FlatList
            data={this.state.posts}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Posts navigation={this.props.navigation} id={item.id} data={item.data} />}
          />
          </View>
        </>
    )
}

}
const styles = StyleSheet.create({
  container1:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  container2:{
    flex:3
  },
  container3:{
    flex:5
  },
  image:{
    height:300
  }
})



export default Home
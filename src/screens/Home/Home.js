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

        <View style={styles.todo}>

          <Text style={styles.titulo}>InstaPost</Text>
      
          <View style={styles.container1} >
          <FlatList
            style={styles.flatlist}
            data={this.state.posts}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Posts navigation={this.props.navigation} id={item.id} data={item.data} style={styles.container2} />}
          />
          </View>
          
          </View>
        </>
    )
}

}
const styles = StyleSheet.create({

  todo:{
    margin:30,
    fontWeight:"bold",
   
  },


  container1:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
   
    
  
  },
  container2:{
    flex:3,
    fontFamily: "CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif",
    margin:30,
    fontWeight:"bold",

    
  },
  flatlist:{
    width:350,
    height:600,
    
    
  },
  titulo:{
    fontFamily: "CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif",
    textAlign: "center",
    fontWeight:"bold",
    fontSize:100
  },
})



export default Home
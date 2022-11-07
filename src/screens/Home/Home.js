import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, {Component} from 'react'
import Posts from '../../components/Posts/Posts'
import {db} from '../../firebase/config'

  
  class Home extends Component {
    constructor(){
      super()
      this.state={
        allPosts:[]
      }
    }

    componentDidMount(){
        db.collection('posts')
        .orderBy('createdAt','desc')
        .limit(3)
        .onSnapshot(docs => {
            let publicaciones = []
            docs.forEach(doc => {
              publicaciones.push({
                id: doc.id,
                data:doc.data()
              })
            })

    this.setState({

      allPosts : publicaciones
 })
})
}
render(){
    return(
        <>
          <View>
             <Text>Home</Text>
          </View>

          <View>
          <FlatList
            data={this.state.allPosts}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Posts navigation={this.props.navigation} id={item.id} data={item.data} />}
          />
          </View>
        </>
    )
}

}

export default Home
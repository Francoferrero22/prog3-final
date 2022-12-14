import {Text , StyleSheet, View, Image} from 'react-native'
import React, { Component } from 'react'
import {Camera} from 'expo-camera'
import { TouchableOpacity } from 'react-native'
import { storage } from '../../firebase/config'
import { FontAwesome } from '@expo/vector-icons'

class Camara extends Component{
    constructor(props){
        super(props)
        this.metodosCamara = null
        this.state={
            permissions: false,
            mostrarCamara: true,
            foto: '',
        }
       
    }
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=> {
            this.setState({
                permissions: true,
            })
        })
        .catch((error)=> console.log(error))
    }

    tomarFoto(){
        this.metodosCamara.takePictureAsync()
        .then((foto)=>{
            console.log(foto)
            this.setState({
                mostrarCamara: false,
                foto: foto.uri,
            })
        })
        .catch((error)=> console.log(error))
    }

    aceptarImagen(){
      fetch(this.state.foto)
      .then(res => res.blob())
      .then(imagen => {
          const ref = storage.ref(`fotos/${Date.now()}.jpg`)
          ref.put(imagen)
          .then(()=> {
              ref.getDownloadURL()
              .then((url)=> this.props.cuandoSubaLaImagen(url))
              .catch(err => console.log(err))
          })

      })
      .catch(err => console.log(err))
  }
  rechazarImagen(){

  }
  
    
    render() {
      console.log('hola')
        return (
          <View style={styles.container}>
             <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeNavigation')}>
            <FontAwesome name='backward' color='black' size={16} />
            </TouchableOpacity>
        {
            this.state.permissions ?
            this.state.mostrarCamara ?
            <>
                <Camera
                style={styles.camarabody}
                type={Camera.Constants.Type.back}
                ref={metodos => this.metodosCamara = metodos}
                />
                <TouchableOpacity onPress={ () => this.tomarFoto()}>
                    <Text style={styles.texto}>Tomar foto</Text>
                </TouchableOpacity>
            </>
            : 
            <View>
                <Image
                source={{uri: this.state.foto}}
                style={styles.image}
                />
                <TouchableOpacity onPress={()=> this.aceptarImagen()}>
                    <Text style={styles.texto}>
                        Aceptar imagen
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=> this.rechazarImagen()}>
                    <Text style={styles.texto}>
                        Rechazar imagen
                    </Text>
                </TouchableOpacity>
            </View>
            : 
            <Text style={styles.texto}>No me haz dado permisos para mostrar la foto</Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
      flex:1
  },
  camarabody:{
      height:500
  },
  image:{
      height:200
  },
  texto:{
    fontFamily: "CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif",
    textAlign: "center",
    fontWeight:"bold",
    fontSize:30
  }
})
export default Camara;






                
                
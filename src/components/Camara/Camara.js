import {Text , StyleSheet, View, Image} from 'react-native'
import React, { Component } from 'react'
import {Camera} from 'expo-camera'
import { TouchableOpacity } from 'react-native'
import { storage } from '../../firebase/config'

class Camara extends Component{
    constructor(props){
        super(props)
        this.metodosCamara = ''
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
                mostrarCamara: false
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
          const refStorage = storage.ref(`fotos/${Date.now()}.jpg`)
          refStorage.put(imagen)
          .then(()=> {
              refStorage.getDownloadURL()
              .then(url=> this.props.cuandoSubaLaImagen(url))
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
                    <Text>Tomar foto</Text>
                </TouchableOpacity>
            </>
            : 
            <View>
                <Image
                source={{uri: this.state.foto}}
                style={styles.image}
                />
                <TouchableOpacity onPress={()=> this.aceptarImagen()}>
                    <Text>
                        Aceptar imagen
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=> this.rechazarImagen()}>
                    <Text>
                        Rechazar imagen
                    </Text>
                </TouchableOpacity>
            </View>
            : 
            <Text>No me haz dado permisos para mostrar la foto</Text>
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
  }
})
export default Camara;






                
                
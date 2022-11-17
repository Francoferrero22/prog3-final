import {Text , StyleSheet, View, Image} from 'react-native'
import React, { Component } from 'react'
import {Camera} from 'expo-camera'
import { TouchableOpacity } from 'react-native'
import { storage } from '../../firebase/config'

class Camara extends Component{
    constructor(props){
        super(props)
        this.state={
            usarCamara: false,
            foto: '',
        }
        this.camera;
    }
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=> {
            this.setState({
                usarCamara: true,
            })
        })
        .catch((error)=> console.log(error))

        Camera.getAvailableCameraTypesAsync()
        .then((res)=> console.log(res))
        .catch((error)=> console.log(error))
    }

    sacarFoto(){
        this.camera.takePictureAsync()
        .then((foto)=>{
            console.log(foto)
            this.setState({
                foto: foto.uri,
            })
        })
        .catch((error)=> console.log(error))
    }

    guardarFoto(){
        console.log('Guardar foto')
        fetch(this.state.foto)
        .then((res)=> res.blob()) // blob hace que la respuesta que me llega se convierta en una imagen que se pueda leer
        .then((image)=> {
            const ref = storage.ref(`fotos/${Date.now()}.jpg`)
            ref.put(image) // put es un metodo de firebaseee
            .then(()=>{
                ref.getDownloadURL()
                .then((url)=>{
                    this.props.onImageUpload(url)
                    this.setState({
                        foto: '',
                    })
                });
            })
        })
        .catch((error)=> console.log(error))
    }
    
    render() {
      console.log('hola')
        return (
          <>
            {this.state.foto ? (
              <>
                <Image
                  style={{ flex: 1, width: "100%" }}   
                  source={{ uri: this.state.foto }}
                />
                <View>
                  <TouchableOpacity onPress={() => this.guardarFoto()}>
                        <Text>Aceptar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                        <Text>Denegar</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) :  (
              <>
                <Camera
                  style={{ flex: 1, width: "100%" }}
                  type={Camera.Constants.Type.front}
                  ref={(cam) => (this.camera = cam)}
                />
                <TouchableOpacity onPress={() => this.sacarFoto()}>
                    <Text>Tomar Foto</Text>
                </TouchableOpacity>
              </>
            )} 
          </>
        );
    }
}
export default Camara;






                
                
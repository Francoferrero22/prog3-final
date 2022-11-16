import {Text , StyleSheet, View, Image} from 'react-native'
import React, { Component } from 'react'
import {Camera} from 'expo-camera'
import { TouchableOpacity } from 'react-native'


class Camara extends Component{
    constructor(){
        super()
        this.metodosCamera = null 
        this.state = {
            showCamera : true,
            foto : '',
        }
    }
    componentDidMount(){
        Camera.requestCameraPermissionAsync()
        .then (( )=> {
            this.setState({
            showCamera :true,
            })
        })
        .catch(e=>console.log(e))
    }
    takePicture(){
    this.metodosCamera.takePictureAsync()
    .then(foto => {this.setState({
        foto : foto.uri ,
        showCamera : false 
    })}
        )
    .catch(e => console.log(e))
    }

aceptarImagen(){
fetch(this.state.foto)
.then( imagenEnBinario => imagenEnBinario.blob())
.then(imagen => {
    const ref = storage.ref(`fotos/${Date.now()}.jpg`)
    ref.put(imagen)
    .then(() => {
        ref.getDowloadURL()
        .then (url=> this.props.cuandoSubaLaImagen(url) 
        .catch(e => console.log(e))
    ) })
})

}
rechazarImagen(){
    
}

    render(){
        return (
            <View>
                {
                    this.state.showCamera ?
                    <>
                
            <Camera
            style= {style.cameraBody}
            type = {Camera.Constants.Type.back}
            ref = {metodosCamera=> this.metodosCamera = metodosCamera}/>
            <TouchableOpacity
            style = {styles.shootButton}
            onPress = {()=> this.takePicture()}><Text>Shoot</Text></TouchableOpacity>
                <Text>Camera</Text>
              </>
                : this.state.showCamera === false && this.state.foto != '' ?

                <View> 
                    <Image 
                    source = {{uri: this.state.foto}}
                    style = {styles.image}/>
<TouchableOpacity onPress={()=> this.aceptarImagen()}>
    <Text>Aceptar Imagen</Text>
</TouchableOpacity>
<TouchableOpacity  onPress={()=> this.rechazarImagen()}>
                    <Text>
                        Rechazar imagen
                    </Text>
                </TouchableOpacity>
</View>: <Text>No me haz dado permisos para mostrar la foto</Text>
} 
</View>  
        )
    }
}

const styles = StyleSheet.create({
    container: {}
})

export default Camara
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Perfil from '../screens/Perfil/Perfil'
// import PerfilUsuario from '../components/PerfilUsuario/PerfilUsuario'
import Posts from '../screens/Posts/Posts'
import {FontAwesome} from '@expo/vector-icons'
import HomeNavigation from './HomeNavigation'
import Buscador from "../screens/Buscador/Buscador"
import AgregarImagen from '../screens/AgregarImagen/AgregarImagen'



const Tab = createBottomTabNavigator()

export default function TabNavigation() {
return(
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}} >
            <Tab.Screen name='HomeNavigation' component={HomeNavigation}   options={{
            tabBarIcon: () => <FontAwesome name='home' size={32} color='#9c9898' />,
            headerShown:false
        }}/>
            <Tab.Screen name= 'Posts' component= {Posts} options={{
            tabBarIcon: () => <FontAwesome name='camera' size={32} color='#9c9898'/>
        }}/>
           <Tab.Screen name= 'Perfil' component= {Perfil}   options={{
            tabBarIcon: () => <FontAwesome name='user' size={32} color='#9c9898' />
        }}/>
        <Tab.Screen name= 'AgregarImagen' component= {AgregarImagen} options={{
            tabBarIcon: () => <FontAwesome name='arrow' size={32} color="#9c9898"/>
        }}/>

         { <Tab.Screen name= 'Buscador'   component= {Buscador}   options={{
            tabBarIcon: () => <FontAwesome name='search' size={32} color='#9c9898' />

        }}/> }
        

        

        </Tab.Navigator>
) }


import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Perfil from '../components/Perfil/Perfil'
import PerfilUsuario from '../components/PerfilUsuario/PerfilUsuario'
import Posts from '../screens/Posts/Posts'
import {FontAwesome} from '@expo/vector-icons'
import HomeNavigation from './HomeNavigation'


const Tab = createBottomTabNavigator()

export default function TabNavigation() {
return(
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}} >
            <Tab.Screen name='HomeNavigation' component={HomeNavigation}   options={{
            tabBarIcon: () => <FontAwesome name='home' size={32} color='blue' />,
            headerShown:false
        }}/>
            <Tab.Screen name= 'Posts' component= {Posts} options={{
            tabBarIcon: () => <FontAwesome name='camera' size={32}/>
        }}/>
           <Tab.Screen name= 'Perfil' component= {Perfil}   options={{
            tabBarIcon: () => <FontAwesome name='user' size={32} color='blue' />
        }}/>

        </Tab.Navigator>
) }


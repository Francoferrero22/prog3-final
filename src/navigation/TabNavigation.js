import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Perfil from '../screens/Perfil/Perfil'
import Posts from '../screens/Posts/Posts'
import {FontAwesome} from '@expo/vector-icons'
import HomeNavigation from './HomeNavigation'


const Tab = createBottomTabNavigator()

export default function TabNavigation() {
return(
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}} >
            <Tab.Screen name='HomeNavigation' component={HomeNavigation} />
            <Tab.Screen name= 'Posts' component= {Posts}/>
        
        </Tab.Navigator>
) }
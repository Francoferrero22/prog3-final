import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Home from '../screens/Home/Home'
import Perfil from '../screens/Perfil/Perfil'
import Posts from '../screens/Posts/Posts'
import {FontAwesome} from '@expo/vector-icons'
import HomeNavigation from './HomeNavigation'


const Tab = createBottomTabNavigator
export default function TabNavigation() {
return(
    <NavigationContainer>
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}} >
        <Tab.Screen name='HomeNavigation' component={HomeNavigation} 
        options={{tabBarIcon: ()=> <FontAwesome name='home' size={24} color='black'/>, headerShown= 'false' }}/>
        <Tab.Screen name='Perfil' component= {Perfil}  options={{tabBarIcon: ()=> <FontAwesome name='home' size={24} color='Red'/>}}/>
        <Tab.Screen name= 'Posts' component= {Posts}/>
       
        </Tab.Navigator>
    </NavigationContainer>
) }
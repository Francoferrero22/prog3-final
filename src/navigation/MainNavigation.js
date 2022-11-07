import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'

const Stack = createNativeStackNavigator();

function MainNavigation() {
return(
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name = "Login" component = {Login}
              options={{
                headerShown: false
            }}/>
            <Stack.Screen name = "Register" component = {Register}
              options={{
                headerShown: false
            }}/>
            <Stack.Screen
            name='TabNavigation'
            component={TabNavigation}
             options={{
             headerShown:false
         }}
        />
        <Stack.Screen
          name='Comments'
          component={Comments}
        />  
        </Stack.Navigator>
    </NavigationContainer>
)}
export default MainNavigation
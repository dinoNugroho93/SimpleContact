import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'



// Screen 
import Contact from '../Screen/Contact';
import AddContactScreen from '../Screen/AddContactScreen';

export default AuthStackScreen = () => {
    const AuthStack = createStackNavigator()
    return (
        <AuthStack.Navigator initialRouteName='AddContact'>
            <AuthStack.Screen name='AddContact' component={AddContactScreen}/>
            <AuthStack.Screen name='Contact' component={Contact} />
        </AuthStack.Navigator>
    )
}



import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStackScreen from './src/Stack/AppStackScreen'
import AuthStackScreen from './src/Stack/AuthStackScreen'
import { AuthContext } from './src/Component/Context';
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-community/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerContent } from './src/Screen/DrawerContent';
import MainTab from './src/Stack/MainTabScreen';
// import { ThemeProvider, theme} from 'react-native-sc-design-system';
import {ThemeProvider, theme} from 'native-design-system'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [userToken, setUserToken] = useState(null)

  const authContext = React.useMemo(() => ({
    singInHandle: async (accesstoken) => {
      const token = accesstoken
      try {
        await AsyncStorage.setItem('accesToken', "token")
      } catch (e) {
        console.log("ERROR", e)
      }
    },
    singOutHandle: () => {
      setUserToken(null)
      AsyncStorage.removeItem('accesToken')
    }
  }));
  
  return (
    <ThemeProvider value={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <AuthStackScreen />
        </NavigationContainer>
      </AuthContext.Provider>
      </ThemeProvider>
   

  );
}

export default App;
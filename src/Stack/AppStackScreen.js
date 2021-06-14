// import React from 'react'
// import {createStackNavigator} from '@react-navigation/stack'
// import SeeMore from '../Screen/SeeMore'
// import DocumentList from '../Screen/AddContactScreen'


// import MainTab from './MainTabScreen'
// const DefaultStack = createStackNavigator()


// export default AppStackScreen = () =>{
//     const AppStack = createStackNavigator()
//     return(
//         <AppStack.Navigator headerMode="none">
//             <AppStack.Screen name='MainTab' component={MainTab}/>
//             <AppStack.Screen name='SeeMore' component = {DefaultStackScreen}/>
//         </AppStack.Navigator>
//     )
// }

// const DefaultStackScreen = () =>{
//     return(
//         <DefaultStack.Navigator screenOptions={{
//             headerStyle: {
//                 backgroundColor: "#0B8E45",
//                 shadowColor: "black", // iOS
//                 elevation: 0, // Android
//             },
//             headerBackTitleVisible:false,
//             headerTintColor: "white",
//             headerTitleStyle: {
//                 fontWeight: 'bold',
//             },
//         }}>
//             <DefaultStack.Screen name='SeeMore' component={SeeMore}/>
//             <DefaultStack.Screen name='DocumentList' component={DocumentList}/>
//         </DefaultStack.Navigator>
//     )
// }
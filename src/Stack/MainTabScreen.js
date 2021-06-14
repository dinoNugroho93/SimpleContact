// import React from 'react'
// import { createStackNavigator } from "@react-navigation/stack"
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
// import Icon from 'react-native-vector-icons/Ionicons';
// import Home from '../Screen/Home'
// import Riwayat from '../Screen/Riwayat'
// import Tugasku from '../Screen/Tugasku'
// import Profile from '../Screen/Profile'
// import { View, Dimensions } from 'react-native'
// import { Text } from 'native-base'
// import {
//     useTheme,
//     Avatar,
//     Title,
//     Caption,
//     Paragraph,
//     Drawer,
//     TouchableRipple,
//     Switch
// } from 'react-native-paper';

// const HomeStack = createStackNavigator()
// const RiwayatStack = createStackNavigator()
// const TugaskuStack = createStackNavigator()
// const ProfileStack = createStackNavigator()
// const Tab = createMaterialBottomTabNavigator()

// const MainTab = () => (
//     <Tab.Navigator initialRoutName="Home" activeColor=
//         "black">
//         <Tab.Screen
//             name="Home"
//             component={HomeStackScreen}
//             options={{
//                 tabBarLabel: 'Home',
//                 tabBarColor: 'white',
//                 tabBarIcon: ({ color }) => (
//                     <Icon name="home" color={'black'} size={26} />
//                 ),
//             }}
//         />
//         <Tab.Screen
//             name="Riwayat"
//             component={RiwayatStackScreen}
//             options={{
//                 tabBarLabel: 'Riwayat',
//                 tabBarColor: 'white',
//                 tabBarIcon: ({ color }) => (
//                     <Icon name="time" color={'black'} size={26} />
//                 ),
//             }}
//         />
//         <Tab.Screen
//             name="Tugasku"
//             component={TugaskuStackScreen}
//             options={{
//                 tabBarLabel: 'Tugasku',
//                 tabBarColor: 'white',
//                 tabBarIcon: ({ color }) => (
//                     <Icon name="document-text" color={"black"} size={26} />
//                 ),
//             }}
//         />
//         <Tab.Screen
//             name="Profile"
//             component={ProfileStackScreen}
//             options={{
//                 tabBarLabel: 'Profile',
//                 tabBarColor: 'white',
//                 tabBarIcon: ({ color }) => (
//                     <Icon name="person-circle" color={'black'} size={26} />
//                 ),
//             }}
//         />
//     </Tab.Navigator>
// )

// export default MainTab;

// const HomeStackScreen = ({ navigation }) => {
//     const { height, width } = Dimensions.get('window');

//     return (
//         <HomeStack.Navigator screenOptions={{
//             headerStyle: {
//                 backgroundColor: "#0B8E45",
//                 shadowColor: "black", // iOS
//                 elevation: 0, // Android
//             },
//             headerTitle: false,
//             headerTintColor: "white",
//             headerTitleStyle: {
//                 fontWeight: 'bold',
//             },
//         }}>
//             <HomeStack.Screen
//                 name="Home"
//                 component={Home}
//                 options={{
//                     headerLeft: () => (
//                         <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 15, alignItems: 'center' }}>
//                             <View style={{
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 width: 40,
//                                 height: 40,
//                                 backgroundColor: "white",
//                                 borderRadius: 40,
//                                 shadowColor: "#000",
//                                 shadowOffset: {
//                                     width: 0,
//                                     height: 2,
//                                 },
//                                 shadowOpacity: 0.25,
//                                 shadowRadius: 3.84,

//                                 elevation: 10,
//                                 borderWidth: 1,
//                                 borderColor: "white",
//                             }}>
//                                 <Avatar.Image
//                                     source={{
//                                         uri: 'http://116.206.196.69/frontlinesite/Upload/files/profile/default/photoprofile.png'
//                                     }}
//                                     size={40}
//                                 />
//                             </View>
//                             <View style={{ flex: 1, paddingHorizontal: 10, alignItems: 'flex-start', justifyContent: 'center' }}>
//                                 <View style={{ flexDirection: 'column' }}>
//                                     <Text style={{
//                                         fontWeight: '100', fontSize: 14, color: 'white'
//                                     }}>
//                                         Selamat Siang
//                                         </Text>
//                                     <Text style={{
//                                         fontWeight: '300', fontSize: 18, color: 'white'
//                                     }}>
//                                         Dino Abrianto Nugroho
//                                         </Text>
//                                 </View>
//                             </View>
//                         </View>
//                     ),
//                     headerRight: () => (
//                         <View style={{ alignItems:'center', justifyContent:"center"}}>
//                             <Icon.Button
//                                 name="ios-menu"
//                                 size={25}
//                                 color={"white"}
//                                 backgroundColor={"transparent"}
//                                 onPress={() => navigation.openDrawer()}
//                             />
//                         </View>
//                     )
//                 }} />
//         </HomeStack.Navigator>
//     )
// }

// const RiwayatStackScreen = () => {
//     return (
//         <RiwayatStack.Navigator screenOptions={{
//             headerStyle: {
//                 backgroundColor: "#0B8E45",
//                 shadowColor: "black", // iOS
//                 elevation: 0, // Android
//             },
//             headerTintColor: "white",
//             headerTitleStyle: {
//                 fontWeight: 'bold',
//             },
//         }}>
//             <RiwayatStack.Screen name="Riwayat" component={Riwayat} />
//         </RiwayatStack.Navigator>
//     )
// }

// const TugaskuStackScreen = ({navigation}) => {
//     return (
//         <TugaskuStack.Navigator screenOptions={{
//             headerStyle: {
//                 backgroundColor: "#0B8E45",
//                 shadowColor: "black", // iOS
//                 elevation: 0, // Android
//             },
//             headerTitle: false,
//             headerTintColor: "white",
//             headerTitleStyle: {
//                 fontWeight: 'bold',
//             },
//         }}>
//             <TugaskuStack.Screen name="Tugasku" component={Tugasku} 
//             options={{
//                 headerLeft: () => (
//                     <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 15, alignItems: 'center' }}>
//                         <View style={{
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             width: 40,
//                             height: 40,
//                             backgroundColor: "white",
//                             borderRadius: 40,
//                             shadowColor: "#000",
//                             shadowOffset: {
//                                 width: 0,
//                                 height: 2,
//                             },
//                             shadowOpacity: 0.25,
//                             shadowRadius: 3.84,

//                             elevation: 10,
//                             borderWidth: 1,
//                             borderColor: "white",
//                         }}>
//                             <Avatar.Image
//                                 source={{
//                                     uri: 'http://116.206.196.69/frontlinesite/Upload/files/profile/default/photoprofile.png'
//                                 }}
//                                 size={40}
//                             />
//                         </View>
//                         <View style={{ flex: 1, paddingHorizontal: 10, alignItems: 'flex-start', justifyContent: 'center' }}>
//                             <View style={{ flexDirection: 'column' }}>
//                                 <Text style={{
//                                     fontWeight: '100', fontSize: 14, color: 'white'
//                                 }}>
//                                     Selamat Siang
//                                     </Text>
//                                 <Text style={{
//                                     fontWeight: '300', fontSize: 18, color: 'white'
//                                 }}>
//                                     Dino Abrianto Nugroho
//                                     </Text>
//                             </View>
//                         </View>
//                     </View>
//                 ),
//                 headerRight: () => (
//                     <View style={{ alignItems:'center', justifyContent:"center"}}>
//                         <Icon.Button
//                             name="ios-menu"
//                             size={25}
//                             color={"white"}
//                             backgroundColor={"transparent"}
//                             onPress={() => navigation.openDrawer()}
//                         />
//                     </View>
//                 )
//             }}/>
//         </TugaskuStack.Navigator>
//     )
// }

// const ProfileStackScreen = () => {
//     return (
//         <ProfileStack.Navigator headerMode="none">
//             <ProfileStack.Screen name="Home" component={Profile} />
//         </ProfileStack.Navigator>
//     )
// }
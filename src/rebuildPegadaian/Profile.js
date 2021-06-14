import React, { useState } from 'react'
import { View, Dimensions, Image } from 'react-native'
import { Text, Button } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';



const { height, width } = Dimensions.get('window');

const Profile = () => {
    const [widthImage, setWidthImage] = useState(height * 0.20)
    return (
        <View style={{ backgroundColor: '#F7F4F4', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ paddingVertical: 20, alignItems: 'center' }}>
                <View
                    style={{
                        width: widthImage,
                        height: widthImage,
                    }}>
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 5,
                            borderColor: 'white',
                            borderRadius: widthImage / 2,
                            overflow: "hidden"
                        }}>
                        <Image
                            resizeMode="cover"
                            style={{
                                flex: 1,
                                width: null,
                                height: null,
                            }}
                            source={{ uri: "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550" }} />
                    </View>
                </View>
                <Text style={{ marginTop: 10, fontWeight: 'bold', color: 'gray', fontSize: 16 }}>Dino Nugroho</Text>
                <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 0.45, alignItems: 'flex-end' }}>
                        <Text style={{ fontWeight: '100', color: 'gray' }}>Sentul</Text></View>
                    <View style={{ width: 1, backgroundColor: 'gray', marginHorizontal: 10 }} />
                    <View style={{ flex: 0.45 }}>
                        <Text style={{ alignItems: 'flex-start', fontWeight: '100', color: 'gray' }}>kredit</Text></View>
                </View>
                <Text style={{ fontWeight: '300', color: 'gray' }}>Jakarta Selatan, Indonesia</Text>
            </View>
            <View style={{ flexDirection: 'row', height: 80, backgroundColor: '#ededed', width: '100%' }}>
                <View style={{ flex: 0.25, borderWidth: 1, borderColor: '#dbdbdb', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="mail" size={26} />
                    <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Email</Text>
                </View>
                <View style={{ flex: 0.25, borderWidth: 1, borderColor: '#dbdbdb', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="call" size={26} />
                    <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Contact</Text>
                </View>
                <View style={{ flex: 0.25, borderWidth: 1, borderColor: '#dbdbdb', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="globe" size={26} />
                    <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Website</Text>
                </View>
                <View style={{ flex: 0.25, borderWidth: 1, borderColor: '#dbdbdb', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="logo-whatsapp" size={26} />
                    <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Whatsapp</Text>
                </View>
            </View>
            <View style={{paddingVertical:10, borderBottomWidth:1, borderColor:"#dbdbdb", marginHorizontal:20, flexDirection: 'row', alignItems: 'center', }}>
                <Button transparent style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => {

                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="create" color={'orange'} size={26} />
                            <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 16 }}> Edit Profile</Text>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Icon name="chevron-forward" color={'orange'} size={26} />
                        </View>
                    </View>
                </Button>
            </View>
            <View style={{paddingVertical:10, borderColor:"#dbdbdb", marginHorizontal:20, flexDirection: 'row', alignItems: 'center', }}>
                <Button transparent style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => {

                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="laptop-outline" color={'orange'} size={26} />
                            <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 16 }}> Edit Profile</Text>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Icon name="chevron-forward" color={'orange'} size={26} />
                        </View>
                    </View>
                </Button>
            </View>
            <LinearGradient
                colors={["#C20F0F", "#E06969"]}
                style={{ marginTop: 10, width: '85%', alignSelf: 'center', alignItems: 'center', borderRadius: 16 }}
            >
                <Button transparent style={{ justifyContent: 'center', width: '100%' }}
                    onPress={() => {
                        navigation.navigate('SeeMore')
                    }}>
                    <Text
                        style={{ fontSize: 16, color: "white" }} >
                       LOG OUT
                        </Text>
                </Button>
            </LinearGradient>
        </View>
    )
}

export default Profile;
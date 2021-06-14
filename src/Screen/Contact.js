import React, { useState } from 'react'
import { View, Dimensions, StyleSheet, Text, Alert, KeyboardAvoidingView, SafeAreaView , ScrollView, Image} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Input, Button } from 'native-design-system';
import { deleteAPI, putAPI } from '../MakeHttps/RestApi';
import { CONTACT } from '../MakeHttps/ServerApi';
import { useEffect } from 'react/cjs/react.development';



const { height, width } = Dimensions.get('window');

const Contact = ({ route, navigation }) => {
    const { propsFirstName, propsLastName, propsAge, propsPhoto, propsId } = route.params;
    const [widthImage, setWidthImage] = useState(height * 0.15)
    const [data, setData] = React.useState({
        firstName: propsFirstName,
        lastName: propsLastName,
        age: propsAge,
        disableInput: true,
        disableOncancel: false,
        onEdit: true,
        disableBtnDone: true
    })

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Contact Profile',
            headerRight: () => (
                <View style={{ marginRight: 5, alignItems: 'center', justifyContent: "center" }}>
                    <Button size={'xxsmall'} transparent onPress={() => { HanldedeleteButton() }}>
                        <Icon
                            name={'trash'}
                            color='#b52025'
                            size={24}
                        />
                    </Button>
                </View>
            ),
        });
    }, [navigation])

    const handleBtnEdit = () => {
        if (data.onEdit) {
            setData({
                ...data,
                disableInput: !data.disableInput,
                disableOncancel: !data.disableOncancel,
                onEdit: !data.onEdit,
                disableBtnDone: !data.disableBtnDone
            })
        } else {
            setData({
                ...data,
                disableInput: !data.disableInput,
                disableOncancel: !data.disableOncancel,
                onEdit: !data.onEdit,
                disableBtnDone: !data.disableBtnDone,
                firstName: propsFirstName,
                lastName: propsLastName,
                age: propsAge,
            })
        }

    }

    const deleteText = (id) => {
        if (id === "name") {
            setData({
                ...data,
                firstName: ""
            })
        }

        if (id === "lastName") {
            setData({
                ...data,
                lastName: ""
            })
        }
        if (id === "age") {
            setData({
                ...data,
                age: ""
            })
        }
    }

    const HanldedeleteButton = () =>{
        Alert.alert("Peringatan", "Yakin untuk delete contact", [
            {
                text: "Tidak",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Yakin", onPress:()=>{deleteContact()}}
        ])

    }

    const deleteContact = () =>{
        deleteAPI(CONTACT, propsId)
        .then((items) =>{
            if(items.message){
                Alert.alert(items.message)
                navigation.goBack()
            }
        })

    }
    
    const editContact = () => {
        console.log(propsId)
        let request = {
            "firstName": data.firstName,
            "lastName": data.lastName,
            "age": parseInt(data.age),
            "photo": "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg"
        }

        console.log(request)
        putAPI(request, CONTACT, propsId)
            .then(items => {
                if (items.message) {
                    Alert.alert(items.message)
                    navigation.goBack()
                } 
            })
    }

    const handleEditName = (value) => {
        setData({
            ...data,
            firstName: value
        })
    }
    const handleEditLastName = (value) => {
        setData({
            ...data,
            lastName: value
        })
    }
    const handleEditAge = (value) => {
        setData({
            ...data,
            age: value
        })
    }
    return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1 }}>
                <ScrollView>
                <SafeAreaView style={{ backgroundColor: '#ededed', flex: 1, alignItems: 'center', justifyContent:'center' }}>
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
                                    source={{ uri:propsPhoto}} 
                                    size={20}/>
                            </View>
                        </View>
                        <Text style={{ marginTop: 10, fontWeight: 'bold', color: 'gray', fontSize: 16 }}>{propsFirstName} {propsLastName}</Text>
                        <Text style={{ fontWeight: '300', color: 'gray' }}>{propsAge}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', height: 80, backgroundColor: '#ededed', width: '95%' }}>
                        <View style={{ backgroundColor: 'white', margin: 5, borderRadius: 10, flex: 0.25, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="chatbubble" size={26} color={'#b52025'} />
                            <Text style={{ fontWeight: '300', fontSize: 12, color: '#b52025' }}>message</Text>
                        </View>
                        <View style={{ backgroundColor: 'white', margin: 5, borderRadius: 10, flex: 0.25, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="call" size={26} color={'#b52025'} />
                            <Text style={{ fontWeight: '300', fontSize: 12, color: '#b52025' }}>call</Text>
                        </View>
                        <View style={{ backgroundColor: 'white', margin: 5, borderRadius: 10, flex: 0.25, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="videocam" size={26} color={'#b52025'} />
                            <Text style={{ fontWeight: '300', fontSize: 12, color: '#b52025' }}>video</Text>
                        </View>
                        <View style={{ backgroundColor: 'white', margin: 5, borderRadius: 10, flex: 0.25, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="mail" size={26} color={'#b52025'} />
                            <Text style={{ fontWeight: '300', fontSize: 12, color: '#b52025' }}>mail</Text>
                        </View>
                    </View>
                    <View style={styles.inputEdit}>
                        <Input
                            disabled={data.disableInput}
                            rightIcon={() => deleteText('name')}
                            style={styles.textInput}
                            value={data.firstName}
                            onChangeText={(value) => handleEditName(value)}
                        />
                        <Input
                            disabled={data.disableInput}
                            rightIcon={() => deleteText('lastName')}
                            style={styles.textInput}
                            value={data.lastName}
                            onChangeText={(value) => handleEditLastName(value)}
                        />
                        <Input
                            disabled={data.disableInput}
                            rightIcon={() => deleteText('age')}
                            style={styles.textInput}
                            value={data.age.toString()}
                            onChangeText={(value) => handleEditAge(value)}
                        />
                    </View>
                    <View
                        style={styles.container}
                    >
                        <Button style={{ justifyContent: 'center', width: 100 }}
                            onPress={() => {
                                handleBtnEdit()
                            }}>
                            <Text
                                style={{ fontSize: 16, color: "white" }} >
                                {data.onEdit ? "EDIT" : "CANCEL"}
                            </Text>
                        </Button>

                        <Button disabled={data.disableBtnDone} style={{ justifyContent: 'center', backgroundColor: data.disableBtnDone === true ? '#069106' + 50 : '#069106', borderWidth: 0, borderRadius: 5, width: 100 }}
                            onPress={() => { editContact() }}>
                            <Text
                                style={{ fontSize: 16, color: "white" }} >
                                DONE
                            </Text>
                        </Button>
                    </View>
                </SafeAreaView>
                </ScrollView>
            </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        width: '85%',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 16
    },
    inputEdit: {
        width: '95%',
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 8,
        justifyContent: 'center'
    },
    textInput: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderRadius: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#ededed',
    }
})

export default Contact;
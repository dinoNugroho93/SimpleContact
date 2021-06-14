import React, { useEffect, useRef, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    SectionList,
    Image,
    Alert,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/Ionicons'

import { CONTACT, USERVERIFYAPI } from '../MakeHttps/ServerApi'
import { getAPI, postAPI } from '../MakeHttps/RestApi'
import { Button, Input, } from 'native-design-system'
import { FlatList } from 'react-native-gesture-handler';
import { Item } from 'native-base';
import * as Animatable from 'react-native-animatable';




const AddContactScreen = ({ navigation }) => {
    const actionSheetRef = useRef();
    const scrollViewRef = useRef();
    const actionSheetScrollRef = actionSheetRef.current?.scrollViewRef;
    const [data, setData] = React.useState({
        firstName: '',
        lastName: '',
        age: '',
        photo:'',
        disableBtn: true,
    });
    const [filterDataContact, setFilterDataContact] = useState([])
    const [dataContact, setDataContact] = useState([])
    const [search, setSearch] = useState([])

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title:"Contact",
            headerRight: () => (
                <View style={{ marginRight: 5, alignItems: 'center', justifyContent: "center" }}>
                    <Button size={'xxsmall'} transparent onPress={() => { actionSheetRef.current?.show() }}>
                        <Icon
                            name={'add-outline'}
                            color='#b52025'
                            size={30}
                        />
                    </Button>
                </View>
            ),
        });
    }, [navigation])

    useEffect(() => {
        let coba = task1()
        console.log(coba)
        console.log("called");
        getDataContact()
    }, [])

    function task1(){
        return{
            test:'succes'
        }
    }
    React.useEffect(
        () => navigation.addListener('focus', () =>  getDataContact()),
        []
      );

    getData = () => {
        let contactArr = []
        let code = "A".charCodeAt(0);
        for (let i = 0; i < 26; i++) {
            let currChar = String.fromCharCode(code + i)
            let obj = {
                title: currChar
            }

            let currContacts = filterDataContact.filter(item => {
                return item.firstName[0].toUpperCase() === currChar
            });
            if (currContacts.length > 0) {
                currContacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
                obj.data = currContacts
                contactArr.push(obj);
            }
        }
        return contactArr;
    }

    const filterContact = (value) => {
        if (value) {
            const newData = dataContact.filter(function (item) {
                const itemData = item.firstName ?
                    item.firstName.toUpperCase() : ''.toUpperCase()
                const textData = value.toUpperCase()
                return itemData.indexOf(textData) > -1
            });
            setFilterDataContact(newData)
            setSearch(value)
        } else {
            setFilterDataContact(dataContact)
            setSearch(value)
        }
    }

    function getDataContact() {
        getAPI('contact')
            .then(items => {
                    setDataContact(items.data)
                    setFilterDataContact(items.data)
            })
    }

    function addContact() {
        console.log('call add')
        let request = {
            "firstName": data.firstName,
            "lastName": data.lastName,
            "age": parseInt(data.age),
            "photo": "https://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg"
        }

        console.log(request)
        postAPI(request, CONTACT)
            .then(items => {
                if (items.statusCode !== 400 || temp.statusCode === undefined) {
                    getDataContact()
                    Alert.alert(items.message)
                }else{
                    Alert.alert(items.message)
                }
            })
    }



    function changeScrollEnabled(parent, child) {
        // We only need this on Android, iOS works great with Child Scroll Views.
        if (Platform.OS !== 'android') return;
        actionSheetScrollRef?.current?.setNativeProps({
            scrollEnabled: parent,
        });
        scrollViewRef.current?.setNativeProps({
            scrollEnabled: child,
            nestedScrollEnabled: false,
        });
    }

    const onScroll = (event) => {
        changeScrollEnabled(false, true);
    };

    const onHasReachedTop = (hasReachedTop) => {
        changeScrollEnabled(!hasReachedTop, hasReachedTop);
    };

    const onClose = () => {
        scrollViewRef.current?.setNativeProps({
            scrollEnabled: false,
        });
    };

    const onOpen = () => {
        scrollViewRef.current?.setNativeProps({
            scrollEnabled: true,
        });
    };

    const handleFirstName = (value) => {
        if (value.trim().length > 0) {
            setData({
                ...data,
                firstName: value,
                disableBtn: false
            });
        } else {
            setData({
                ...data,
                firstName: value,
                disableBtn: true
            });
        }
    }

    const handelLastName = (value) => {
        setData({
            ...data,
            lastName: value
        })
    }

    const handleAge = (value) => {
        setData({
            ...data,
            age: value
        })
    }

    const deleteSearch = () => {
        setSearch('')
    }

    const renderItem = ({ item }) => {
        return (
            <Animatable.View animation="fadeInLeft" style={styles.containerList}>
                <Button transparent size={'xsmall'} style={styles.ButtonList} onPress={() => (navigation.navigate('Contact',{
                    propsFirstName: item.firstName,
                    propsLastName: item.lastName,
                    propsAge: item.age,
                    propPhoto: item.photo,
                    propsId: item.id,
                }))}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <View style={styles.cirlcle}>
                            <Image
                                style={styles.cirlcle}
                                source={{
                                    uri: 'https://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550'
                                }}
                                resizeMode='cover'
                                size={20}
                            />
                        </View>
                        <Text style={{ marginLeft: 15, justifyContent:'center'}}>{item.firstName}</Text>
                    <Text style={{ fontWeight: 'bold', marginLeft: 5, color:'#7b090d' }}>{item.lastName}</Text>
                    </View>
                </Button>
            </Animatable.View>
        )
    }

    return (
        <>
            <SafeAreaView style={styles.safeareview}>
                <View style={{ padding: 10, backgroundColor: 'white' }}>
                    <Input
                        style={{ height: 40, borderRadius: 10, color: 'white' }}
                        outline
                        value={search}
                        onChangeText={(value) => filterContact(value)}
                        leftIcon={
                            <Icon name='search-outline'
                                size={20}
                                color='#b52025' />
                        }
                        rightIcon={() => { deleteSearch() }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <View>
                        {
                            search.length > 0 ?
                                <FlatList
                                    data={filterDataContact}
                                    keyExtractor={item => item.index}
                                    renderItem={renderItem}
                                /> :
                                <SectionList
                                    sections={getData()}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.index}
                                    renderSectionHeader={({ section }) => (
                                        <View style={styles.headerSection}>
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#b52025' + 80 }}>{section.title}</Text>
                                        </View>
                                    )}
                                />

                        }


                    </View>

                </View>
                <ActionSheet
                    ref={actionSheetRef}
                    onOpen={onOpen}
                    statusBarTranslucent
                    onPositionChanged={onHasReachedTop}
                    bounceOnOpen={true}
                    bounciness={4}
                    gestureEnabled={true}
                    onClose={onClose}
                    defaultOverlayOpacity={0.3}
                >
                    <View
                        style={{
                            paddingHorizontal: 12,
                        }}>
                        <View style={{ height: 44, width: '100%' }}>
                            <Text style={styles.titleText}> New Contact</Text>
                        </View>
                        <View>
                            <View style={styles.containerInput}>
                                <Text style={{ fontSize: 12, fontWeight: '300', color: 'grey', marginBottom: 5 }}>
                                    First Name
                                </Text>
                                <TextInput
                                    placeholder="ex: Roger"
                                    onChangeText={(value) => handleFirstName(value)}
                                    style={{ fontSize: 14, color: 'black', fontWeight: '700' }}
                                />
                            </View>
                            <View style={styles.containerInput}>
                                <Text style={{ fontSize: 12, fontWeight: '300', color: 'grey', marginBottom: 5 }}>
                                    Last Name
                                </Text>
                                <TextInput
                                    placeholder="ex: Danuarta"
                                    onChangeText={(value) => handelLastName(value)}
                                    style={{ fontSize: 14, color: 'black', fontWeight: '700' }}
                                />
                            </View>
                        </View>

                        <View style={styles.containerInput}>
                            <Text style={{ fontSize: 12, fontWeight: '300', color: 'grey', marginBottom: 5 }}>
                                Age
                            </Text>
                            <TextInput
                                placeholder="ex: 32"
                                //value={age}
                                onChangeText={(value) => handleAge(value)}
                                style={{ fontSize: 14, color: 'black', fontWeight: '700' }}
                            />
                        </View>
                        <View style={{ marginTop: 15, alignSelf: 'flex-end' }}>
                            <Button  disabled ={data.disableBtn} style={{ width: 80, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => {
                                    addContact()
                                    actionSheetRef.current?.hide();
                                }}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>Done</Text>
                            </Button>
                        </View>
                    </View>
                </ActionSheet>
            </SafeAreaView>
        </>
    );
};

export default AddContactScreen;

const styles = StyleSheet.create({
    containerInput: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderColor: 'grey'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    footer: {
        height: 100,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btnLeft: {
        width: 30,
        height: 30,
        backgroundColor: '#f0f0f0',
        borderRadius: 100,
    },
    input: {
        width: '100%',
        minHeight: 50,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    scrollview: {
        width: '100%',
        padding: 12,
    },
    btn: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#fe8a71',
        paddingHorizontal: 10,
        borderRadius: 5,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0.3 * 4, height: 0.5 * 4 },
        shadowOpacity: 0.2,
        shadowRadius: 0.7 * 4,
    },
    safeareview: {
        justifyContent: 'center',
        flex: 1,
    },
    btnTitle: {
        color: 'white',
        fontWeight: 'bold',
    },
    headerSection: {
        padding: 10
    },
    cirlcle: {
        height: 50,
        width: 50,
        borderWidth: 0.7,
        borderRadius: 50 / 2,
        borderColor: 'white',
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 2.65,

        elevation: 4,


    },
    containerList: {
        width: '95%',
        backgroundColor: 'white',
        borderBottomWidth:1,
        borderColor:'#ededed',
        padding: 8,
        justifyContent: 'center',
        alignSelf:'center'

    },
    ButtonList: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'

    },
    headerView: {
        height: 44,
        marginTop: 44,
        marginLeft: 16,
        marginRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});
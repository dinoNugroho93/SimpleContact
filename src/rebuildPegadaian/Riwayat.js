import React, { useState } from 'react'
import { View, ScrollView, FlatList } from 'react-native'
import { Text, Button, Item } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable';
import { white } from 'react-native-paper/lib/typescript/styles/colors';



const Riwayat = () => {
    const [listData, setLisData] = useState([
        { name: 'Dino Abrianto Nugroho', code: '110676409' },
        { name: 'Balada adi gael', code: '114355678100' },
        { name: 'Gang bilu', code: '1365564378829' },
        { name: 'FRizal umaneuru', code: '19977716623' },
        { name: 'Aldi taher', code: '12656772880078' },
        { name: 'Bernardo Silva', code: '1566882000277' },
        { name: 'Gerakld Pangkali', code: '2044000012234' },
        { name: 'Tun Abdul razak', code: '2166488002886378' },
        { name: 'Aldi taher', code: '12656772880078' },
        { name: 'Bernardo Silva', code: '1566882000277' },
        { name: 'Gerakld Pangkali', code: '2044000012234' },
        { name: 'Tun Abdul razak', code: '2166488002886378' },
    ])
    return (
        <View style={{ backgroundColor: '#F7F4F4', flex: 1, justifyContent: 'flex-end' }}>
                <FlatList
                    data={listData}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ borderRadius: 8, flex:1, padding: 15, flexDirection: 'row' , justifyContent:'space-between', alignItems:'flex-start', backgroundColor:'white', marginVertical:5, marginHorizontal:8}}>
                                <View style={{justifyContent:'center'}}>
                                    <Text style={{marginBottom: 8, fontWeight:'bold', fontSize:14}}>{item.name}</Text>
                                    <Text style={{fontWeight:'200', fontSize:14, color:'gray'}}>{item.code}</Text>
                                </View>
                                <Icon name="chevron-forward" color={'green'} size={26} />
                            </View>
                        )
                    }}
                />
            <View style={{ position: 'absolute', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'flex-end', width: '100%', height: 80, }}>
                <Animatable.View animation="fadeInUpBig" style={{
                    flexDirection: "row",
                    width: 180,
                    height: 35,
                    backgroundColor: 'white',
                    top: -20, borderRadius: 20,
                    justifyContent: 'space-between',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.30,
                    shadowRadius: 2.65,

                    elevation: 4,
                }}>
                    <Button transparent style={{ padding: 0, flex: 0.45, height: 35, justifyContent: 'space-around' }}>
                        <Text style={{ color: 'green' }}>urutkan</Text>
                    </Button>
                    <View style={{ flex: 0.1, alignItems: 'center' }}>
                        <View style={{ width: 1, backgroundColor: '#ededed', height: '100%' }} />
                    </View>
                    <Button transparent style={{ flex: 0.45, height: 35, justifyContent: 'space-around' }}>
                        <Icon name='filter' color={'green'} size={15} />
                        <Text style={{ color: 'green' }}>filter</Text>
                    </Button>
                </Animatable.View>
            </View>
        </View>
    )
}

export default Riwayat;
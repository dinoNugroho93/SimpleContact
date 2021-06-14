import React from 'react'
import { View, Image, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { Text, Button } from 'native-base'
import { slider1, slider2, slider3 } from "../asset/images";
import { SwiperDashboard } from "../Component/Swiper";
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';



const bannerSliderList = [slider1, slider2, slider3];
const { height, width } = Dimensions.get('window');
const slideWidth = 280;
const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const horizontalMargin = 1;

const news = [{ newsDesc: "saya adalah anak gembala" }, { newsDesc: "saya adalah anak gembala" }, { newsDesc: "saya adalah anak gembala" }]



const Home = ({ navigation }) => {
    let slider = []
    for (let i = 0; i < bannerSliderList.length; i++) {
        if (bannerSliderList.length > 0) {
            slider.push(
                <View key={i} style={{ flex: 1 }}>
                    <Image
                        source={bannerSliderList[i]}
                        style={{ width: undefined, height: undefined, flex: 1, borderRadius: 5, }}
                    />
                </View>
            )
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#F7F4F4' }}>
            <View style={{ alignItems: 'center' }}>
                <View style={{ height: width / 2.2, width: '100%' }}>
                    <SwiperDashboard autoplay={true} activeDotColor={"green"} activeDotStyle={{ marginBottom: 40 }} dotStyle={{ marginBottom: 40 }}>
                        {slider}
                    </SwiperDashboard>
                </View>
                <View style={{ height: height * 0.06, backgroundColor: 'transparant' }}></View>
                <View style={{
                    width: '80%',
                    height: height * 0.09,
                    borderRadius: 16,
                    position: 'absolute',
                    alignItems: "center",
                    bottom: 9,
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.30,
                    shadowRadius: 2.65,

                    elevation: 4,
                }}>
                    <View style={styles.slide}>
                        <Icon name="newspaper" color={'green'} size={26} />
                        <View style={styles.slideInnerContainer}>
                            <Text style={{ fontSize: 9, color: 'green', fontWeight: 'bold' }}>
                                News : Cek Pinjaman Kreasi bermasalah, lakukan Somasi/Pengajuan Klaim. News : Cek Pinjaman Kreasi bermasalah, lakukan Somasi/Pengajuan Klaim.
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ marginTop: 10, marginBottom: 5, justifyContent: 'flex-start' }}>
                <Text style={{ marginLeft: 30, color: 'green', fontWeight: '300', fontSize: 18 }}>UPDATE</Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <ScrollView>
                <Animatable.View animation="fadeInLeft" style={{ height: height * 0.085, marginBottom: 3, flexDirection: 'row', alignItems: 'center', paddingHorizontal:5, paddingVertical: 8, justifyContent: 'space-between', borderBottomWidth:2, borderColor:'#F7F4F4'}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Button transparent style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => {
                                navigation.navigate('SeeMore')
                            }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="documents-outline" color={'orange'} size={26} />
                                <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                                    <Text style={{color:'green', fontWeight:'bold', fontSize:16}}>
                                            Paramita Rosadi
                                        </Text>
                                    <Text
                                    style={{color:'grey', fontSize:12}}
                                       > 002266477331223434</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Icon name="chevron-forward" color={'orange'} size={26} />
                                </View>
                            </View>
                        </Button>
                    </View>
                </Animatable.View>
                <Animatable.View animation="fadeInLeft" style={{ height: height * 0.085, marginBottom: 3, flexDirection: 'row', alignItems: 'center', paddingHorizontal:5, paddingVertical: 8, justifyContent: 'space-between', borderBottomWidth:2, borderColor:'#F7F4F4' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Button transparent style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => {

                            }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="documents-outline" color={'orange'} size={26} />
                                <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                                    <Text style={{color:'green', fontWeight:'bold', fontSize:16}}>
                                            Paramita Rosadi
                                        </Text>
                                    <Text
                                    style={{color:'grey', fontSize:12}}
                                       > 002266477331223434</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Icon name="chevron-forward" color={'orange'} size={26} />
                                </View>
                            </View>
                        </Button>
                    </View>
                </Animatable.View>
                <Animatable.View animation="fadeInLeft" style={{ height: height * 0.085, marginBottom: 3, flexDirection: 'row', alignItems: 'center', paddingHorizontal:5, paddingVertical: 8, justifyContent: 'space-between', borderBottomWidth:2, borderColor:'#F7F4F4' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Button transparent style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => {

                            }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="document-attach-outline" color={'orange'} size={26} />
                                <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                                    <Text style={{color:'green', fontWeight:'bold', fontSize:16}}>
                                            Paramita Rosadi
                                        </Text>
                                    <Text
                                    style={{color:'grey', fontSize:12}}
                                       > 002266477331223434</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Icon name="chevron-forward" color={'orange'} size={26} />
                                </View>
                            </View>
                        </Button>
                    </View>
                </Animatable.View>
                <Animatable.View animation="fadeInLeft" style={{ height: height * 0.085, marginBottom: 3, flexDirection: 'row', alignItems: 'center', paddingHorizontal:5, paddingVertical: 8, justifyContent: 'space-between', borderBottomWidth:2, borderColor:'#F7F4F4' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Button transparent style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => {

                            }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="document-text-outline" color={'orange'} size={26} />
                                <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                                    <Text style={{color:'green', fontWeight:'bold', fontSize:16}}>
                                            Paramita Rosadi
                                        </Text>
                                    <Text
                                    style={{color:'grey', fontSize:12}}
                                       > 002266477331223434</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Icon name="chevron-forward" color={'orange'} size={26} />
                                </View>
                            </View>
                        </Button>
                    </View>
                </Animatable.View>
                <LinearGradient
                    colors={["#0B8E45", "#6FB34C"]}
                    style={{ marginTop: 10, width: '85%', alignSelf: 'center', alignItems: 'center', borderRadius: 16 }}
                >
                    <Button transparent style={{ justifyContent: 'center', width: '100%' }}
                        onPress={() => {
                            navigation.navigate('SeeMore')
                        }}>
                        <Text
                            style={{ fontSize: 16, color: "white" }} >
                            SEE MORE
                        </Text>
                    </Button>
                </LinearGradient>
                </ScrollView>
            </Animatable.View>
        </View>
    )
}

const renderItem = ({ item, index }) => {
    return (
        <View style={styles.slide}>
            <Icon name="newspaper" color={'green'} size={26} />
            <View style={styles.slideInnerContainer}>
                <Text style={{ fontSize: '10', color: 'green', fontWeight: 'bold' }}>
                    {item.newsDesc}
                </Text>
            </View>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    footer: {
        marginTop: 10,
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 2.65,

        elevation: 4,
    },
    slide: {
        marginTop: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        borderRadius: 8,
        alignItems: 'center'
    },
    slideInnerContainer: {
        flexDirection: 'column',
        marginLeft: 8,
        borderRadius: 8,
        flex: 1
        // other styles for the inner container
    }
})
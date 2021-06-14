import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

import {Image,Button,} from '../../../UI/Component';
// import {
//     Slider1,
//     Slider2,
//     Slider3,
//     Slider4,
//     Slider5,
//     Slider6,
//     Slider7,
//     Slider8,
//     Slider9,
//     Slider10,
//     Slider11,
//     Slider12,
//     Slider13,
//     Slider14,
//     Slider16,
//     Slider17
// } from '../../../Assets/Images';
import Swiper from 'react-native-swiper';


export function SwiperDashboard(props) {
    let {children, nextButton, activeDotStyle, dotStyle, showsButtons,activeDotColor,autoplay, buttonWrapperStyle, dotColor, index} = props;

    const {width, height} = Dimensions.get('screen');
    //alert('window width: '+Dimensions.get("window").width+'height '+Dimensions.get("window").height);
    return (

        <View style={styles.container}>
            <Swiper nextButton={nextButton} autoplayTimeout={3.5} style={styles.wrapper} paginationStyle={{marginBottom:-20}} showsButtons={showsButtons} autoplay={autoplay} dotStyle={dotStyle} activeDotStyle={activeDotStyle}
                    activeDotColor={activeDotColor} buttonWrapperStyle={buttonWrapperStyle} dotColor={dotColor} index={index}>
                {children}
            </Swiper>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
    },
    slide1: {
        flex: 1,
        //backgroundColor: COLORS.GREEN,
    },
    slide2: {
        flex: 1,
        //backgroundColor: COLORS.WHITE,
    },
    slide3: {
        flex: 1,
        //backgroundColor: COLORS.WHITE,
    },
    slide4: {
        flex: 1,
        //backgroundColor: COLORS.WHITE,
    },
    slide5: {
        flex: 1,
        //backgroundColor: COLORS.WHITE,
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
});
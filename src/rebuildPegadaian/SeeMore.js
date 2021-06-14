import React from 'react'
import { View } from 'react-native'
import { Text, Button } from 'native-base'



const SeeMore = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button style={{ backgroundColor: "white", borderRadius: 16, alignSelf: 'center', justifyContent: 'center', paddingHorizontal: 15 }}
                onPress={() => {
                    //this.userVerfy();
                    navigation.navigate('DocumentList')
                }}>
                <Text style={{ color: "#5495FF" }}>NEXT</Text>
            </Button>
        </View>
    )
}

export default SeeMore;
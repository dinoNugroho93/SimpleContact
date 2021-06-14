import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Text } from 'native-base'


const Tugasku = () => {
    const [items, setItems] = React.useState([
        { name: 'Input Data Survei', code: '#1abc9c' },
        { name: 'Daftar Survei', code: '#2ecc71' },
        { name: 'Persetujuan', code: '#3498db' },
        { name: 'Pengajuan Kredit', code: '#9b59b6' },
        { name: 'Konfirmasi Nasabah', code: '#34495e' },
        { name: 'Input Data Survei', code: '#16a085' },
        { name: 'Daftar Persetujuan Analis Kredit', code: '#27ae60' },
        { name: 'Konfirmasi Nasabah Badan Usaha', code: '#2980b9' },

    ]);

    return (
        <View style={{ backgroundColor: '#F7F4F4', paddingHorizontal: 20 }}>
            <Text style={{ marginTop: 20, color: 'green', fontWeight: '300', fontSize: 18 }}>TUGASKU</Text>
            <FlatGrid
                itemDimension={80}
                data={items}
                style={styles.gridView}
                //   staticDimension={100}
                //   fixed
                spacing={20}
                renderItem={({ item }) => (
                    <View style={[styles.itemContainer, { backgroundColor: 'white' }]}>
                        <Button transparent style={{
                            flex: 1, width: '100%', alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Icon name="newspaper" color={'orange'} size={30} />
                                <Text style={styles.itemName}>{item.name}</Text>
                            </View>
                        </Button>
                    </View>
                )}
            />
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
        </View>
    );
}

export default Tugasku;

const styles = StyleSheet.create({
    gridView: {
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 2.65,

        elevation: 4,
    },
    itemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        height: 80,
    },
    itemName: {
        textAlign: 'center',
        fontSize: 8,
        color: 'green',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: 'green',
    },
});
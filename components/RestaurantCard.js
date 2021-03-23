import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'

const RestaurantCard = ({navigation, name}) => {
    return (
        <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate(name)}>
            <View style={styles.subBox}>
                <Image source={require('../assets/images/icons/thumbnail.png')} style={styles.thumbnail} />
            </View>
            <View style={styles.info}>
                <View style={styles.parentText}><Text style={styles.name}>Sliema Restaurant</Text></View>
                <View style={styles.parentText}><Text style={styles.address}>Triq Moroni Cremona, 26100 CR</Text></View>
            </View>
            
        </TouchableOpacity>
    )
}

export default RestaurantCard

const styles = StyleSheet.create({
    card:{
        backgroundColor: '#fff',
        borderRadius: 17,
        width: widthPercentageToDP(84),
        height: 115,
        padding: widthPercentageToDP(2.5),
        marginHorizontal: widthPercentageToDP(8),
        marginTop: 20,
        elevation: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    subBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: widthPercentageToDP(25),
        height: '100%',
        backgroundColor:'#635CC910',
        borderRadius: 10,
    },
    thumbnail:{
        width: '100%',
        height: '100%'
    },
    info:{
        flexDirection: 'column',
        justifyContent:'space-between',
        paddingHorizontal: widthPercentageToDP(3),
        width: widthPercentageToDP(55),
    },
    parentText:{
        display:'flex',
        flexDirection:'row',
        width: widthPercentageToDP(49)
    },
    name:{
        flexWrap: 'wrap',
        color: '#635CC9',
        fontFamily: 'Poppins Medium',
        fontSize: 24,
        lineHeight: 25
    },
    address:{
        flexWrap: 'wrap',
        fontFamily: 'Poppins Medium',
        fontSize: 15,
        color: '#cfcfcf',
        lineHeight: 17
    }
})

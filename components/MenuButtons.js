import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'

const MenuButtons = ({onPress, uri, title,navigation}) => {
    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={onPress} style={styles.part1}>
                <View style={styles.subBox}>
                    <Image source={{uri:uri}} style={styles.plus} />
                </View>
                <Text style={styles.new}>{title}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('EditMenu')}}>
                <Image source={require('../assets/images/icons/edit.png')}/>
            </TouchableOpacity>
        </View>
    )
}

export default MenuButtons

const styles = StyleSheet.create({
    card:{
        backgroundColor: '#fff',
        borderRadius: 17,
        width: widthPercentageToDP(84),
        height: 90,
        padding: 10,
        marginHorizontal: widthPercentageToDP(8),
        marginTop: 15,
        elevation: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    part1:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center' 
    },
    subBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: '100%',
        backgroundColor:'#635CC910',
        borderRadius: 10,
    },
    new:{
        fontFamily: 'Poppins Medium',
        color: '#635CC9',
        fontSize: 15,
        marginLeft: 15
    },
    plus:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10
    }
})

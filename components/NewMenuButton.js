import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'

const NewMenuButton = ({navigation, uri, title,action}) => {
    return (
        <TouchableOpacity style={styles.card} onPress={action}>
                <View style={styles.subBox}>
                    <Image source={require('../assets/images/icons/plus.png')} style={styles.plus} />
                </View>
                <Text style={styles.new}>Add Section</Text>
        </TouchableOpacity>
    )
}

export default NewMenuButton

const styles = StyleSheet.create({
    card:{
        backgroundColor: '#fff',
        borderRadius: 17,
        width: widthPercentageToDP(84),
        height: 90,
        padding: 10,
        marginHorizontal: widthPercentageToDP(8),
        marginTop: 15,
        elevation:2,
//ios
        shadowColor: "#d4d4d4",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
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
        height: 25,
        width: 25
    }
})

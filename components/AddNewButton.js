import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'

const AddNewButton = ({navigation, name}) => {
    return (
        <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate(name)}>
            <View style={styles.subBox}>
                <Image source={require('../assets/images/icons/plus.png')} style={styles.plus} />
            </View>
            <Text style={styles.new}>Add New</Text>
        </TouchableOpacity>
    )
}

export default AddNewButton

const styles = StyleSheet.create({
    card:{
        backgroundColor: '#fff',
        borderRadius: 17,
        width: widthPercentageToDP(84),
        height: 115,
        padding: 10,
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
        width: 97,
        height: '100%',
        backgroundColor:'#635CC910',
        borderRadius: 10,
    },
    new:{
        fontFamily: 'Poppins Medium',
        color: '#635CC9',
        fontSize: 15,
        marginLeft: 15
    }
})

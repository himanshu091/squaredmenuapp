import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'

const ImageChoice = ({camerapick, imagepick}) => {
    return (
        <View style={styles.main}>
            <TouchableOpacity style={styles.main2} onPress={camerapick}>
                <Image source={require('../assets/images/icons/camImg.png')} style={styles.img}/>
                <Text style={styles.txt}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.main2} onPress={imagepick}>
                <Image source={require('../assets/images/icons/gallery.png')} style={styles.img}/>
                <Text style={styles.txt}>Choose from Gallery</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ImageChoice

const styles = StyleSheet.create({
    main:{
        flexDirection: 'row',
        justifyContent:'space-evenly',
        alignItems: 'center',
        height: '80%',
    },
    main2:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    img:{
        height: 50,
        width: 50
    },
    txt:{
        fontFamily: 'Poppins Medium',
        fontSize: 13
    }
})

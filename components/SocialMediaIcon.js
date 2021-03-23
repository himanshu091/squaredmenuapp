import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'

const SocialMediaIcon = () => {
    return (
        <View style={styles.socialMedia}>
              <Image
              style={styles.icon}
            source={require('../assets/images/icons/facebook.png')}
            />
            <Image
             style={styles.icon}

            source={require('../assets/images/icons/google.png')}
            />
        </View>
    )
}

export default SocialMediaIcon

const styles = StyleSheet.create({

    socialMedia:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'

    },
    icon:{
        marginHorizontal:10
    }
})

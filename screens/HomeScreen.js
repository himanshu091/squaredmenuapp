import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

const HomeScreen = () => {
    return (
        <SafeAreaView>
            <View>
                <ImageBackground source={require('../assets/images/banners/lands.png')} style={styles.banner} resizeMode="cover">
                    <TouchableOpacity style={styles.bell}><Image source={require('../assets/images/icons/bell.png')}/></TouchableOpacity>
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/images/logoinapp/logoflat.png')} style={styles.logo}/>
                    </View>
                    <View style={styles.info}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.name}>Your Business</Text>
                        </View>
                        <View>
                            <Image source={require('../assets/images/profile/user.png')}/>
                        </View>
                    </View>
                </ImageBackground>
                <TouchableOpacity style={styles.card}>
                    <View style={styles.subBox}>
                        <Image source={require('../assets/images/icons/plus.png')} style={styles.plus} />
                    </View>
                    <Text style={styles.new}>Add New</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    banner:{
        position: 'relative',
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(30)
    },
    logoContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        marginTop: heightPercentageToDP(8.5)
    },
    logo:{},
    bell:{
        position:'absolute',
        top: heightPercentageToDP(5),
        right:widthPercentageToDP(3.5)
    },
    info:{
        marginTop:20,
        paddingHorizontal: 20,
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    nameContainer:{
        flexBasis: widthPercentageToDP(60),
    },
    name:{
        lineHeight: heightPercentageToDP(5),
        fontFamily: 'Poppins Medium',
        fontStyle: 'normal',
        fontSize: 37,
        color: '#FFFFFF'
    },
    card:{
        backgroundColor: '#fff',
        borderRadius: 17,
        width: widthPercentageToDP(84),
        height: 115,
        padding: 10,
        marginHorizontal: widthPercentageToDP(8),
        marginTop: 40,
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

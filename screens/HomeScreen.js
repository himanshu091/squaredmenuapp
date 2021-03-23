import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import AddNewButton from '../components/AddNewButton'
import RestaurantCard from '../components/RestaurantCard'

const HomeScreen = ({navigation}) => {
    return (
        <SafeAreaView>
            <View>
                <ImageBackground source={require('../assets/images/banners/lands.png')} style={styles.banner} resizeMode="stretch">
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
                <RestaurantCard name='Menu' navigation={navigation}/>
                <AddNewButton name='AddABusiness' navigation={navigation}/>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    banner:{
        position: 'relative',
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(30),
        marginBottom: 30
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
        lineHeight: 38,
        fontFamily: 'Poppins Medium',
        fontStyle: 'normal',
        fontSize: 37,
        color: '#FFFFFF'
    },
    

})

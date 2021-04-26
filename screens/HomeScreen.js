import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import AddNewButton from '../components/AddNewButton'
import RestaurantCard from '../components/RestaurantCard'
import { getRestaurants, logout } from '../store/action'
import { useFocusEffect } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'

const HomeScreen = ({ navigation, logout, user_id, token, image, getRestaurants }) => {
    const [data, setdata] = useState(null)
    useEffect(async () => {
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        const res = await getRestaurants(bodyFormData)
        setdata(res)
    }, [])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            console.log("Mounted Home")
            var bodyFormData = new FormData();
            bodyFormData.append('user_id', user_id);
            bodyFormData.append('token', token);
            const res = await getRestaurants(bodyFormData)
            setdata(res)
        });

        return unsubscribe;
    }, [navigation]);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    <ImageBackground source={require('../assets/images/banners/lands.png')} style={styles.banner} resizeMode="stretch">
                        <TouchableOpacity style={styles.bell} onPress={()=>navigation.navigate('Notification')}><Image style={{height:53, width: 53}} source={require('../assets/images/icons/bell.png')} /></TouchableOpacity>
                        <View style={styles.logoContainer}>
                            <Image source={require('../assets/images/logoinapp/logoflat.png')} style={styles.logo} />
                        </View>
                        <View style={styles.info}>
                            <View style={styles.nameContainer}>
                                <Text style={styles.name}>Your Business</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
                                {image.trim().length < 1 && <Image style={styles.profilePic} source={require('../assets/images/profile/profile.png')} />}
                                {image.trim().length > 0 && <FastImage
                                    style={styles.profilePic}
                                    source={{
                                        uri: image,
                                        priority: FastImage.priority.normal,
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />}

                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                    {data ? <>
                        {data && data.map((item, idx) => {
                            return <RestaurantCard key={idx} name='Menu' navigation={navigation} data={item} />
                        })}
                        {data.length < 1 && <AddNewButton name='AddABusiness' navigation={navigation} />}
                    </> : <View style={styles.loading}><Text style={styles.loadingText}></Text></View>}
                </View>
                <View style={{ marginBottom: 50 }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}
const mapStataeToProps = state => {
    return {
        user_id: state.auth.user_id,
        token: state.auth.token,
        image: state.auth.image
    }
}
export default connect(mapStataeToProps, { logout, getRestaurants, getRestaurants })(HomeScreen)

const styles = StyleSheet.create({
    banner: {
        position: 'relative',
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(30),
        marginBottom: 30
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: heightPercentageToDP(6.5)
    },
    logo: {
        width: 167,
        height: 22.5
    },
    bell: {
        position: 'absolute',
        top: heightPercentageToDP(5),
        right: widthPercentageToDP(3.5)
    },
    info: {
        marginTop: 20,
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    nameContainer: {
        flexBasis: widthPercentageToDP(60),
    },
    name: {
        lineHeight: 38,
        fontFamily: 'Poppins Medium',
        fontStyle: 'normal',
        fontSize: 37,
        color: '#FFFFFF'
    },
    loading: {
        marginTop: 50

    },
    loadingText: {
        textAlign: 'center',
        fontFamily: 'Poppins Medium',
        fontSize: 20
    },
    profilePic: {
        height: 70,
        width: 70,
        borderRadius: 70,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor:'#fff'
    }

})

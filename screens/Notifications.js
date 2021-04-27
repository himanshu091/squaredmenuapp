import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import AddNewButton from '../components/AddNewButton'
import RestaurantCard from '../components/RestaurantCard'
import { getNotifications, logout } from '../store/action'
import { useFocusEffect } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
import moment from 'moment'
import HeaderSVG from '../components/HeaderSVG'

const Notifications = ({ navigation, logout, user_id, token, image, getNotifications, route }) => {
    
    const [data, setdata] = useState(null)
    useEffect(async () => {
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        const res = await getNotifications(bodyFormData)
        setdata(res.data.data)
    }, [])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            console.log("Mounted Home")
            var bodyFormData = new FormData();
            bodyFormData.append('user_id', user_id);
            bodyFormData.append('token', token);
            const res = await getNotifications(bodyFormData)
            setdata(res.data.data)
        });

        return unsubscribe;
    }, [navigation]);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    <HeaderSVG uri={route.params.brandImage}/>
                    <View  style={styles.banner}>
                        <TouchableOpacity 
                            style={styles.bell}
                            onPress={()=>navigation.goBack()}
                        >
                            <Image source={require('../assets/images/onboarding/next.png')} style={{height:42, width:42}}/>
                        </TouchableOpacity>
                        <View style={styles.info}>
                            <View style={styles.nameContainer}>
                                <Text style={styles.name}>Notifications</Text>
                            </View>
                            <View>
                                <Image style={styles.profilePic} source={require('../assets/images/icons/notif.png')} />
                            </View>
                        </View>
                    </View>
                    
                    {data && data.map((item, idx) => {
                        return <View style={styles.notiCard} key={idx}>
                                    <View style={styles.activity}></View>
                                    <View style={styles.message}>
                                        <Text style={styles.mainText}>{item.data}</Text>
                                        <Text style={styles.duration}>{moment(item.created_at).fromNow()}</Text>
                                    </View>
                                </View>
                    })}
                    {data && data.length === 0 && <View style={{flexDirection: 'column', justifyContent:'center', height: 300}}>
                        <Text style={{textAlign: 'center', fontFamily: 'Poppins Medium', color: '#00000050'}}>No Notifications Available</Text>
                    </View>}
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
export default connect(mapStataeToProps, { logout, getNotifications, getNotifications })(Notifications)

const styles = StyleSheet.create({
    banner: {
        position: 'relative',
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(30),
        marginBottom: 30,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: heightPercentageToDP(8.5)
    },
    logo: {},
    bell: {
        position: 'absolute',
        top: heightPercentageToDP(5),
        left: widthPercentageToDP(3.5),
        transform: [{ rotate: '180deg'}]
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
        lineHeight: 37 * 0.75,
        paddingTop: 40 - 35 * 0.75,
        fontFamily: 'Poppins Medium',
        fontStyle: 'normal',
        fontSize: widthPercentageToDP(8.8),
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
        height: 46,
        width: 46,
        marginBottom: 10
    },
    notiCard:{
        marginHorizontal: 13,
        backgroundColor: '#fff',
        display:'flex',
        flexDirection:'row',
        borderRadius: 6,
        marginBottom: 12
    },
    activity:{
        backgroundColor: '#635CC9',
        height: '100%',
        width: 6,
        borderRadius: 10
    },
    message:{
        flexDirection:'column',
        justifyContent: 'space-evenly',
        paddingVertical: 21,
        paddingLeft: 10
    },
    mainText:{
        fontFamily: 'Poppins Regular',
        fontSize: 15
    },
    duration:{
        fontFamily: 'Poppins Regular',
        fontSize: 10,
        color: '#989898'
    },


})

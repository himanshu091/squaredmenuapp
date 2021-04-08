import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import AddNewButton from '../components/AddNewButton'
import RestaurantCard from '../components/RestaurantCard'
import { getRestaurants, logout } from '../store/action'
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({navigation, logout, user_id, token, getRestaurants}) => {
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
        <SafeAreaView style={{flex:1}}>
            <ScrollView>
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
                        <TouchableOpacity onPress={()=>navigation.navigate('UserProfile')}>
                            <Image source={require('../assets/images/profile/user.png')}/>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                {data?<>
                {data && data.map((item,idx)=>{
                    return <RestaurantCard key={idx} name='Menu' navigation={navigation} data={item}/>
                })}
                {data.length < 1 && <AddNewButton name='AddABusiness' navigation={navigation}/>}
                </>:<View style={styles.loading}><Text style={styles.loadingText}>Fetching Data...</Text></View>}
            </View>
            <View style={{marginBottom:50}}></View>
            </ScrollView>
        </SafeAreaView>
    )
}
const mapStataeToProps = state => {
    return {
        user_id: state.auth.user_id,
        token: state.auth.token
    }
}
export default connect(mapStataeToProps, {logout,getRestaurants,getRestaurants})(HomeScreen)

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
    loading:{
        marginTop: 50
        
    },
    loadingText:{
        textAlign: 'center',
        fontFamily: 'Poppins Medium',
        fontSize: 20
    }

})

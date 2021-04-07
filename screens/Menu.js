import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import HeaderSVG from '../components/HeaderSVG'
import MenuButtons from '../components/MenuButtons'
import NewMenuButton from '../components/NewMenuButton'
import { getMenu } from '../store/action'

const Menu = ({navigation, user_id, token, getMenu, route}) => {
    const [data, setdata] = useState(null)
    useEffect(async () => {
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        bodyFormData.append('restaurant_id', route.params.restaurant_id);
        const res = await getMenu(bodyFormData)
        setdata(res.data.data)
    }, [])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            var bodyFormData = new FormData();
            bodyFormData.append('user_id', user_id);
            bodyFormData.append('token', token);
            bodyFormData.append('restaurant_id', route.params.restaurant_id);
            const res = await getMenu(bodyFormData)
            setdata(res.data.data)
        });
    
        return unsubscribe;
    }, [navigation]);
    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView>
                <HeaderSVG uri={route.params.brandImage}/>
                <View source={require('../assets/images/banners/mask.png')} style={styles.banner} resizeMode="stretch">
                    <TouchableOpacity 
                        style={styles.bell}
                        onPress={()=>navigation.goBack()}
                    >
                        <Image source={require('../assets/images/onboarding/next.png')}/>
                    </TouchableOpacity>
                    
                    <View style={styles.info}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.name}>{data && data.restaurant.name}</Text>
                        </View>
                    </View>
                </View>
               {data && data.menu.map((item, idx) => {
                   return <MenuButtons key={idx} navigation={navigation} title={item.name} uri={item.image} data={item} restaurant_id={route.params.restaurant_id} />
               })}
                
               <NewMenuButton action={()=>navigation.navigate('NewMenu',{restaurant_id:route.params.restaurant_id})}/>
               <View style={{marginBottom: 150}}></View>
            </ScrollView>
            <TouchableOpacity style={styles.qrbutton} onPress={()=>navigation.navigate('QR')}>
                <Image source={require('../assets/images/icons/qr.png')}/>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
const mapStataeToProps = state => {
    return {
        user_id: state.auth.user_id,
        token: state.auth.token
    }
}
export default connect(mapStataeToProps,{getMenu})(Menu)

const styles = StyleSheet.create({
    banner:{
        position: 'relative',
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(30),
        marginBottom: 25
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
        left:widthPercentageToDP(3.5),
        transform: [{ rotate: '180deg'}]
    },
    info:{
        marginTop:heightPercentageToDP(14),
        paddingHorizontal: 20,
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameContainer:{
        flexBasis: widthPercentageToDP(66),
        flexDirection:'row'
    },
    name:{
        flexWrap:'wrap',
        fontFamily: 'Poppins Medium',
        fontStyle: 'normal',
        fontSize: 37,
        color: '#FFFFFF',
        lineHeight:40,
        textTransform: 'capitalize'
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
    },
    qrbutton:{
        position: 'absolute',
        right: 25,
        top: heightPercentageToDP(84),
        backgroundColor: '#fff',
        padding: 22,
        borderRadius: 100,
        elevation: 5
    }

})

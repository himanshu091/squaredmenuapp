import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity, ScrollView, Linking } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import HeaderSVG from '../components/HeaderSVG'
import MenuSection from '../components/MenuSection'
import FastImage from 'react-native-fast-image'
import { generateQR, sendQrOverMail } from '../store/action'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import Clipboard from '@react-native-clipboard/clipboard';


const QR = ({navigation, generateQR, sendQrOverMail, token, user_id, route}) => {
    console.log("brandimage",route.params)
    const [myQrLink, setMyQrLink] = useState(null)
    const [loading, setloading] = useState(false)
    const [copiedText, setCopiedText] = useState('');
    const getQR = async () => {
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        bodyFormData.append('restaurant_id', route.params.restaurant_id);
        const res = await generateQR(bodyFormData)
        setMyQrLink(res.data.data)
    }
    const browseQR = async () => {
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        bodyFormData.append('restaurant_id', route.params.restaurant_id);
        const res = await generateQR(bodyFormData)
        if(res.data.status){
            // Linking.openURL(res.data.data)
            Clipboard.setString(res.data.data.public_url);
            alert('Copied to Clipboard!');
        }else{
            alert(res.data.message)
        }
    }
    const getQRByMail = async () => {
        setloading(true)
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        bodyFormData.append('restaurant_id', route.params.restaurant_id);
        const res = await sendQrOverMail(bodyFormData)
        setloading(false)
        if(res.data.status){
            alert(res.data.message)
        }else{
            alert(res.data.message)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <HeaderSVG uri={route.params.img}/>
                <View  style={styles.banner} >
                    <TouchableOpacity 
                        style={styles.bell}
                        onPress={()=>navigation.goBack()}
                    >
                        <Image source={require('../assets/images/onboarding/next.png')} style={{height:42, width:42}}/>
                    </TouchableOpacity>
                    <View style={styles.logoContainer}><Image source={require('../assets/images/logoinapp/logoflat.png')} style={styles.logo} /></View>
                    <TouchableOpacity style={styles.previewBTN} onPress={() => Linking.openURL(route.params.url)}>
                        <Text style={styles.preview}>Open Menu</Text>
                    </TouchableOpacity>
                    <View style={styles.info}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.name}>Your QR Code</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.QRcontainer} onPress={getQRByMail}>
                    <FastImage
                        style={styles.qrBox}
                        source={require('../assets/images/icons/qr-code.png')}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </TouchableOpacity>
                <Text style={styles.hint}>Tap to view printable version</Text>
                <TouchableOpacity style={styles.btn1} onPress={browseQR}>
                    <Text style={styles.btnText1}>Copy URL</Text>
                </TouchableOpacity>
                {!loading && <TouchableOpacity style={styles.btn2} onPress={getQRByMail}>
                    <Text style={styles.btnText2}>Get the printable PDF</Text>
                </TouchableOpacity>}
                {loading && <TouchableOpacity style={styles.btn2} onPress={getQRByMail}>
                    <Text style={styles.btnText2}>Generating...</Text>
                </TouchableOpacity>}
                <View style={{marginBottom:97}}></View>
            </ScrollView>
        </SafeAreaView>
    )
}
const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        user_id: state.auth.user_id
    }
}
export default connect(mapStateToProps,{generateQR, sendQrOverMail})(QR)

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },
    banner:{
        position: 'relative',
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(30),
        marginBottom: 25
    },
    logo: {
        width: 167,
        height: 22.5
    },
    bell:{
        position:'absolute',
        top: heightPercentageToDP(5),
        left:widthPercentageToDP(3.5),
        transform: [{ rotate: '180deg'}]
    },
    info:{
        marginTop:heightPercentageToDP(8),
        paddingHorizontal: 20,
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    
    nameContainer:{
        flexBasis: widthPercentageToDP(60),
        flexDirection:'row'
    },
    name:{
        flexWrap:'wrap',
        fontFamily: 'Poppins Medium',
        fontStyle: 'normal',
        fontSize: 37,
        color: '#FFFFFF',
        lineHeight:40
    },
    menuName:{
        flexWrap:'wrap',
        fontFamily: 'Poppins Medium',
        fontStyle: 'normal',
        fontSize: 37,
        color: '#FFFFFF',
        lineHeight:40
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
    plus:{
        height: 13,
        width: 13,
    },
    logoContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        marginTop: heightPercentageToDP(1.5),
        marginBottom: heightPercentageToDP(3)
    },
    QRcontainer:{
        flexDirection: 'row',
        justifyContent: 'center',
    },
    qrBox:{
        width: widthPercentageToDP(65), 
        height: widthPercentageToDP(65),
        borderWidth: 3,
        borderColor: '#726AE9',
        borderRadius: 37,
        elevation: 3
    },
    hint: {
        fontFamily: 'Poppins Regular',
        fontSize: 13,
        textAlign: 'center',
        color: '#989898',
        marginTop: 9
    },
    btn1:{
        backgroundColor: '#635CC9',
        paddingBottom: 17,
        paddingTop: 19,
        marginHorizontal: 28,
        borderRadius: 58,
        marginTop: 29,
        borderColor: '#635CC9',
        borderWidth: 2
    },
    btnText1:{
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Poppins Medium',
        textAlign: 'center'
    },
    btn2:{
        backgroundColor: '#fff',
        paddingVertical: 18,
        marginHorizontal: 28,
        borderRadius: 58,
        marginTop: 10,
        borderColor: '#635CC9',
        borderWidth: 2
    },
    btnText2:{
        color: '#635CC9',
        fontSize: 15,
        fontFamily: 'Poppins Medium',
        textAlign: 'center'
    },
    previewBTN: {
        backgroundColor: '#fff',
        paddingHorizontal: 18,
        paddingVertical: 7,
        borderRadius: 23,
        position: 'absolute',
        top: heightPercentageToDP(5.4),
        right: widthPercentageToDP(3.5),
    },
    preview: {
        fontFamily: 'Poppins Medium',
        fontSize: 16,
        color: '#635CC9'
    },
})

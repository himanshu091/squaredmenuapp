import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import HeaderSVG from '../components/HeaderSVG'
import MenuSection from '../components/MenuSection'
import FastImage from 'react-native-fast-image'
const ImageLink = 'https://s3-alpha-sig.figma.com/img/47a5/945d/ae55611ab56a6f826a46055932cfb38a?Expires=1617580800&Signature=EKCvvFr84nP3GhRMSQ9uqSm8eQVI~Tf6RlCDVxME34ni~YgkE9K0DU~ApnBDjb~WT7ItSPayKunlqwmO7uaapdTpdhsAv-4FjmqbDhHQBgyWVfVqxMGym5sh9NrPsNfXKgsJib-tYTszxUadRhag8xnnG7GmZVdAiChUcfkY5ah6QHSDbvGRWouOCmZe1SDkCvpujh8YMmtnVZfvR3Gn3srELJfcsAxZrM8oyo3p8pCDvPaNW4RbtiseqRRhuFJ6HaAW7LJYjgT9Vpfjv1ix28SLxoVl345qeThS33QK0QGTBWJIHOsVkeu4SWNw4DA~ZZ2EpvdHxYQzi9htCep4Ow__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA';
const QR = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <HeaderSVG uri="https://s3-alpha-sig.figma.com/img/ad27/11d3/af86a9765d0ac9a0ad17ee7d95d3e855?Expires=1617580800&Signature=OsQaZ62WVy4mNZII~tzmTHTaLjbivYMslOZHxIuzZUgPV7o1rh20xkkPk7fgWXRORF~P8RtSXEGxWwpVNaRCXEuXyHySaTTg0YVsbudnnOhoKYwshty6kepkZcXbwuWa5DN-ZAdik2cKAd2NSYCXFjdAWsykfugR2zHjWw5wkiEyLuwjlWZmv8slkh2EMlHR2lPKWVPhpnF2FzHc3WUv8GmR7dncGsVThq4OOZJYXSuAxJn8IhQhu2kEznzb-cUBRFxQTSwN~NBBHxsiLmCSNSLDWaqBL3YDmzvo~huiGAVUWBufemTfGR~jQK12Fjc1hxTDexMHs-wrmJNhu6gHcQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"/>
                <View source={require('../assets/images/banners/mask.png')} style={styles.banner} resizeMode="stretch">
                    {/* <TouchableOpacity 
                        style={styles.bell}
                        onPress={()=>navigation.goBack()}
                    >
                        <Image source={require('../assets/images/onboarding/next.png')}/>
                    </TouchableOpacity> */}
                    <View style={styles.logo}><Image source={require('../assets/images/logoinapp/logoflat.png')} /></View>
                    <View style={styles.info}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.name}>Your QR Code</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.QRcontainer}>
                    <FastImage
                        style={styles.qrBox}
                        source={{
                            uri: ImageLink,
                            headers: { Authorization: 'someAuthToken' },
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </TouchableOpacity>
                <Text style={styles.hint}>Tap to view printable version</Text>
                <TouchableOpacity style={styles.btn1}>
                    <Text style={styles.btnText1}>Copy URL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn2}>
                    <Text style={styles.btnText2}>Get the printable PDF</Text>
                </TouchableOpacity>
                <View style={{marginBottom:97}}></View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default QR

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
        marginTop: heightPercentageToDP(8.5)
    },
    logo:{
        flexDirection: 'row',
        justifyContent:'center',
        marginTop: 20
    },
    QRcontainer:{
        flexDirection: 'row',
        justifyContent: 'center',
    },
    qrBox:{
        width: widthPercentageToDP(80), 
        height: widthPercentageToDP(80),
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
    }
})

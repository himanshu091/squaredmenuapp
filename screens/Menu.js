import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import HeaderSVG from '../components/HeaderSVG'
import MenuButtons from '../components/MenuButtons'
import NewMenuButton from '../components/NewMenuButton'
const data = [
    {
        title: "Breakfast Menu",
        uri: "https://s3-alpha-sig.figma.com/img/ad27/11d3/af86a9765d0ac9a0ad17ee7d95d3e855?Expires=1617580800&Signature=OsQaZ62WVy4mNZII~tzmTHTaLjbivYMslOZHxIuzZUgPV7o1rh20xkkPk7fgWXRORF~P8RtSXEGxWwpVNaRCXEuXyHySaTTg0YVsbudnnOhoKYwshty6kepkZcXbwuWa5DN-ZAdik2cKAd2NSYCXFjdAWsykfugR2zHjWw5wkiEyLuwjlWZmv8slkh2EMlHR2lPKWVPhpnF2FzHc3WUv8GmR7dncGsVThq4OOZJYXSuAxJn8IhQhu2kEznzb-cUBRFxQTSwN~NBBHxsiLmCSNSLDWaqBL3YDmzvo~huiGAVUWBufemTfGR~jQK12Fjc1hxTDexMHs-wrmJNhu6gHcQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
    },
    {
        title: "Lunch Menu",
        uri: "https://s3-alpha-sig.figma.com/img/ad27/11d3/af86a9765d0ac9a0ad17ee7d95d3e855?Expires=1617580800&Signature=OsQaZ62WVy4mNZII~tzmTHTaLjbivYMslOZHxIuzZUgPV7o1rh20xkkPk7fgWXRORF~P8RtSXEGxWwpVNaRCXEuXyHySaTTg0YVsbudnnOhoKYwshty6kepkZcXbwuWa5DN-ZAdik2cKAd2NSYCXFjdAWsykfugR2zHjWw5wkiEyLuwjlWZmv8slkh2EMlHR2lPKWVPhpnF2FzHc3WUv8GmR7dncGsVThq4OOZJYXSuAxJn8IhQhu2kEznzb-cUBRFxQTSwN~NBBHxsiLmCSNSLDWaqBL3YDmzvo~huiGAVUWBufemTfGR~jQK12Fjc1hxTDexMHs-wrmJNhu6gHcQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
    },
    
]
const Menu = ({navigation}) => {
    return (
        <SafeAreaView>
            <View style={{minHeight:heightPercentageToDP(100)}}>
            <ScrollView>
                <HeaderSVG uri="https://s3-alpha-sig.figma.com/img/ad27/11d3/af86a9765d0ac9a0ad17ee7d95d3e855?Expires=1617580800&Signature=OsQaZ62WVy4mNZII~tzmTHTaLjbivYMslOZHxIuzZUgPV7o1rh20xkkPk7fgWXRORF~P8RtSXEGxWwpVNaRCXEuXyHySaTTg0YVsbudnnOhoKYwshty6kepkZcXbwuWa5DN-ZAdik2cKAd2NSYCXFjdAWsykfugR2zHjWw5wkiEyLuwjlWZmv8slkh2EMlHR2lPKWVPhpnF2FzHc3WUv8GmR7dncGsVThq4OOZJYXSuAxJn8IhQhu2kEznzb-cUBRFxQTSwN~NBBHxsiLmCSNSLDWaqBL3YDmzvo~huiGAVUWBufemTfGR~jQK12Fjc1hxTDexMHs-wrmJNhu6gHcQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"/>
                <View source={require('../assets/images/banners/mask.png')} style={styles.banner} resizeMode="stretch">
                    <TouchableOpacity 
                        style={styles.bell}
                        onPress={()=>navigation.goBack()}
                    >
                        <Image source={require('../assets/images/onboarding/next.png')}/>
                    </TouchableOpacity>
                    
                    <View style={styles.info}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.name}>Silema Menus</Text>
                        </View>
                    </View>
                </View>
               {data && data.map((item, idx) => {
                   return <MenuButtons key={idx} title={item.title} uri={item.uri}/>
               })}
                
               <NewMenuButton/>
            </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Menu

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

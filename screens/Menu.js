import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import Svg, { Circle, ClipPath, Defs, Path, Image as ImageSVG, Rect, Ellipse, Polygon, G, RadialGradient, Stop } from 'react-native-svg'

const Menu = ({navigation}) => {
    return (
        <SafeAreaView>
            <View>
                <ImageBackground source={require('../assets/images/banners/mask.png')} style={styles.banner} resizeMode="stretch">
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
                </ImageBackground>
                {/* <Svg
                    width={widthPercentageToDP(100)}
                    height={heightPercentageToDP(30)}
                    // viewBox="-16 -16 544 544"
                    >
                    <Path d="M160 218.5C96 243.5 44.5 179 0 208.5V0H375V180C284 236 294.855 165.822 160 218.5Z" fill="#635CC9"/>
                    
                </Svg> */}
                <Svg width={widthPercentageToDP(100)} height={160}>
                    <Defs>
                        <ClipPath id="clip">
                            <Path d="M160 218.5C96 243.5 44.5 179 0 208.5V0H375V180C284 236 294.855 165.822 160 218.5Z" fill="#635CC9"/>
                        </ClipPath>
                    </Defs>
                    {/* <Rect x="0" y="0" width="160" height="160" fill="red" clipPath="#clip" /> */}
                    <ImageSVG x="0" y="0" width={widthPercentageToDP(100)} height="160" href={{ uri: 'https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg' }} clipPath="#clip" />
                </Svg>
                <Svg height={heightPercentageToDP(30)} width={widthPercentageToDP(100)}>
                    <Defs>
                        <RadialGradient
                        id="grad"
                        cx="50%"
                        cy="50%"
                        rx="50%"
                        ry="50%"
                        fx="50%"
                        fy="50%"
                        gradientUnits="userSpaceOnUse"
                        >
                        <Stop offset="0%" stopColor="#ff0" stopOpacity="1" />
                        <Stop offset="100%" stopColor="#00f" stopOpacity="1" />
                        </RadialGradient>
                        <ClipPath id="clip">
                        <Path d="M160 218.5C96 243.5 44.5 179 0 208.5V0H375V180C284 236 294.855 165.822 160 218.5Z" fill="#635CC9"/>

                        {/* <Path d="M160 218.5C96 243.5 44.5 179 0 208.5V0H375V180C284 236 294.855 165.822 160 218.5Z" fill="#635CC9"/> */}
                        </ClipPath>
                    </Defs>
                    <ImageSVG x="0" y="0" width={widthPercentageToDP(100)} height="160" href={{ uri: 'https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg' }} clipPath="#clip" />
                </Svg>
            </View>
        </SafeAreaView>
    )
}

export default Menu

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
        flexBasis: widthPercentageToDP(100),
    },
    name:{
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

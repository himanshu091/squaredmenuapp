import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View,SafeAreaView, Image, TouchableOpacity } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { connect } from 'react-redux';

import i1 from '../assets/images/onboarding/part1.png'
import i2 from '../assets/images/onboarding/part2.png'
import i3 from '../assets/images/onboarding/part3.png'
import i4 from '../assets/images/onboarding/part4.png'
import { beginAuth } from '../store/action';

const slideImages = [
    i1, i2, i3, i4
]
const data = [
    {
        heading: "Create a menu",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        heading: "Add Sections & Items",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        heading: "Add Allergens",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        heading: "Print QR Code",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },

    
]
const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };
const OnboardingScreen = ({navigation, beginAuth}) => {
    const [slide, setslide] = useState(0)
    
    const showPreviousSlide = () => {
        if(slide > 0){
            setslide(slide-1)
        }
    }
    const showNextSlide = () => {
        if(slide < 3){
            setslide(slide+1)
        }
    }
    return (
        <SafeAreaView>
            <GestureRecognizer
                config={config}
                onSwipeRight={showPreviousSlide}
                onSwipeLeft={showNextSlide}>
            <View style={styles.container}>
                <Image source={slideImages[slide]} style={styles.container_image}/>
                {slide !== 3 && <TouchableOpacity style={styles.button} onPress={()=>setslide(slide+1)}>
                    <Image source={require('../assets/images/onboarding/next.png')} style={styles.button_image}/>
                </TouchableOpacity>}
                {/* {slide !== 0 && <TouchableOpacity style={styles.button_back} onPress={()=>setslide(slide-1)}>
                    <Image source={require('../assets/images/onboarding/next.png')} style={styles.button_image}/>
                </TouchableOpacity>} */}
                <View style={styles.textContent}>
                    <Text style={styles.heading}>{data[slide].heading}</Text>
                    <Text style={styles.content}>{data[slide].content}</Text>
                </View>
                <View style={styles.start_button_container}>
                    {slide === 3 && <TouchableOpacity style={styles.start_button} onPress={()=>{beginAuth()}}>
                        <Text style={styles.text}>Let's Start</Text>
                    </TouchableOpacity>}
                </View>
                {slide !== 3 && <TouchableOpacity style={styles.skip_button} onPress={()=>{setslide(3)}}>
                        <Text style={styles.skip}>Skip</Text>
                    </TouchableOpacity>}
                
            </View>
            </GestureRecognizer>
        </SafeAreaView>
    )
}

export default connect(null, {beginAuth})(OnboardingScreen)

const styles = StyleSheet.create({
    container:{
        position: 'relative',
        height:hp('100%'),
        backgroundColor:'#635cc9'
    },
    container_image:{
        height:hp('90%'),
        width:wp('100%')
    },
    skip_button:{
        position:'absolute',
        top: hp('89%'),
        left: 31,
        zIndex: 100,
    },
    skip:{
        fontFamily:'Poppins Bold',
        color: '#ffffff85'
    },
    button:{
        position:'absolute',
        top: hp('88%'),
        right: 31,
        zIndex: 100,
    },
    button_back:{
        position:'absolute',
        top: hp('88%'),
        right: 80,
        zIndex: 100,
        transform: [{ rotate: '180deg'}]
        
    },
    button_image:{
        height: 42,
        width: 42
    },
    start_button_container:{
        position:'absolute',
        top:hp(89),
        width: wp(100),
        display:'flex',
        flexDirection: 'row',
        justifyContent:'center'
    },
    start_button:{
        backgroundColor: '#fff',
        paddingVertical: 11,
        paddingHorizontal: 30,
        borderRadius: 30
    },
    text:{
        fontFamily:'Poppins Bold'
    },
    textContent:{
        position: 'absolute',
        top: hp(57),
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    heading:{
        textAlign: 'center',
        fontSize: 27,
        fontFamily: 'Poppins Bold',
        color: '#fff'
    },
    content:{
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'Poppins Light',
        color: '#fff',
        paddingHorizontal: 40
    }
})

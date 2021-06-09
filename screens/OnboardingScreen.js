import React, { useState, useContext } from 'react'
import { Platform } from 'react-native';
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
        heading: "Create your business",
        content: "Add your business name, details and the number of tables."
    },
    {
        heading: "Add sections and Items",
        content: "Now add sections (e.g. Breakfast, Hot Drinks, Burgers, Pizzas, ...). Each section contains items (i.e. your food/drink or product). Each item can have a single price or different price (variant) (e.g. Coke: small, medium, large)."
    },
    {
        heading: "Show allergens and dietary restrictions",
        content: "You can add up to 14 allergens, plus 4 dietary restrictions: gluten free, lactose free, vegan and vegetarian."
    },
    {
        heading: "Preview, style it and get your QR Code menu!",
        content: "Preview your menu and choose between free style template. And get your free QR code and place it on the table."
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
        <SafeAreaView >
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
        
    },
    container_image:{
        height:hp('100%'),
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
        top:Platform.OS === 'ios'?hp(83):hp(86),
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
        fontFamily:'Poppins Bold',
        color: '#635cc9'//To change
    },
    textContent:{
        position: 'absolute',
        top: hp(56),
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        
    },
    heading:{
        paddingHorizontal: wp(3),
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

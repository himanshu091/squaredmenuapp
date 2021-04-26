import React, { useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import HeaderSVG from '../components/HeaderSVG'
import MenuButtons from '../components/MenuButtons'
import NewMenuButton from '../components/NewMenuButton'
import SubMenu from '../components/SubMenu'
import RBSheet from "react-native-raw-bottom-sheet";
import ThemeChooser from '../components/ThemeChooser'
import { WebView } from 'react-native-webview';
const data = [
    {   
        sectionName: "Sweet",
        itemList: [
            {
                itemName: "Croissant",
                varient: true,
                varientList: [{
                    name: "Small",
                    cost: 2
                },
                {
                    name: "Medium",
                    cost: 4
                }]
            },
            {
                itemName: "White Sauce Pasta",
                varient: false,
                cost: 4
            },
            {
                itemName: "Red Sauce Pasta",
                varient: false,
                cost: 4
            },
        ]
        
    },
    {   
        sectionName: "Spicy",
        itemList: [
            {
                itemName: "Croissant",
                varient: true,
                varientList: [{
                    name: "Small",
                    cost: 2.5
                },
                {
                    name: "Medium",
                    cost: 4
                }]
            },
            {
                itemName: "White Sauce Pasta",
                varient: false,
                cost: 4
            },
            {
                itemName: "Red Sauce Pasta",
                varient: false,
                cost: 4.99
            },
        ]
        
    },

]
const MenuPreview = ({navigation, route}) => {
    const refRBSheet = useRef();
    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1}}>
           <WebView source={{ uri:route.params.themeURL}} />
        </SafeAreaView>
    )
}

export default MenuPreview

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
    logo:{
        flexDirection: 'row',
        justifyContent:'center',
        marginTop: 20
    },
    nameContainer:{
        flexBasis: widthPercentageToDP(66),
        flexDirection:'column'
    },
    name:{
        flexWrap:'wrap',
        fontFamily: 'Poppins Medium',
        fontStyle: 'normal',
        fontSize: 21,
        color: '#FFFFFF',
        lineHeight:40
    },
    bell:{
        position:'absolute',
        top: heightPercentageToDP(5),
        left:widthPercentageToDP(3.5),
        transform: [{ rotate: '180deg'}]
    },
    info:{
        marginTop:heightPercentageToDP(14)-40,
        paddingHorizontal: 20,
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameContainer:{
        flexBasis: widthPercentageToDP(70),
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
    mainBody:{
        marginHorizontal: 28
    },
    menuName:{
        color:'#000',
        fontFamily: 'Poppins Medium',
        fontSize: 37
    },
    container:{
        backgroundColor: '#f0effa',
        paddingBottom: 0,
        position: 'absolute',
        width: '100%',
        bottom: 0
    },
    brushImage:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: -35,
        // marginBottom: 20
        
    },
    round:{
        borderRadius: 40,
        backgroundColor: '#f0effa',
        padding: 10,
        elevation: 5
    },
    brush:{
        height: 50,
        width: 50,
        resizeMode: 'contain'
    }
})

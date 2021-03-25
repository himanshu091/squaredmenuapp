import React, { useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import HeaderSVG from '../components/HeaderSVG'
import MenuButtons from '../components/MenuButtons'
import NewMenuButton from '../components/NewMenuButton'
import SubMenu from '../components/SubMenu'
import RBSheet from "react-native-raw-bottom-sheet";
import ThemeChooser from '../components/ThemeChooser'
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
const MenuPreview = ({navigation}) => {
    const refRBSheet = useRef();
    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1}}>
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
                            <Text style={styles.name}>Name of the restaurant</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.mainBody}>
                    <Text style={styles.menuName}>Breakfast</Text>
                    <SubMenu dish_name="Croissant"/>
                    <SubMenu dish_name="Pizza"/>
                </View>
            </ScrollView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.brushImage} onPress={()=>{refRBSheet.current.open()}}>
                    <View style={styles.round}><Image source={require('../assets/images/icons/brush.png')} style={styles.brush}/></View>
                </TouchableOpacity>
            </View>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                // minClosingHeight={1000}

                animationType='slide'
                customStyles={{
                wrapper: {
                    backgroundColor: "transparent"
                },
                draggableIcon: {
                    backgroundColor: "#fff"
                }
                }}
            >
                <ThemeChooser action={()=>{refRBSheet.current.close()}}/>
            </RBSheet>
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

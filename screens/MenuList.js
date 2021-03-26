import React, { useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import HeaderSVG from '../components/HeaderSVG'
import MenuSection from '../components/MenuSection'
import RBSheet from "react-native-raw-bottom-sheet";
import AddNewItem from '../components/AddNewItem'
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
const MenuList = ({navigation}) => {
    const refRBSheet = useRef();
    return (
        <SafeAreaView>
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
                            <Text style={styles.name}>Silema Restaurant</Text>
                            <Text style={styles.menuName}>Breakfast</Text>
                        </View>
                        <TouchableOpacity style={styles.previewBTN} onPress={()=>navigation.navigate('MenuPreview')}>
                            <Text style={styles.preview}>Preview</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    data && data.map((menu, idx) => {
                        return <MenuSection key={idx} sectionName={menu.sectionName} itemList={menu.itemList} addNew={() => refRBSheet.current.open()} navigation={navigation}/>
                    })
                }
               
                <TouchableOpacity style={styles.newSection}>
                    <Text style={styles.sectionName}>Add Section</Text>
                    <Image style={styles.plus} source={require('../assets/images/icons/plus.png')}/>
                </TouchableOpacity>
            </ScrollView>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                // height={80}
                animationType='slide'
                customStyles={{
                    container: {
                        ...styles.container,
                        height: 370
                      },
                wrapper: {
                    backgroundColor: "#00000025"
                },
                draggableIcon: {
                    backgroundColor: "#fff"
                }
                }}
            >
                <AddNewItem closeFunc={() => refRBSheet.current.close()}/>
            </RBSheet>
        </SafeAreaView>
    )
}

export default MenuList

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
    previewBTN:{
        backgroundColor: '#fff',
        paddingHorizontal: 18,
        paddingVertical: 7,
        borderRadius:23
    },
    preview:{
        fontFamily: 'Poppins Medium',
        fontSize: 16,
        color: '#635CC9'
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
    newSection:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 16,
        backgroundColor: '#fff',
        marginHorizontal: 25,
        borderRadius: 17,
        marginBottom: 50,
        elevation: 2
    },
    plus:{
        height: 13,
        width: 13,
    },
    sectionName:{
        fontFamily: 'Poppins Regular',
        color: '#635CC9',
        fontSize: 15
    }

})

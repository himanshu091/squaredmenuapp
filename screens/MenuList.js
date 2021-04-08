import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import HeaderSVG from '../components/HeaderSVG'
import MenuSection from '../components/MenuSection'
import RBSheet from "react-native-raw-bottom-sheet";
import AddNewItem from '../components/AddNewItem'
import { connect } from 'react-redux'
import { getMenuItems } from '../store/action'
import AddNewVarient from '../components/AddNewVarient'
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
const MenuList = ({navigation, user_id, token, getMenuItems, route}) => {
    const refRBSheet = useRef();
    const refRBSheet2 = useRef();
    const [data1, setdata] = useState(null)
    useEffect(async () => {
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        bodyFormData.append('menu_id', route.params.menu_id);
        const res = await getMenuItems(bodyFormData)
        setdata(res.data.data)
    }, [])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            var bodyFormData = new FormData();
            bodyFormData.append('user_id', user_id);
            bodyFormData.append('token', token);
            bodyFormData.append('menu_id', route.params.menu_id);
            const res = await getMenuItems(bodyFormData)
            setdata(res.data.data)
        });
    
        return unsubscribe;
    }, [navigation]);
    const refresh = async () => {
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        bodyFormData.append('menu_id', route.params.menu_id);
        const res = await getMenuItems(bodyFormData)
        setdata(res.data.data)
    }
    const close1andRefresh = () => {
        
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <HeaderSVG uri={data1 && data1.menu.cat_image}/>
                <View source={require('../assets/images/banners/mask.png')} style={styles.banner} resizeMode="stretch">
                    <TouchableOpacity 
                        style={styles.bell}
                        onPress={()=>navigation.goBack()}
                    >
                        <Image source={require('../assets/images/onboarding/next.png')}/>
                    </TouchableOpacity>
                    
                    <View style={styles.info}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.name}>{data1 && data1.menu.restorant_name}</Text>
                            <Text style={styles.menuName}>{data1 && data1.menu.cat_name}</Text>
                        </View>
                        <TouchableOpacity style={styles.previewBTN} onPress={()=>navigation.navigate('MenuPreview')}>
                            <Text style={styles.preview}>Preview</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    data1 && data1.items.map((menu, idx) => {
                        return <MenuSection key={idx} refresh={()=>refresh()} menuName={menu.name} variants={menu.variants} data={menu} successClose={()=>{close1andRefresh()}} addNew={() => refRBSheet2.current.open()} navigation={navigation}/>
                    })
                }
               
                <TouchableOpacity style={styles.newSection} onPress={() => refRBSheet.current.open()}>
                    <Text style={styles.sectionName}>Add New Item</Text>
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
                        height: 450
                      },
                wrapper: {
                    backgroundColor: "#00000025"
                },
                draggableIcon: {
                    backgroundColor: "#fff"
                }
                }}
            >
                <AddNewItem closeFunc={() => refRBSheet.current.close()} menu_id={route.params.menu_id} navigation={navigation}/>
            </RBSheet>
            <RBSheet
                ref={refRBSheet2}
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
                <AddNewVarient closeFunc={() => refRBSheet2.current.close()}/>
            </RBSheet>
        </SafeAreaView>
    )
}
const mapStateToProps = state => {
    return {
        user_id: state.auth.user_id,
        token: state.auth.token
    }
}
export default connect(mapStateToProps, {getMenuItems})(MenuList)

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
        lineHeight:40,
        textTransform: 'capitalize'
    },
    menuName:{
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

import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import TypeComponent from '../components/TypeComponent';
import {getItemTypes, addNewItem} from '../store/action';
import { Button } from 'react-native-elements'
import { Platform } from 'react-native';
import OptionComponent from '../components/OptionComponent';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from "react-native-raw-bottom-sheet";
import AddNewVarient from '../components/AddNewVarient';
import EditVarient from '../components/EditVarient';

const NewDish = ({navigation,route,getItemTypes, user_id, token, addNewItem}) => {
    const refRBSheet1 = useRef();
    const refRBSheet2 = useRef();
    const [isOn, setisOn] = useState(false)
    const [options, setOptions] = useState([])
    const [selectedOptions, setSelectedOptions] = useState([])
    const [types, setTypes] = useState([])
    const [selectedTypes, setselectedTypes] = useState([])
    const [clicked, setClicked] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [name, setName] = useState(route.params.name)
    const [price, setPrice] = useState(route.params.price)
    const [desc, setDesc] = useState('')
    const [variants, setVariants] = useState([])
    const [currentEditVarient, setcurrentEditVarient] = useState({})
    const [err, seterr] = useState("")
    var {has_variants,menu_id} = route.params

    useEffect(async () => {
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        const res = await getItemTypes(bodyFormData)
        if(res.data.status){
            setTypes(res.data.data.item_types)
            setOptions(res.data.data.extra_options)
        }
    }, [])
    const selectThisType = (id) => {
        const temp = [...selectedTypes]
        temp.push(id)
        setselectedTypes(temp)
    }
    const deselectThisType = (id) => {
        const temp = [...selectedTypes]
        temp.forEach((item,idx) => {
            if(item === id){
                temp.splice(idx,1)
                return
            }
        })
        setselectedTypes(temp)
    }
    const selectThisOption = (id) => {
        console.log("Selected Options",selectedOptions)
        const temp = [...selectedOptions]
        temp.push(id)
        setSelectedOptions(temp)
    }
    const deselectThisOption = (id) => {
        console.log("DeSelected Options",selectedOptions)
        const temp = [...selectedOptions]
        temp.forEach((item,idx) => {
            if(item === id){
                temp.splice(idx,1)
                return
            }
        })
        setSelectedOptions(temp)
    }
    const imagepick = () => {
        ImagePicker.openPicker({
          width: 375,
          height: 209,
          cropping: true,
          includeBase64: true
        }).then(image => {
            // console.log(image)
            setPhoto(image)
        }).catch(err=>{
            console.log(err);
        });
    }
    const addVariant = (name,price) => {
        const temp = [...variants]
        temp.push({
            name: name,
            price: price
        })
        setVariants(temp)
        console.log("Add Varient",temp)
    }
    const editVariant = (name,price, pos) => {
        const temp = [...variants]
        temp[pos] = {name:name, price:price}
        setVariants(temp)
    }
    const deleteVariant = (pos) => {
        var temp = variants
        temp.splice(pos,1)
        setVariants(temp)
    }
    const handleSubmit = async () => {
        if(name.trim().length < 1){
            seterr("Enter Valid Item Name")
            return
        }else if(desc.trim().length < 1){
            seterr("Enter Valid Description")
            return
        }else if(!photo){
            seterr("Enter Image of the Item")
            return
        }else if(has_variants === 1 && variants.length < 1){
            seterr("Enter atleast one varient.")
            return
        }else{
            seterr("")
        }
        //after checking validation
        setClicked(true)
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id); 
        bodyFormData.append('token', token); 
        bodyFormData.append('menu_id', menu_id); 
        bodyFormData.append('name', name); 
        bodyFormData.append('description', desc);
        bodyFormData.append('image', {
            name: name,
            type: photo.mime,
            uri: Platform.OS === 'android' ? photo.path : photo.path.replace('file://', ''),
        });
        bodyFormData.append('has_variants', has_variants); 
        bodyFormData.append('price', has_variants===0?price:""); 
        bodyFormData.append('variants', has_variants!==0?{"variants":variants}:"");
        bodyFormData.append('item_type_ids', selectedTypes.toString()); 
        bodyFormData.append('option_ids', selectedOptions.toString());
        bodyFormData.append('available', isOn?1:0); 
        console.log(bodyFormData)
        
        const res = await addNewItem(bodyFormData)
        setClicked(false)
        // if(res.data.status){
        //     Alert.alert(  
        //         'Success',  
        //         res.data.message,  
        //         [  
        //             {text: 'OK', onPress: () => navigation.goBack()},  
        //         ]  
        //     );
        // }else{
        //     if(Platform.OS === 'android'){
        //         ToastAndroid.showWithGravity(
        //         res.data.message,
        //         ToastAndroid.SHORT,
        //         ToastAndroid.BOTTOM
        //     )
        //     }else{
        //         AlertIOS.alert(res.data.message)
        //     }
        // }
    }
    return (
        <SafeAreaView style={styles.body}>
            <ScrollView>
            <TouchableOpacity onPress={imagepick}>
                <Image source={!photo?require('../assets/images/banners/imageUpload.png'):{uri:`data:${photo.mime};base64,${photo.data}`}} style={styles.imageupload}/>                  
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.bell}
                onPress={()=>navigation.goBack()}
            >
                <Image source={require('../assets/images/onboarding/next.png')}/>
            </TouchableOpacity>
            <View style={styles.part1}>
                <View style={styles.dishNameContainer}>
                    <TextInput
                        fontSize={30}
                        fontFamily={'Poppins Medium'}
                        onChangeText={setName}
                        value={name}
                        width={widthPercentageToDP(60)}
                        multiline={true}
                        placeholder="Item Name"
                        opacity={0.9}
                        placeholderTextColor="#00000090"
                    />
                </View>
                <TouchableOpacity style={styles.trademarks} onPress={()=>{setName('')}}>
                    <Image  style={styles.tm1} source={require('../assets/images/icons/delete.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.descBox}>
                <TextInput
                    style={styles.desc}
                    onChangeText={setDesc}
                    value={desc}
                    placeholder="Enter Description"
                    // textAlign="center"
                    placeholderTextColor="#00000050"
                    numberOfLines={4}
                    multiline={true}
                />
            </View>
            <View style={{marginTop: 20}}></View>
            {has_variants===1 && variants.map((item,idx) => {
                return <View key={idx} style={styles.varientBody}>
                            <Text style={styles.varientName}>{item.name}</Text>
                            <View style={styles.part2}>
                                <Text style={styles.varientCost}>${item.price}</Text>
                                <TouchableOpacity onPress={()=>{setcurrentEditVarient({name:item.name, price:item.price, pos:idx});refRBSheet2.current.open();}}><Image source={require('../assets/images/icons/edit.png')}/></TouchableOpacity>
                            </View>
                        </View>
            })}
            
            {has_variants===1 && <TouchableOpacity style={styles.newVarientBtn} onPress={()=>{refRBSheet1.current.open()}}>
                <Text style={styles.newVarient}>Add New Variant</Text>
                <Text style={styles.newVarient}>+</Text>
            </TouchableOpacity>}
            {has_variants===1 && <View style={styles.line}></View>}
            {types.map((item)=>{
                return <TypeComponent key={item.item_type_id} data={item} selectThisType={(id)=>selectThisType(id)} deselectThisType={(id)=>deselectThisType(id)}/>
            })}

            <View style={styles.optionContainer}>
                {options.map((item)=>{
                    return <OptionComponent key={item.option_id} option_id={item.option_id} name={item.name} selectThisOption={(id)=>selectThisOption(id)} deselectThisOption={(id)=>deselectThisOption(id)}/>
                })}
            </View>
            <View style={styles.line}></View>

            <View style={styles.hide}>
                <Text style={styles.compText}>Hide/deactivate</Text>
                <ToggleSwitch
                    isOn={isOn}
                    onColor="#635CC9"
                    offColor="#635CC920"
                    // label="Has Varients?"
                    labelStyle={{ color: "black", fontFamily: 'Poppins Medium'}}
                    size='large'
                    onToggle={() => setisOn(!isOn)}
                />
            </View>
            <View style={styles.line2}></View>
            {err.trim().length > 0 && <Text style={{textAlign: 'center', fontFamily: 'Poppins Medium', color: 'red'}}>{err}</Text>}
            <View style={styles.btnContainer}>
                <Button
                    onPress={handleSubmit}
                    title="Salva"
                    titleStyle={styles.btnText}
                    buttonStyle={styles.btn}
                    loading={clicked}
                />
            </View>
            <View style={{marginBottom: 50}}></View>
            </ScrollView>
            <RBSheet
                ref={refRBSheet1}
                closeOnDragDown={true}
                closeOnPressMask={false}
                // height={80}
                animationType='slide'
                customStyles={{
                    container: {
                        ...styles.container,
                        height: 360
                      },
                    wrapper: {
                        backgroundColor: "#00000025"
                    },
                    draggableIcon: {
                        backgroundColor: "#fff"
                    }
                }}
            >
                <AddNewVarient closeFunc={() => refRBSheet1.current.close()} addVariant={(name,price)=>addVariant(name, price)} />
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
                        height: 360
                      },
                    wrapper: {
                        backgroundColor: "#00000025"
                    },
                    draggableIcon: {
                        backgroundColor: "#fff"
                    }
                }}
            >
                <EditVarient 
                    closeFunc={() => refRBSheet2.current.close()} 
                    editVariant={(name,price, pos)=>editVariant(name, price, pos)} 
                    defaultname={currentEditVarient.name} 
                    defaultprice={currentEditVarient.price}
                    pos={currentEditVarient.pos}
                />
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
export default connect(mapStateToProps,{getItemTypes, addNewItem})(NewDish)

const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: '#fff',
    },
    dishImage:{
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(30),
    },
    bell:{
        position:'absolute',
        top: heightPercentageToDP(5),
        left:widthPercentageToDP(3.5),
        transform: [{ rotate: '180deg'}]
    },
    part1:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 15
    },
    trademarks:{
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 10
    },
    dishNameContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    dishName:{
        flexBasis: '70%',
        fontFamily: 'Poppins SemiBold',
        fontSize: widthPercentageToDP(100)/8,
        lineHeight: 60 * 0.75,
        paddingTop: 60 - 35 * 0.75,
    },
    tm1:{
        width: widthPercentageToDP(3.5),
        height: widthPercentageToDP(3.5),
    },
    tm2:{
        width: widthPercentageToDP(13),
        height: widthPercentageToDP(13),
    },
    descBox:{
        // paddingVertical: 13,
        borderColor:'#00000010',
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    desc:{
        fontSize: 17,
        fontFamily: 'Poppins Regular',
        paddingHorizontal: 15,
        color: '#989898'
    },
    varientBody:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 17
    },
    varientName:{
        fontSize: 18,
        fontFamily: 'Poppins Medium'
    },
    varientCost:{
        fontSize: 18,
        fontFamily: 'Poppins Medium'
    },
    part2:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    newVarientBtn:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#c4c4c430',
        paddingTop: 20,
        paddingBottom: 14,
        paddingHorizontal: 21,
        marginHorizontal: 22,
        borderRadius: 96,
    },
    newVarient:{
        fontFamily: 'Poppins Regular',
        fontSize: 15,
        color: '#635CC9'
    },
    line:{
        borderWidth: 1,
        borderColor: '#00000006',
        width:widthPercentageToDP(100),
        marginVertical: 26
    },
    line2:{
        borderWidth: 1,
        borderColor: '#00000006',
        width:widthPercentageToDP(100),
        marginVertical: 7
    },
    comp:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 23
    },
    compPart1:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    compText:{
        fontFamily: 'Poppins Regular',
        fontSize: 18
    },
    compImg:{
        height: 25,
        width: 25,
        marginRight: 5
    },
    hide:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    btnContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30
    },
    btn:{
        backgroundColor: '#635CC9',
        borderRadius: 65,
        // paddingHorizontal: widthPercentageToDP()
        width: widthPercentageToDP(90),
        paddingVertical: heightPercentageToDP(1.5)
    },
    btnText:{
        fontFamily: 'Poppins Medium',
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
    optionContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    imageupload:{
        width: widthPercentageToDP(100),
        height: widthPercentageToDP(100)*418/750,
    }
})

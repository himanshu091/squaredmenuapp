import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Switch, TouchableOpacity, Image, Alert } from 'react-native'
import ToggleSwitch from 'toggle-switch-react-native'
import ImagePicker from 'react-native-image-crop-picker';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { addNewItem } from '../store/action';

const AddNewItem = ({closeFunc, user_id, token, menu_id, addNewItem, successClose}) => {
    const [isOn, setisOn] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [clicked, setClicked] = useState(false)
    const [err, setErr] = useState("")
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
    const handleSubmit = async () => {
        if(name.trim().length < 1){
            setErr("Please enter Name")
            return
        }else if(price.trim().length < 1 && !isOn){
            setErr("Please enter Price")
            return
        }else if(!photo){
            setErr("Please Select an Image")
            return
        }
        setClicked(true)
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        bodyFormData.append('menu_id', menu_id);
        bodyFormData.append('name', name);
        bodyFormData.append('image', {
            name: name,
            type: photo.mime,
            uri: Platform.OS === 'android' ? photo.path : photo.path.replace('file://', ''),
        });
        bodyFormData.append('has_variants', !isOn?0:1);
        bodyFormData.append('price', price);
        const res = await addNewItem(bodyFormData)
        setClicked(false)
        if(res.data.status){
            Alert.alert(  
                'Success',  
                res.data.message,  
                [  
                    {text: 'OK', onPress: () => successClose()},  
                ]  
            );
        }else{
            ToastAndroid.showWithGravity(
                res.data.message,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            )
        }
    }
    return (
        <View style={styles.box}>
            <View>
                <Text style={styles.title}>Add Item</Text>
                <Text style={{textAlign:'center', color:'red', fontFamily: 'Poppins Bold'}}>{err}</Text>

                <View style={{flexDirection: 'row', justifyContent:'center'}}>
                    <TouchableOpacity onPress={imagepick}>
                        <Image source={!photo?require('../assets/images/icons/imageicon.png'):{uri:`data:${photo.mime};base64,${photo.data}`}} style={styles.imageupload}/>                  
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="Name"
                    textAlign="center"
                    placeholderTextColor="#635CC9"
                    
                />
                
                {!isOn && <TextInput
                    style={styles.input}
                    onChangeText={setPrice}
                    value={price}
                    placeholder="Price"
                    textAlign="center"
                    placeholderTextColor="#635CC9"
                    
                />}
                <View style={styles.switchBox}>
                    <ToggleSwitch
                        isOn={isOn}
                        onColor="#635CC9"
                        offColor="#635CC920"
                        label="Has Varients?"
                        labelStyle={{ color: "black", fontFamily: 'Poppins Medium'}}
                        size='medium'
                        onToggle={() => setisOn(!isOn)}
                    />
                </View>
            </View>
            <View style={styles.allBtn}>
                <TouchableOpacity style={styles.btn1} onPress={closeFunc}>
                    <Text style={styles.btnText1}>Cancel</Text>
                </TouchableOpacity>
                {!clicked && <TouchableOpacity style={styles.btn2} onPress={handleSubmit}>
                    <Image source={require('../assets/images/icons/tick.png')} />
                    <Text style={styles.btnText2}>Add</Text>
                </TouchableOpacity>}
                {clicked && <Button
                    title="Add"
                    titleStyle={{ fontSize: 15 }}
                    buttonStyle={styles.btn2}
                    containerStyle={{ marginTop: 10 }}
                    loading={true}
                />}
            </View>
        </View>
    )
}
const mapStateToProps = state => {
    return{
        user_id: state.auth.user_id,
        token: state.auth.token
    }
}
export default connect(mapStateToProps,{addNewItem})(AddNewItem)

const styles = StyleSheet.create({
    box:{
        height: '90%',
        padding: 27,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'

    },
    title:{
        fontFamily: 'Poppins Medium',
        textAlign: 'center',
        fontSize: 24
    },
    allBtn:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    btn1:{

    },
    btnText1:{
        color: '#635CC9',
        fontSize: 15,
        fontFamily: 'Poppins Medium'
    },
    btn2:{
        backgroundColor: '#635CC9',
        paddingVertical: 14,
        paddingLeft: 40,
        paddingRight: 50,
        borderRadius: 56,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnText2:{
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Poppins Medium',
        paddingLeft: 7
    },
    input: {
        height: 50,
        marginVertical:5,
        borderWidth: 1,
        borderRadius:25,
        fontSize:15,
        backgroundColor:"#726AE910",
        borderColor:"#726AE910",
        color: '#635CC9',
        fontFamily: 'Poppins Medium'
        
    
      },
      switchBox:{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 10
      },
      imageupload:{
          width: 70,
          height: 70,
          borderRadius: 70,
          resizeMode: 'cover'
      }
})

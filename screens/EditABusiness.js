import React, {useState, useEffect, useRef}from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,

} from 'react-native';
import { Button } from 'react-native-elements'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SocialMediaIcon from '../components/SocialMediaIcon';
import Bg1 from '../assets/images/banners/bg1.svg'
import ImagePicker from 'react-native-image-crop-picker';
import Geolocation from '@react-native-community/geolocation';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {addNewRestaurant, getCurrency} from '../store/action'
import { SafeAreaView } from 'react-native';
import LocationTest from '../components/LocationTest';
import RBSheet from "react-native-raw-bottom-sheet";
import ImageChoice from '../components/ImageChoice';
import {Picker} from '@react-native-picker/picker';

const EditABusiness = ({ navigation, user_id, token, addNewRestaurant, route , getCurrency}) => {
  const refRBSheet = useRef();
  const [step, setStep] = React.useState(1);
  const [name, onChangeName] = React.useState(route.params.data.name);
  const [address, onChangeAddress] = React.useState(route.params.data.address);
  const [restaurantId, setRestaurantId] = React.useState(route.params.data.restaurant_id);
  const [states, onChangeState] = React.useState("");
  const [city, onChangeCity] = React.useState("");
  const [table, onChangeTable] = React.useState(`${route.params.data.total_tables}`);
  const [photo, onChangephoto] = React.useState(null);
  const [defaultimage, setdefaultImage] = React.useState(route.params.data.cover);
  const [err, setErr] = React.useState("");
  const [lat, setlat] = React.useState(route.params.data.lat);
  const [long, setlong] = React.useState(route.params.data.lng);
  const [clicked, setclicked] = React.useState(false);
  const [curr, setcurr] = React.useState(route.params.data.currency);
  const [denominations, setDenominations] = React.useState([]);
  useEffect(() => {
    getListOfCurrency()
  }, [])
  const getListOfCurrency = async () => {
    var bodyFormData = new FormData();
    bodyFormData.append('user_id', user_id);
    bodyFormData.append('token', token);
    const res = await getCurrency(bodyFormData)
    setDenominations(res.data.data)
  }
  const imagepick = () => {
    ImagePicker.openPicker({
      width: 375,
      height: 225,
      cropping: true,
      includeBase64: true
    }).then(image => {
      // console.log(image)
      refRBSheet.current.close()
      onChangephoto(image)
    }).catch(err=>{
      console.log(err);
    });
  }
  const camerapick = () => {
    ImagePicker.openCamera({
      width: 375,
      height: 225,
      cropping: true,
      includeBase64: true
    }).then(image => {
      // console.log(image)
      refRBSheet.current.close()
      onChangephoto(image)
    }).catch(err=>{
      console.log(err);
    });
  }
  const showMap = () => {setStep(2)}
  const hideMap = () => {setStep(1)}
  const setLatLong = (lat, long, address) => {
    onChangeAddress(address)
    setlat(lat);
    setlong(long);
    console.log(lat, long)
    hideMap()
  }
  const handleSubmit = async () => {
    if(name.trim().length < 1){
      setErr("Enter Valid Name")
      return
    }else if(address.trim().length < 1){
      setErr("Enter Valid Address")
      return
    }else if(curr.trim().length < 1){
      setErr("Enter Valid Currency")
      return
    }
    setclicked(true)
    var bodyFormData = new FormData();
    bodyFormData.append('restaurant_id', restaurantId);
    bodyFormData.append('user_id', user_id);
    bodyFormData.append('name', name);
    bodyFormData.append('address', `${address}`);
    bodyFormData.append('lat', lat);
    bodyFormData.append('lng', long);
    bodyFormData.append('currency', curr);
    if(photo){
      bodyFormData.append('image', {
        name: name,
        type: photo.mime,
        uri: Platform.OS === 'android' ? photo.path : photo.path.replace('file://', ''),
      });
    }
    if(photo){
      bodyFormData.append('cover', {
        name: name,
        type: photo.mime,
        uri: Platform.OS === 'android' ? photo.path : photo.path.replace('file://', ''),
      });
    }
    
    if(table.trim().length > 0){
      bodyFormData.append('total_tables', table);
    }
    bodyFormData.append('token', token);
    const res = await addNewRestaurant(bodyFormData)
    if(res.data.status){
      navigation.goBack()
      // Alert.alert(  
      //   'Success',  
      //   res.data.message,  
      //   [  
      //       {text: 'OK', onPress: () => navigation.goBack()},  
      //   ]  
      // );
    }else{
      alert(res.data.message)
      setclicked(false)
    }
  }

  return (
    <SafeAreaView>
    {step === 1 && <ScrollView>
      <Bg1
        height={hp('40%')}
        width={wp('100%')}
        style={{
          position: 'absolute',

        }}
        resizeMode="stretch"
      />

      <View style={styles.topElements}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/images/topbar/back.png')}
            style={styles.button_image}
          />
        </TouchableOpacity>
        {/* <View style={styles.logoflat}>

          <Image
            source={require('../assets/images/logoinapp/logoflat.png')}
          />
        </View> */}
      </View>

      <View style={styles.heading}>
        <Text style={styles.headingText}>Edit Business</Text>
      </View>

      <View style={styles.inputFields}>

        <TouchableOpacity onPress={() => refRBSheet.current.open()} style={styles.imageContainer}>
          <Image
            source={!photo?(defaultimage?{uri: defaultimage}:require("../assets/images/icons/imageicon.png")):{uri:`data:${photo.mime};base64,${photo.data}`}}
            style={styles.imageIcon}
          />
        </TouchableOpacity>

        <Text style={{textAlign:'center', color:'red', fontFamily: 'Poppins Bold'}}>{err}</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder="Name"
          textAlign="center"
          placeholderTextColor="#635CC9"

        />
        <TouchableOpacity style={styles.locationContainer} onPress={showMap}>
        <Image
          source={require("../assets/images/icons/location.png")}
          style={{height: 20, width: 20}}
        />
        <Text style={styles.locationText}>Locate me</Text>
      </TouchableOpacity>
        <TextInput
          style={styles.input}
          onChangeText={onChangeAddress}
          value={address}
          placeholder="Address"
          textAlign="center"
          placeholderTextColor="#635CC9"
          multiline={true}
          numberOfLines={4}

        />
        {/* <TextInput
          style={styles.input}
          onChangeText={onChangeState}
          value={states}
          placeholder="State"
          textAlign="center"
          placeholderTextColor="#635CC9"

        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeCity}
          value={city}
          placeholder="City"
          textAlign="center"
          placeholderTextColor="#635CC9"

        /> */}
        <TextInput
          style={styles.input}
          onChangeText={value=>onChangeTable(value.replace(/[^0-9]/g, ''))}
          value={table}
          placeholder="Number of tables (optional)"
          textAlign="center"
          placeholderTextColor="#635CC9"
          keyboardType="number-pad"
        />
         <View style={styles.inputselect}>

          <Picker
            selectedValue={curr}
            dropdownIconColor="#000000"
            onValueChange={(itemValue, itemIndex) =>
              setcurr(itemValue)
          }>
            
            {denominations.map((denom, idx) => {
              return <Picker.Item key={idx} label={denom.full_name} value={denom.currency_code} color="#00000099" fontFamily="Poppins Light"/>
            })}
          </Picker>
            </View>
      </View>
      
      
      <Button
        onPress={() => { handleSubmit()}}
        title="Update"
        titleStyle={{ fontSize: 15 }}
        buttonStyle={styles.btn1}
        containerStyle={{ marginVertical: 15 }}
        loading={clicked}
      />

    </ScrollView>}
    {step === 2 && <LocationTest setLatLong={(lat, long, around)=>setLatLong(lat, long, around)} closeMap={()=>setStep(1)} />}
    <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            ...styles.container,
            height: 180,
            backgroundColor: '#f4f4f4'
          },
          wrapper: {
            backgroundColor: "#00000028"
          },
          draggableIcon: {
            backgroundColor: "#f4f4f4"
          }
        }}
      >
        <ImageChoice imagepick={()=>imagepick()} camerapick={()=>camerapick()}/>
    </RBSheet>
    </SafeAreaView>
  );
};
const mapStateToProps = state => {
  return{
    user_id: state.auth.user_id,
    token: state.auth.token
  }
}
export default connect(mapStateToProps,{addNewRestaurant, getCurrency})(EditABusiness);

const styles = StyleSheet.create({
  heading: {

    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginBottom: 40,
    marginLeft: 15,
  },
  headingText: {
    color: 'white',
    fontFamily: 'Poppins Medium',
    fontSize: 37,

    lineHeight: 50 * 0.75,
    paddingTop: 40 - 35 * 0.75,
  },
  button: {},
  topElements: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 40,
  },
  logoflat: {
    marginHorizontal: 55,
  },
  button_image: {
    height: 42,
    width: 42,
  },
  inputFields: {
    marginTop: hp('10%')
  },
  input: {
    // height: 50,
    marginVertical: 5,
    marginHorizontal: 40,
    borderWidth: 1,
    borderRadius: 25,
    fontSize: 15,
    backgroundColor: "#E7E6F3",
    fontFamily: "Poppins Regular",
    borderColor: "#E7E6F3",



  },
  inputselect: {
    height: 50,
    marginVertical: 5,
    marginHorizontal: 40,
    borderWidth: 1,
    borderRadius: 25,
    fontSize: 15,
    backgroundColor: "#E7E6F3",
    fontFamily: "Poppins Regular",
    borderColor: "#E7E6F3",
    paddingHorizontal: 20
  },
  btn1: {

    backgroundColor: "#635CC9",
    borderRadius: 50,
    marginHorizontal: 40,
    height: 50,
    shadowColor: "rgba(239, 54, 81, 0.35)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.50,
    shadowRadius: 5.84,

    elevation: 5,

  },
  bottomText: {
    color: "#635CC9",
    textAlign: 'center',
    marginVertical: 40,
    fontSize: 15,
    fontFamily: "Poppins Medium"
  },
  imageIcon: {
    height: 80,
    width: 80,
    borderRadius: 120,
    resizeMode: 'cover'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  locationText: {
    fontSize: 15,
    color: "#635CC9",
    fontFamily: "Poppins Regular",
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15
  },
  latlong:{
    textAlign:'center',
    fontFamily: 'Poppins Light',
    fontSize: 12
  }
});

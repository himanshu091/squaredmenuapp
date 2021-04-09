import React, {useState, useEffect}from 'react';
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
import {addNewRestaurant} from '../store/action'



const EditABusiness = ({ navigation, user_id, token, addNewRestaurant, route }) => {
  const [name, onChangeName] = React.useState(route.params.data.name);
  const [address, onChangeAddress] = React.useState(route.params.data.address);
  const [restaurantId, setRestaurantId] = React.useState(route.params.data.restaurant_id);
  const [states, onChangeState] = React.useState("");
  const [city, onChangeCity] = React.useState("");
  const [table, onChangeTable] = React.useState(`${route.params.data.total_tables}`);
  const [photo, onChangephoto] = React.useState(null);
  const [defaultimage, setdefaultImage] = React.useState(route.params.data.logo);
  const [err, setErr] = React.useState("");
  const [clicked, setclicked] = React.useState(false);

  const imagepick = () => {
    ImagePicker.openPicker({
      width: 375,
      height: 209,
      cropping: true,
      includeBase64: true
    }).then(image => {
      // console.log(image)
      onChangephoto(image)
    }).catch(err=>{
      console.log(err);
    });
  }
  const handleSubmit = async () => {
    if(name.trim().length < 1){
      setErr("Enter Valid Name")
      return
    }else if(address.trim().length < 1){
      setErr("Enter Valid Address")
      return
    }
    setclicked(true)
    var bodyFormData = new FormData();
    bodyFormData.append('restaurant_id', restaurantId);
    bodyFormData.append('user_id', user_id);
    bodyFormData.append('name', name);
    bodyFormData.append('address', `${address}`);
    bodyFormData.append('lat', 81);
    bodyFormData.append('lng', 85);
    if(photo){
      bodyFormData.append('image', {
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
      Alert.alert(  
        'Success',  
        res.data.message,  
        [  
            {text: 'OK', onPress: () => navigation.goBack()},  
        ]  
      );
    }else{
      alert(res.data.message)
      setclicked(false)
    }
  }

  return (
    <ScrollView>
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
        <View style={styles.logoflat}>

          <Image
            source={require('../assets/images/logoinapp/logoflat.png')}
          />
        </View>
      </View>

      <View style={styles.heading}>
        <Text style={styles.headingText}>Add Business</Text>
      </View>

      <View style={styles.inputFields}>

        <TouchableOpacity onPress={imagepick} style={styles.imageContainer}>
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
          onChangeText={onChangeTable}
          value={table}
          placeholder="Number of tables (optional)"
          textAlign="center"
          placeholderTextColor="#635CC9"
          keyboardType="number-pad"
        />

      </View>
      <TouchableOpacity style={styles.locationContainer} >
        <Image
          source={require("../assets/images/icons/location.png")}
        />
        <Text style={styles.locationText}>Locate me</Text>
      </TouchableOpacity>
      <Button
        onPress={() => { handleSubmit()}}
        title="Add"
        titleStyle={{ fontSize: 15 }}
        buttonStyle={styles.btn1}
        containerStyle={{ marginVertical: 15 }}
        loading={clicked}
      />

    </ScrollView>
  );
};
const mapStateToProps = state => {
  return{
    user_id: state.auth.user_id,
    token: state.auth.token
  }
}
export default connect(mapStateToProps,{addNewRestaurant})(EditABusiness);

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
  }
});

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TextInput,
  
} from 'react-native';
import {Button} from 'react-native-elements'
import Bg1 from '../assets/images/banners/bg1.svg'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SocialMediaIcon from '../components/SocialMediaIcon';
import { register } from '../store/action';
import { connect } from 'react-redux';
import { ToastAndroid } from 'react-native';

const RegistrationScreen = ({navigation, register}) => {
    const [name, onChangeName] = React.useState("");
    const [number, onChangeNumber] = React.useState("");
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [error, setError] = React.useState("");
    
    const beginRegitration = async () => {
      if(name.trim().length < 1){
        setError("Enter Name")
        return
      }else if(email.trim().length < 1){
        setError("Enter Email")
        return
      }else if(password.trim().length < 1){
        setError("Enter Password")
        return
      }else if(number.trim().length < 1){
        setError("Enter Contact Number")
        return
      }
      var bodyFormData = new FormData();
      bodyFormData.append('name', name);
      bodyFormData.append('phone', number);
      bodyFormData.append('email', email);
      bodyFormData.append('password', password);

      const res = await register(bodyFormData)
      // navigation.navigate('ThankYouRegistration')
      if(res.data.status){
        ToastAndroid.showWithGravity(
          res.data.message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        )
        navigation.navigate('ThankYouRegistration')
      }else{
          ToastAndroid.showWithGravity(
            res.data.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          )
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
          <TouchableOpacity style={styles.button} onPress={()=>navigation.goBack()}>
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
          <Text style={styles.headingText}>Welcome to Squared Menu</Text>
        </View>
    
    <View style={styles.inputFields}>
      <Text style={{textAlign:'center', color:'red', fontFamily: 'Poppins Bold'}}>{error}</Text>
    <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder="name"
        textAlign="center"
        placeholderTextColor="#635CC9"
        
      />
    <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="email"
        textAlign="center"
        placeholderTextColor="#635CC9"
        autoCapitalize="none"
      />
       <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="contact number"
        textAlign="center"
        placeholderTextColor="#635CC9"
        keyboardType="phone-pad"
      />
       <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="password"
        textAlign="center"
        placeholderTextColor="#635CC9"
        secureTextEntry
      />
     <Button
  
          title="Register"
          titleStyle={{ fontSize: 15 }}
          buttonStyle={styles.btn1}
          containerStyle={{marginTop:10}} 
          onPress={()=>beginRegitration()}
         
        />
        
        <Text style={styles.forgotText}>or register using</Text>
      <SocialMediaIcon/>
      <Text onPress={()=>navigation.navigate('RegisterPromoCode')} style={styles.bottomText}>Register using promo code</Text>
      <Text style={styles.registerText}>Policy and T&C</Text>
        
    </View>

    </ScrollView>
  );
};

export default connect(null, {register})(RegistrationScreen);

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
    fontSize: 30,
    width: wp('60%'),
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
  inputFields:{
marginVertical:12,
marginTop:hp('6%')
  },
  input: {
    height: 50,
    marginVertical:5,
    marginHorizontal:40,
    borderWidth: 1,
    borderRadius:25,
    fontSize:15,
    backgroundColor:"#E7E6F3",
    borderColor:"#E7E6F3",
   
    

  },
  forgotText:{
      fontSize:15,
      color:"#757575",
      fontFamily:"Poppins Regular",
      textAlign:'center',
      marginVertical:20
  },
  btn1:{
            
    backgroundColor: "#635CC9",
    borderRadius: 50,
    marginHorizontal:40,
    height:50,
    shadowColor: "rgba(239, 54, 81, 0.35)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.50,
    shadowRadius: 5.84,

    elevation: 5,
    
  },
  bottomText:{
    color:"#635CC9",
    textAlign:'center',
    marginVertical:40,
    fontSize:15,
    fontFamily:"Poppins Medium"
  },
  registerText:{
    fontSize:15,
    color:"#757575",
    fontFamily:"Poppins Regular",
    textAlign:'center',
    marginVertical:10 
  }
});

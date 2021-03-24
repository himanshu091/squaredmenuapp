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
import {Button} from 'react-native-elements';
import Bg3 from '../assets/images/banners/bg3.svg';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SocialMediaIcon from '../components/SocialMediaIcon';

const ThankYouRegistration = ({navigation}) => {
  const [name, onChangeName] = React.useState(null);
  const [number, onChangeNumber] = React.useState(null);
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  return (
    <ScrollView>
      <Bg3
        height={hp('100%')}
        width={wp('100%')}
        style={{
          position: 'absolute',
        }}
        resizeMode="stretch"
      />

      <View style={styles.logoflat}>
          <Image source={require('../assets/images/icons/thankyou.png')} />
        </View>

      <View style={styles.heading}>
        <Text style={styles.headingText}>Thank You </Text>
        <Text style={styles.contentHeadingText}>
        You have successfully registered with SquaredMenu
        </Text>
        <Text style={styles.successMessage}>
        Verify your account with a link sent to your registered email address.
        </Text>

      </View>
     

      <View style={styles.inputFields}>
        <Button
          title="Login Now"
          titleStyle={{fontSize: 15}}
          buttonStyle={styles.btn1}
          containerStyle={{marginTop: 10}}
          onPress={() => navigation.navigate('Login')}

        />

        <View style={styles.bottomView}>
          <Text
            onPress={() => navigation.navigate('RegisterPromoCode')}
            style={styles.bottomText}>
           Resend Verification Link
          </Text>
        
        </View>
      </View>
    </ScrollView>
  );
};

export default ThankYouRegistration;

const styles = StyleSheet.create({
  heading: {
  
    marginBottom: 40,
    

  },
  headingText: {
    color: 'white',
    fontFamily: 'Poppins SemiBold',
    fontSize: 37,
    width: wp('100%'),
    lineHeight: 50 * 0.75,
    paddingTop: 40 - 35 * 0.75,
    textAlign:'center'
  },

  topElements: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 40,
  },
  logoflat: {
    alignItems:"center",
    marginTop:80,
    marginBottom:20
  },
  button_image: {
    height: 42,
    width: 42,
  },
 

  forgotText: {
    fontSize: 15,
    color: '#757575',
    fontFamily: 'Poppins Regular',
    textAlign: 'center',
    marginVertical: 20,
  },
  btn1: {
    backgroundColor: '#635CC9',
    borderRadius: 50,
    marginHorizontal: 40,
    marginTop: hp('20%'),
    height: 60,
    shadowColor: '#726AE9',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 5.84,

    elevation: 5,
  },
  bottomText: {
    color: '#635CC9',

    fontSize: 15,
    fontFamily: 'Poppins Medium',
  },
  registerText: {
    fontSize: 15,
    color: '#757575',
    fontFamily: 'Poppins Regular',
    textAlign: 'center',
    marginVertical: 10,
  },
  skipText: {
    color: '#817BD4',
    fontSize: 15,
    fontFamily: 'Poppins Medium',
  },
  bottomView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  content:{
marginHorizontal:15,
display:'flex',
alignItems:'center',
marginTop:10
  },
  contentText:{
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins Medium',
    marginHorizontal:5
  },
  imageTextView:{
    display:'flex',
    flexDirection:'row',
    marginVertical:5,
    
  },
  contentHeadingText:{
    color: '#C6C4EB',
    fontSize: 18,
    fontFamily: 'Poppins Medium',
    textAlign:'center',
    marginHorizontal:30,
    marginVertical:10
  },
  successMessage:{
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins Regular',
    textAlign:'center',
    marginHorizontal:30,
  marginTop:60
  }
});

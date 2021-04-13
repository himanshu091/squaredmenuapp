import React, { useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  AlertIOS,

} from 'react-native';
import { Button } from 'react-native-elements'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SocialMediaIcon from '../components/SocialMediaIcon';
import Bg1 from '../assets/images/banners/bg1.svg'
import { login, signInAPIGoogle } from '../store/action';
import { connect } from 'react-redux';
import { getBaseOs,getModel,getDeviceName } from 'react-native-device-info';
import { Platform } from 'react-native';
// import { GoogleSignin } from '@react-native-community/google-signin';
import Google from '../assets/images/icons/googleicon.svg'
import Facebook from '../assets/images/icons/facebookicon.svg'
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';


// GoogleSignin.configure({
//   webClientId:"376994443715-40773pi7plbeft2e7ovbe815661gZoqp.apps.googleusercontent.com",
//   offlineAccess: true
// })
const Login = ({ navigation,login, signInAPIGoogle }) => {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [clicked, setclicked] = React.useState(false);
  
  const [userGoogleInfo, setUserGoogleInfo] = React.useState({});
  const [loaded, setLoaded] = React.useState(false);
  const [userFacebookInfo, setUserFacebookInfo] = React.useState({});

  const signinWithGoogle = async () => {
    // try{
    //   await GoogleSignin.hasPlayServices()
    //   const userInfo = await GoogleSignin.signIn()
    //   setUserGoogleInfo(userInfo)
    //   console.log("Google Success =>",userInfo)

    //   //Begin Signin to API
    //   let device_os = Platform.OS;
    //   let device_model = await getModel();
    //   let device_name = await getDeviceName();
    //   var bodyFormData = new FormData();
    //   bodyFormData.append('sm_id', 'TEST8676');
    //   bodyFormData.append('platform', 'google');
    //   bodyFormData.append('name', userInfo.user.name);
    //   bodyFormData.append('email', userInfo.user.email);
    //   bodyFormData.append('firebase_token', 'sdkf8768dFWERdsfsdf8sd98f7dg23444');
    //   bodyFormData.append('device_name', device_name);
    //   bodyFormData.append('device_modal', device_model);
    //   bodyFormData.append('device_os', device_os);
    //   const res = await signInAPIGoogle(bodyFormData)
    // }catch(err){
    //   console.log("Error Google Signin =>", err)
    // }
  }
  const getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name, email',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, user) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          setUserFacebookInfo(user);
          console.log('result:', user);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const loginWithFacebook = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile','email']).then(
      login => {
        if (login.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          });
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      },
    );
  };
  const startLogin = async () => {
    if(email.trim().length < 1){
      setError("Enter Email")
      return
    }else if(password.trim().length < 1){
      setError("Enter Password")
      return
    }
    setclicked(true)
    let device_os = Platform.OS;
    let device_model = await getModel();
    let device_name = await getDeviceName();
    var bodyFormData = new FormData();
    bodyFormData.append('email', email);
    bodyFormData.append('password', password);
    bodyFormData.append('firebase_token', 'sdkf8768dFWERdsfsdf8sd98f7dg23444');
    bodyFormData.append('device_name', device_name);
    bodyFormData.append('device_modal', device_model);
    bodyFormData.append('device_os', device_os);
    const res = await login(bodyFormData)
    setclicked(false)
    if(res.data.status){
      if(Platform.OS === 'android'){
        ToastAndroid.showWithGravity(
        res.data.message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      )
      }else{
        AlertIOS.alert(res.data.message)
      }
    }else{
      if(Platform.OS === 'android'){
        ToastAndroid.showWithGravity(
        res.data.message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      )
      }else{
        AlertIOS.alert(res.data.message)
      }
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
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegistrationScreen')}>
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
        <Text style={styles.headingText}>Welcome Back</Text>
      </View>

      <View style={styles.inputFields}>
        <Text style={{textAlign:'center', color:'red', fontFamily: 'Poppins Bold'}}>{error}</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Email Address"
          textAlign="center"
          placeholderTextColor="#635CC9"
          autoCapitalize="none"

        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
          textAlign="center"
          placeholderTextColor="#635CC9"
          secureTextEntry

        />
        <Button
          onPress={startLogin}
          title="Login"
          titleStyle={{ fontSize: 15 }}
          buttonStyle={styles.btn1}
          containerStyle={{ marginTop: 10 }}
          loading={clicked}
        />
        <Text style={styles.forgotText} onPress={() => navigation.navigate('ForgotPassword')}>Forgot password?</Text>
        <Text style={styles.forgotText}>or login using</Text>
        
        <View style={styles.socialMedia}>
          <TouchableOpacity onPress={loginWithFacebook}>
            <Image
                style={styles.icon}
              source={require('../assets/images/icons/facebook.png')}
              />
          </TouchableOpacity>
          <TouchableOpacity onPress={signinWithGoogle}>
            <Image
             style={styles.icon}

            source={require('../assets/images/icons/google.png')}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.bottomText} onPress={() => navigation.navigate('RegistrationScreen')} >I don't have an account</Text>

      </View>

    </ScrollView>
  );
};

export default connect(null, {login, signInAPIGoogle})(Login);

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
    fontSize: wp('10'),

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
    marginVertical: 15,
    marginTop: 90
  },
  input: {
    height: 50,
    marginVertical: 5,
    marginHorizontal: 40,
    borderWidth: 1,
    borderRadius: 25,
    fontSize: 15,
    backgroundColor: "#E7E6F3",
    borderColor: "#E7E6F3",



  },
  forgotText: {
    fontSize: 15,
    color: "#757575",
    fontFamily: "Poppins Regular",
    textAlign: 'center',
    marginTop: 20
    
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
    marginVertical: 20,
    fontSize: 15,
    fontFamily: "Poppins Medium"
  },
  socialMedia:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop:10

},
icon:{
    marginHorizontal:10,
    height:46,
    width:46
}
});

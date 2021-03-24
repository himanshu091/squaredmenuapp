import React, { useContext } from 'react';
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SocialMediaIcon from '../components/SocialMediaIcon';
import Bg1 from '../assets/images/banners/bg1.svg'
import {Context as AuthContext} from '../context/AuthContext';
const Login = ({navigation}) => {
    const [email, onChangeEmail] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);
    const {state, signin} = useContext(AuthContext);
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
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('RegistrationScreen')}>
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
    <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="email / contact number"
        textAlign="center"
        placeholderTextColor="#635CC9"
        
      />
       <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="password"
        textAlign="center"
        placeholderTextColor="#635CC9"
        
      />
     <Button
          onPress={signin}
          title="Login"
          titleStyle={{ fontSize: 15 }}
          buttonStyle={styles.btn1}
          containerStyle={{marginTop:10}} 
         
        />
        <Text style={styles.forgotText}>Forgot password?</Text>
        <Text style={styles.forgotText}>or login using</Text>
      <SocialMediaIcon/>
      <Text style={styles.bottomText}>I don't have an account</Text>
        
    </View>

    </ScrollView>
  );
};

export default Login;

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
    width: wp('50%'),
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
marginVertical:15,
marginTop:hp('8%')
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
  }
});

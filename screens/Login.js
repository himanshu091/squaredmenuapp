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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Login = () => {
    const [email, onChangeEmail] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);
  return (
    <ScrollView>
      <ImageBackground
        source={require('../assets/images/topbar/bg1.png')}
        style={{width: '100%', height: hp('30%')}}
        resizeMode="stretch">
        <View style={styles.topElements}>
          <TouchableOpacity style={styles.button}>
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
      </ImageBackground>
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
          
         
         
          title="Login"
          titleStyle={{ fontSize: 15 }}
          buttonStyle={{
            
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
            
          }}
          containerStyle={{marginTop:10}}
          
         
        />
        <Text style={styles.forgotText}>Forgot password?</Text>
        <Text style={styles.forgotText}>or login</Text>
        
    </View>

    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  heading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
marginVertical:15
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
  }
});

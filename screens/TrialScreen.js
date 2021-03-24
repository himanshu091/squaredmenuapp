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
import Bg2 from '../assets/images/banners/bg2.svg';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SocialMediaIcon from '../components/SocialMediaIcon';

const TrialScreen = ({navigation}) => {
  const [name, onChangeName] = React.useState(null);
  const [number, onChangeNumber] = React.useState(null);
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  return (
    <ScrollView>
      <Bg2
        height={hp('100%')}
        width={wp('100%')}
        style={{
          position: 'absolute',
        }}
        resizeMode="stretch"
      />

      <View style={styles.topElements}>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require('../assets/images/topbar/back.png')}
            style={styles.button_image}
          />
        </TouchableOpacity>
      
        <TouchableOpacity>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logoflat}>
          <Image source={require('../assets/images/logoinapp/logoflat.png')} />
        </View>

      <View style={styles.heading}>
        <Text style={styles.headingText}>Welcome to Squared Menu</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentHeadingText}>
          Get the full potential of SquaredMenu.
        </Text>
        <View style={styles.imageTextView}>
          <Image source={require('../assets/images/icons/camera.png')} />
          <Text style={styles.contentText}>
            10+ Customized Menu Templates 
          </Text>
        </View>
        <View style={styles.imageTextView}>
          <Image source={require('../assets/images/icons/pen.png')} />
          <Text style={styles.contentText}>
          Custom Images & Thumbnails for your
            Menu Items
          </Text>
        </View>
        <View style={styles.imageTextView}>
          <Image source={require('../assets/images/icons/nuts.png')} />
          <Text style={styles.contentText}>
          Unlimited Future Upgrades for FREE!
          </Text>
        </View>
      </View>

      <View style={styles.inputFields}>
        <Button
          title="Try it for Free for 7 Days"
          titleStyle={{fontSize: 15}}
          buttonStyle={styles.btn1}
          containerStyle={{marginTop: 10}}
          onPress={()=>navigation.navigate('ThankYouPurchase')}
        />

        <View style={styles.bottomView}>
          <Text
            onPress={() => navigation.navigate('RegisterPromoCode')}
            style={styles.bottomText}>
            Policy and T&C
          </Text>
          <Text
            onPress={() => navigation.navigate('RegisterPromoCode')}
            style={styles.bottomText}>
            $4.99/month after*
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default TrialScreen;

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
    marginBottom:60
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
marginHorizontal:15
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
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins Medium',
  }
});

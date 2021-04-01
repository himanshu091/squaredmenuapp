import React, {useContext} from 'react';
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import SocialMediaIcon from '../components/SocialMediaIcon';
import Bg1 from '../assets/images/banners/bg1.svg';
import {Context as AuthContext} from '../context/AuthContext';
const UserProfile = ({navigation}) => {
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
        <TouchableOpacity
          style={styles.button}
          onPress={()=>navigation.goBack()}>
          <Image
            source={require('../assets/images/topbar/back.png')}
            style={styles.button_image}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EditProfile')}>
          <Image
            source={require('../assets/images/icons/edit2.png')}
            style={styles.button_image}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.imageView}>
        <Image source={require('../assets/images/profile/profile.png')} />
      </View>

      <View style={styles.inputFields}>
      
          <Text style={styles.nameText}>Federico Di Gesù</Text>
          <Text style={styles.smallText}>federico.digesu@gmail.com</Text>
          <Text  style={styles.smallText}>**********</Text>
          <View style={styles.featuresView}>
          <Text  style={styles.smallHeadingText}>Go Pro!</Text>
          <Text  style={styles.smallSubHeadingText}>Starting from $9.99/Month</Text>
        </View>
        <View style={styles.featuresView}>
            <View style ={styles.membershipView}>
            <View>
          <Text  style={styles.smallHeadingText}>Membership</Text>
          <Text  style={styles.smallSubHeadingText}>Premium $39.99/Month</Text>
          </View>
          <View style={styles.renewView} >
          <Text  style={styles.renewText}>Renew Date</Text>
          <Text  style={styles.renewDateText}>10th March,2021</Text>
          </View>
          </View>
        </View>
        <View style={styles.featuresView}>
            <View style={styles.share}>
            <View>
          <Text  style={styles.smallHeadingText}>Share the love 💜</Text>
          <Text  style={styles.smallShareText}>Share this code and get 1 month free premium features</Text>
          <Text  style={styles.smallBottomText}>https://nameOfApp.ly/fede007</Text>
          </View>
          <TouchableOpacity>
          <Image source={require('../assets/images/icons/share.png')} />
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserProfile;

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
    justifyContent: 'space-between',
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
    marginHorizontal:15,
    marginTop: hp('2%'),
  },
  input: {
    height: 50,
    marginVertical: 5,
    marginHorizontal: 40,
    borderWidth: 1,
    borderRadius: 25,
    fontSize: 15,
    backgroundColor: '#E7E6F3',
    borderColor: '#E7E6F3',
  },
  forgotText: {
    fontSize: 15,
    color: '#757575',
    fontFamily: 'Poppins Regular',
    textAlign: 'center',
    marginVertical: 20,
  },

  bottomText: {
    color: '#635CC9',
    textAlign: 'center',
    marginVertical: 40,
    fontSize: 15,
    fontFamily: 'Poppins Medium',
  },
  imageView: {
    alignItems: 'center',
    marginTop: heightPercentageToDP(10),
  },
  nameText: {
    fontSize: 48,
    color: '#000000',
    fontFamily: 'Poppins Medium',
    lineHeight: 60 * 0.75,
    paddingTop: 40 - 35 * 0.75,
  },
  smallText:{
    fontSize: 15,
    color: '#000000',
    fontFamily: 'Poppins Regular', 
    marginVertical:10
  },
  smallHeadingText:{
    fontSize: 15,
    color: '#000000',
    fontFamily: 'Poppins Bold',
  },
  smallSubHeadingText:{
    fontSize: 15,
    color: '#B3B3B3',
    fontFamily: 'Poppins Regular', 
  },
  featuresView:{
      marginVertical:10
  },
  membershipView:{
    flexDirection:'row',
    alignItems:'center',
      justifyContent:'space-between'
  },
  renewView:{
      backgroundColor:"#e4e4e4",
      padding:10,
      
      
  },
  renewText:{
      textAlign:'right',
      fontFamily: 'Poppins Medium', 
      fontSize: 11,
    color: '#000000',
    opacity:.5
  },
  renewDateText:{
    textAlign:'right',
    fontFamily: 'Poppins Bold', 

    fontSize: 11,
  color: '#000000',
  opacity:.5
  },
  share:{
      flexDirection:'row',
      justifyContent:'space-between'

  },
  smallShareText:{
    fontSize: 15,
    color: '#B3B3B3',
    fontFamily: 'Poppins Regular',
    flexWrap:'wrap',
    width:wp(70)
  },
  smallBottomText:{
    fontSize: 15,
    color: '#B3B3B3',
    fontFamily: 'Poppins Regular',
    marginVertical:20
  }
  
});

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
import { Button } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import SocialMediaIcon from '../components/SocialMediaIcon';
import Bg1 from '../assets/images/banners/backgroundimage.svg';
import { connect } from 'react-redux';
import { changePassword, updateProfilePic } from '../store/action';
import { ToastAndroid } from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import { Alert } from 'react-native';


const EditProfile = ({ navigation, changePassword, name, user_id, token, updateProfilePic }) => {
  const [old, onChangeOld] = React.useState("");
  const [confirm, onChangeConfirm] = React.useState("")
  const [newpassword, onChangeNewPassword] = React.useState("");
  const [photo, setPhoto] = React.useState(null);

  const handleSubmit = async () => {
    var bodyFormData = new FormData();
    bodyFormData.append('current_pass', old);
    bodyFormData.append('new_pass', newpassword);
    bodyFormData.append('user_id', user_id);
    const res = await changePassword(bodyFormData)

    ToastAndroid.showWithGravity(
      res.data.message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    )
  }
  const imagepick = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
      includeBase64: true
    }).then(async image => {
        // console.log(image)
        setPhoto(image)
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        bodyFormData.append('name', name);
        bodyFormData.append('image', {
          name: name,
          type: image.mime,
          uri: Platform.OS === 'android' ? image.path : image.path.replace('file://', ''),
        });
        const res = await updateProfilePic(bodyFormData)
        
          Alert.alert(  
            'Success',  
            res.data.message,  
            [  
                {text: 'OK', onPress: () => navigation.navigate('UserProfile')},  
            ]  
        );
    }).catch(err=>{
        console.log(err);
    });
  }
  return (
    <ScrollView>
      <View>
        <ImageBackground source={require('../assets/images/banners/lands.png')} style={{ width: wp(100), height:wp(100)*224/375 }}>
          <View style={styles.topElements}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/images/topbar/back.png')}
                style={styles.button_image}
              />
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('RegistrationScreen')}>
              <Image
                source={require('../assets/images/icons/edit2.png')}
                style={styles.button_image}
              />
            </TouchableOpacity> */}
          </View>
        </ImageBackground>
      </View>




      <View style={styles.inputFields}>

        <Text style={styles.nameText}>{name}</Text>
        <TextInput
          fontSize={15}
          fontFamily={"Poppins Regular"}
          onChangeText={onChangeOld}
          value={old}
          placeholder="Old Password"
          opacity={0.3}
          placeholderTextColor="#000000"
          secureTextEntry
        />
        <TextInput
          fontSize={15}
          fontFamily={"Poppins Regular"}
          onChangeText={onChangeNewPassword}
          value={newpassword}
          placeholder="New Password"
          opacity={0.3}
          placeholderTextColor="#000000"
          secureTextEntry
        />
        <TextInput
          fontSize={15}
          fontFamily={"Poppins Regular"}
          onChangeText={onChangeConfirm}
          value={confirm}
          placeholder="Confirm New Password"
          opacity={0.3}
          placeholderTextColor="#000000"
          secureTextEntry
        />

        <Button
          onPress={handleSubmit}
          title="Salva"
          titleStyle={{ fontSize: 15 }}
          buttonStyle={styles.btn1}
          containerStyle={{ marginTop: 80 }}

        />
      </View>
    </ScrollView>
  );
};
const mapSatateToProps = state => {
  return {
    name: state.auth.name,
    user_id: state.auth.user_id,
    token: state.auth.token
  }
}
export default connect(mapSatateToProps, { changePassword, updateProfilePic })(EditProfile);

const styles = StyleSheet.create({
  heading: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginBottom: 40,
    marginLeft: 15,
  },
  btn1: {

    backgroundColor: "#635CC9",
    borderRadius: 50,
    marginHorizontal: 15,
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
    marginHorizontal: 15,
    marginTop: 50,
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
    textTransform: 'capitalize'
  },
  smallText: {
    fontSize: 15,
    color: '#000000',
    fontFamily: 'Poppins Regular',
    marginVertical: 10
  },
  smallHeadingText: {
    fontSize: 15,
    color: '#000000',
    fontFamily: 'Poppins Bold',
  },
  smallSubHeadingText: {
    fontSize: 15,
    color: '#B3B3B3',
    fontFamily: 'Poppins Regular',
  },
  featuresView: {
    marginVertical: 10
  },
  membershipView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  renewView: {
    backgroundColor: "#e4e4e4",
    padding: 10,


  },
  renewText: {
    textAlign: 'right',
    fontFamily: 'Poppins Medium',
    fontSize: 11,
    color: '#000000',
    opacity: .5
  },
  renewDateText: {
    textAlign: 'right',
    fontFamily: 'Poppins Bold',

    fontSize: 11,
    color: '#000000',
    opacity: .5
  },
  share: {
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  smallShareText: {
    fontSize: 15,
    color: '#B3B3B3',
    fontFamily: 'Poppins Regular',
    flexWrap: 'wrap',
    width: wp(70)
  },
  smallBottomText: {
    fontSize: 15,
    color: '#B3B3B3',
    fontFamily: 'Poppins Regular',
    marginVertical: 20
  }

});

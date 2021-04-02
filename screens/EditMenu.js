import React, {useContext, useState} from 'react';
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
import ToggleSwitch from 'toggle-switch-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import SocialMediaIcon from '../components/SocialMediaIcon';
import Bg1 from '../assets/images/banners/backgroundimage.svg';
const EditMenu = ({navigation}) => {
  const [menu, onChangeMenu] = React.useState(null);
  const [note, onChangeNote] = React.useState(null);
  const [isOn, setisOn] = useState(false);

  return (
    <ScrollView>
      <TouchableOpacity>
        <Bg1
          height={hp(30)}
          width={wp('100%')}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
          marginTop={-4}
          resizeMode="cover"
        />
      </TouchableOpacity>

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

      <View style={styles.inputFields}>
        <View style={styles.editMenu}>
          <TextInput
            fontSize={48}
            fontFamily={'Poppins Medium'}
            onChangeText={onChangeMenu}
            value={menu}
            width={wp(60)}
            multiline={true}
            placeholder="Silema Menu"
            opacity={0.3}
            placeholderTextColor="#000000"
          />
          <Image source={require('../assets/images/icons/delete.png')} />
        </View>
        <TextInput
          fontSize={15}
          fontFamily={'Poppins Regular'}
          onChangeText={onChangeNote}
          value={note}
          placeholder="Notes"
          opacity={0.3}
          placeholderTextColor="#000000"
        />
        <View style={styles.bottomSection}>
          <View style={styles.switch}>
            <Text style={styles.activeText}>Active</Text>
            <ToggleSwitch
              isOn={isOn}
              onColor="#635CC9"
              offColor="#635CC920"
              labelStyle={{color: 'black', fontFamily: 'Poppins Medium'}}
              size="medium"
              onToggle={() => setisOn(!isOn)}
            />
          </View>
          <Button
            onPress={() => navigation.goBack()}
            title="Salva"
            titleStyle={{fontSize: 15}}
            buttonStyle={styles.btn1}
            containerStyle={{marginTop: 20}}

          />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditMenu;

const styles = StyleSheet.create({
  heading: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginBottom: 40,
    marginLeft: 15,
  },
  btn1: {
    backgroundColor: '#635CC9',
    borderRadius: 50,
    marginHorizontal: 15,
    height: 50,
    shadowColor: 'rgba(239, 54, 81, 0.35)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
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
    marginTop: hp('15%'),
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
  smallText: {
    fontSize: 15,
    color: '#000000',
    fontFamily: 'Poppins Regular',
    marginVertical: 10,
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
    marginVertical: 10,
  },
  membershipView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  renewView: {
    backgroundColor: '#e4e4e4',
    padding: 10,
  },
  renewText: {
    textAlign: 'right',
    fontFamily: 'Poppins Medium',
    fontSize: 11,
    color: '#000000',
    opacity: 0.5,
  },
  renewDateText: {
    textAlign: 'right',
    fontFamily: 'Poppins Bold',

    fontSize: 11,
    color: '#000000',
    opacity: 0.5,
  },
  share: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallShareText: {
    fontSize: 15,
    color: '#B3B3B3',
    fontFamily: 'Poppins Regular',
    flexWrap: 'wrap',
    width: wp(70),
  },
  smallBottomText: {
    fontSize: 15,
    color: '#B3B3B3',
    fontFamily: 'Poppins Regular',
    marginVertical: 20,
  },
  editMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeText: {
    fontSize: 18,
    fontFamily: 'Poppins Regular',
    color: '#000000',
  },
  bottomSection: {
    marginTop: hp(25),
  },
});

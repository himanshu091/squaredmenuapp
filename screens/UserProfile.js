import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Share,
} from 'react-native';
import { Button } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import SocialMediaIcon from '../components/SocialMediaIcon';
import Bg1 from '../assets/images/banners/bg1.svg';
import { connect } from 'react-redux';
import { logout, profileInfo, updateProfilePic, updatePic } from '../store/action';
import { SafeAreaView } from 'react-native';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import { Alert } from 'react-native';

const UserProfile = ({ navigation, name, email, logout, user_id,updatePic, token, profileInfo, updateProfilePic }) => {
  const [data, setdata] = useState(null)
  useEffect(async () => {
    var bodyFormData = new FormData();
    bodyFormData.append('user_id', user_id);
    bodyFormData.append('token', token);
    const res = await profileInfo(bodyFormData)
    setdata(res.data.data)
  }, [])
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      var bodyFormData = new FormData();
      bodyFormData.append('user_id', user_id);
      bodyFormData.append('token', token);
      const res = await profileInfo(bodyFormData)
      setdata(res.data.data)
    });

    return unsubscribe;
}, [navigation]);
const refresh = async () => {
    var bodyFormData = new FormData();
    bodyFormData.append('user_id', user_id);
    bodyFormData.append('token', token);
    const res = await profileInfo(bodyFormData)
    setdata(res.data.data)
    updatePic(res.data.data.user.image)
}
  const onShare = async (msg) => {
    try {
      const result = await Share.share({
        message:
          msg,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const imagepick = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
      includeBase64: true
    }).then(async image => {
        // console.log(image)
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
                {text: 'OK', onPress: () => refresh()},  
            ]  
        );
    }).catch(err=>{
        console.log(err);
    });
  }
  return (
    <SafeAreaView>
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
            onPress={() => navigation.goBack()}>
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

        {!data && <TouchableOpacity style={styles.imageView} onPress={imagepick}>
            <Image source={require('../assets/images/profile/profile.png')} style={styles.profilePic} />
        </TouchableOpacity>}
        {data && <TouchableOpacity style={styles.imageView} onPress={imagepick}>
          {(data.user.image.trim().length > 0)?<FastImage
                    style={styles.profilePic}
                    source={{
                        uri: data.user.image,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />:
          <Image source={require('../assets/images/profile/profile.png')} style={styles.profilePic} resizeMode="cover" />}
            
            
        </TouchableOpacity>}

        <View style={styles.inputFields}>

          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.smallText}>{email}</Text>
          <Text style={styles.smallText}>**********</Text>
          <View style={styles.memberView}>
          <View style={styles.featuresView}>
            {data && data.plans.map(plan => {
             
              return <View key={plan.id} style={styles.featuresView}>
                <View style={styles.membershipView}>
                  <View>
                    <Text style={styles.smallHeadingText}>{plan.name}</Text>
                    <Text style={styles.smallSubHeadingText}>{plan.description}</Text>
                  </View>
                 
                </View>
              </View>
            })}

          </View>
          <View style={styles.renewView} >
                    <Text style={styles.renewText}>Renew Date</Text>
                    <Text style={styles.renewDateText}>{data && data.subscription.ends_at}</Text>
                  </View>
                  </View>

          <View style={styles.featuresView}>
            <View style={styles.share}>
              <View>
                <Text style={styles.smallHeadingText}>Share the love 💜</Text>
                <Text style={styles.smallShareText}>Share this code and get 1 month free premium features</Text>
                
              </View>
              <TouchableOpacity onPress={()=>{onShare(data.web_url)}}>
                <Image source={require('../assets/images/icons/share.png')} />
              </TouchableOpacity>
            </View>
            <Text style={styles.smallBottomText}>{data && data.web_url}</Text>
          </View>
          <TouchableOpacity onPress={logout}><Text style={{ textAlign: 'center' }}>Logout</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = state => {
  return {
    name: state.auth.name,
    email: state.auth.email,
    user_id: state.auth.user_id,
    token: state.auth.token
  }
}
export default connect(mapStateToProps, { logout, profileInfo, updateProfilePic, updatePic })(UserProfile);

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
    marginHorizontal: 15,
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
  },
  memberView: {
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'space-between'
    

  },
  profilePic:{
    height:120,
    width: 120,
    borderRadius: 100,
    resizeMode: 'cover',
  }

});

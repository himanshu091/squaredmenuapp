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
import ImagePicker from 'react-native-image-crop-picker';




const AddABusiness = ({navigation}) => {
    const [name, onChangeName] = React.useState(null);
    const [address, onChangeAddress] = React.useState(null);
    const [states, onChangeState] = React.useState(null);
    const [city, onChangeCity] = React.useState(null);
    const [table, onChangeTable] = React.useState(null);
   
    const imagepick = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        console.log(image);
      });
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
          <TouchableOpacity style={styles.button}     onPress={()=>navigation.goBack()}>
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
          <Text style={styles.headingText}>Add Business</Text>
        </View>
      
    <View style={styles.inputFields}>
    
            <TouchableOpacity onPress={imagepick} style={styles.imageContainer}>
      <Image
      source={require("../assets/images/icons/imageicon.png")}
      style={styles.imageIcon}
      />
      </TouchableOpacity>
    

    <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder="Name"
        textAlign="center"
        placeholderTextColor="#635CC9"
        
      />
       <TextInput
        style={styles.input}
        onChangeText={onChangeAddress}
        value={address}
        placeholder="Address"
        textAlign="center"
        placeholderTextColor="#635CC9"
        
      />
        <TextInput
        style={styles.input}
        onChangeText={onChangeState}
        value={states}
        placeholder="State"
        textAlign="center"
        placeholderTextColor="#635CC9"
        
      />
       <TextInput
        style={styles.input}
        onChangeText={onChangeCity}
        value={city}
        placeholder="City"
        textAlign="center"
        placeholderTextColor="#635CC9"
        
      />
       <TextInput
        style={styles.input}
        onChangeText={onChangeTable}
        value={table}
        placeholder="Number of tables (optional)"
        textAlign="center"
        placeholderTextColor="#635CC9"
        
      />
       
      </View>
      <View style={styles.locationContainer}>
      <Image
      source={require("../assets/images/icons/location.png")}
      style={styles.imageIcon}
      />
      <Text style={styles.locationText}>Locate me</Text>
      </View>
     <Button
          onPress={()=>{}}
          title="Add"
          titleStyle={{ fontSize: 15 }}
          buttonStyle={styles.btn1}
          containerStyle={{marginVertical:15}} 
         
        />
            

    </ScrollView>
  );
};

export default AddABusiness;

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
marginTop:hp('10%')
  },
  input: {
    height: 50,
    marginVertical:5,
    marginHorizontal:40,
    borderWidth: 1,
    borderRadius:25,
    fontSize:15,
    backgroundColor:"#E7E6F3",
    fontFamily:"Poppins Regular",
    borderColor:"#E7E6F3",
   
    

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
  imageIcon:{
    
  },
  imageContainer:{
    alignItems:'center',
    justifyContent:'center'
  },
  locationText:{
    fontSize:15,
   color:"#635CC9",
    fontFamily:"Poppins Regular",
  },
  locationContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginVertical:15
  }
});

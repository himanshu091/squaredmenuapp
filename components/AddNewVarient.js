import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Switch, TouchableOpacity, Image } from 'react-native'
import ToggleSwitch from 'toggle-switch-react-native'
const AddNewVarient = ({closeFunc}) => {
    const [isOn, setisOn] = useState(false)
    return (
        <View style={styles.box}>
            <View>
                <Text style={styles.title}>Add Varient</Text>
                <TextInput
                    style={styles.input}
                    // onChangeText={onChangeEmail}
                    // value={email}
                    placeholder="Name"
                    textAlign="center"
                    placeholderTextColor="#635CC9"
                    
                />
                
                {!isOn && <TextInput
                    style={styles.input}
                    // onChangeText={onChangeEmail}
                    // value={email}
                    placeholder="Price"
                    textAlign="center"
                    placeholderTextColor="#635CC9"
                    
                />}
                <View style={styles.switchBox}>
                    <ToggleSwitch
                        isOn={isOn}
                        onColor="#635CC9"
                        offColor="#635CC920"
                        label="Has Varients?"
                        labelStyle={{ color: "black", fontFamily: 'Poppins Medium'}}
                        size='medium'
                        onToggle={() => setisOn(!isOn)}
                    />
                </View>
            </View>
            <View style={styles.allBtn}>
                <TouchableOpacity style={styles.btn1} onPress={closeFunc}>
                    <Text style={styles.btnText1}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn2}>
                    <Image source={require('../assets/images/icons/tick.png')} />
                    <Text style={styles.btnText2}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddNewVarient

const styles = StyleSheet.create({
    box:{
        height: '90%',
        padding: 27,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'

    },
    title:{
        fontFamily: 'Poppins Medium',
        textAlign: 'center',
        fontSize: 24
    },
    allBtn:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    btn1:{

    },
    btnText1:{
        color: '#635CC9',
        fontSize: 15,
        fontFamily: 'Poppins Medium'
    },
    btn2:{
        backgroundColor: '#635CC9',
        paddingVertical: 14,
        paddingLeft: 40,
        paddingRight: 50,
        borderRadius: 56,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnText2:{
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Poppins Medium',
        paddingLeft: 7
    },
    input: {
        height: 50,
        marginVertical:5,
        borderWidth: 1,
        borderRadius:25,
        fontSize:15,
        backgroundColor:"#726AE910",
        borderColor:"#726AE910",
        color: '#635CC9',
        fontFamily: 'Poppins Medium'
        
    
      },
      switchBox:{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 10
      }
})
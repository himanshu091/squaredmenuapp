import React, { useState } from 'react'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import ToggleSwitch from 'toggle-switch-react-native';
const ImageLink = 'https://s3-alpha-sig.figma.com/img/9f1d/c315/08ab99a54f7760efb7348364a34f84a3?Expires=1617580800&Signature=LAU4jcVnfN7bAVg2PIDwLygNnGHW-e6LLGXcmMgxFccROEPkHPCbVYdlOKRQ7IaSqMklmr75mwPhvbeK6RnS4kn5ji75Ljoajd1Kodh~wQ5ZNpigPNQVHnncXcyfysw~uOqiq0wd989nH3FCmhDyelQPIsuFPy9jhvfrdyhEgH9iuNLDpdJ1O5FAI5HXBr6d5tLorQmORCIoevqd2O-BhPX2x8s7MDT9zW2gZdVnzpbkZIkQeZetXALoM5GWzwgK3xj4EX6V2Svfo~MZnEgCb0~t-ULly5-O4bZPUCpQ4kk6coCnP6oC1tFipp9XG2aTAftMsOR6xGJlrWBykBXB0w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA';
const EditDish = ({navigation}) => {
    const [isOn, setisOn] = useState(false)
    return (
        <SafeAreaView style={styles.body}>
            <ScrollView>
            <FastImage
                style={styles.dishImage}
                source={{
                    uri: ImageLink,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
            <TouchableOpacity 
                style={styles.bell}
                onPress={()=>navigation.goBack()}
            >
                <Image source={require('../assets/images/onboarding/next.png')}/>
            </TouchableOpacity>
            <View style={styles.part1}>
                <View style={styles.dishNameContainer}><Text style={styles.dishName}>Croissant</Text></View>
                <TouchableOpacity style={styles.trademarks}>
                    <Image  style={styles.tm1} source={require('../assets/images/icons/delete.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.descBox}>
            <TextInput
                style={styles.desc}
                // onChangeText={onChangeEmail}
                value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
                // placeholder="email / contact number"
                // textAlign="center"
                // placeholderTextColor="#635CC9"
                numberOfLines={4}
                multiline={true}
            />
            </View>
            <View style={styles.varientBody}>
                <Text style={styles.varientName}>Small</Text>
                <View style={styles.part2}>
                    <Text style={styles.varientCost}>$2.00</Text>
                    <TouchableOpacity><Image source={require('../assets/images/icons/edit.png')}/></TouchableOpacity>
                </View>
            </View>
            <View style={styles.varientBody}>
                <Text style={styles.varientName}>Medium</Text>
                <View style={styles.part2}>
                    <Text style={styles.varientCost}>$5.00</Text>
                    <TouchableOpacity><Image source={require('../assets/images/icons/edit.png')}/></TouchableOpacity>
                </View>
            </View>
            <View style={styles.varientBody}>
                <Text style={styles.varientName}>Large</Text>
                <View style={styles.part2}>
                    <Text style={styles.varientCost}>$8.00</Text>
                    <TouchableOpacity><Image source={require('../assets/images/icons/edit.png')}/></TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.newVarientBtn}>
                <Text style={styles.newVarient}>Add New Variant</Text>
                <Text style={styles.newVarient}>+</Text>
            </TouchableOpacity>
            <View style={styles.line}></View>
            <View>
                <View style={styles.comp}>
                    <View style={styles.compPart1}>
                        <Image style={styles.compImg} source={require('../assets/images/icons/gluten.png')}/>
                        <Text style={styles.compText}>Gluten Free</Text>
                    </View>
                    <ToggleSwitch
                        isOn={isOn}
                        onColor="#635CC9"
                        offColor="#635CC920"
                        // label="Has Varients?"
                        labelStyle={{ color: "black", fontFamily: 'Poppins Medium'}}
                        size='large'
                        onToggle={() => setisOn(!isOn)}
                    />
                </View>
                <View style={styles.line2}></View>
                <View style={styles.comp}>
                    <View style={styles.compPart1}>
                        <Image style={styles.compImg} source={require('../assets/images/icons/vegetarian.png')}/>
                        <Text style={styles.compText}>Vegetarian</Text>
                    </View>
                    <ToggleSwitch
                        isOn={isOn}
                        onColor="#635CC9"
                        offColor="#635CC920"
                        // label="Has Varients?"
                        labelStyle={{ color: "black", fontFamily: 'Poppins Medium'}}
                        size='large'
                        onToggle={() => setisOn(!isOn)}
                    />
                </View>
                <View style={styles.line2}></View>
                <View style={styles.comp}>
                    <View style={styles.compPart1}>
                        <Image style={styles.compImg} source={require('../assets/images/icons/vegan.png')}/>
                        <Text style={styles.compText}>Vegan</Text>
                    </View>
                    <ToggleSwitch
                        isOn={isOn}
                        onColor="#635CC9"
                        offColor="#635CC920"
                        // label="Has Varients?"
                        labelStyle={{ color: "black", fontFamily: 'Poppins Medium'}}
                        size='large'
                        onToggle={() => setisOn(!isOn)}
                    />
                </View>
            </View>
            <View style={styles.line}></View>

            <View style={styles.hide}>
                <Text style={styles.compText}>Hide/deactivate</Text>
                <ToggleSwitch
                    isOn={isOn}
                    onColor="#635CC9"
                    offColor="#635CC920"
                    // label="Has Varients?"
                    labelStyle={{ color: "black", fontFamily: 'Poppins Medium'}}
                    size='large'
                    onToggle={() => setisOn(!isOn)}
                />
            </View>
            <View style={styles.line2}></View>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Salva</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginBottom: 50}}></View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EditDish

const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: '#fff',
    },
    dishImage:{
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(30),
    },
    bell:{
        position:'absolute',
        top: heightPercentageToDP(5),
        left:widthPercentageToDP(3.5),
        transform: [{ rotate: '180deg'}]
    },
    part1:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 15
    },
    trademarks:{
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 10
    },
    dishNameContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    dishName:{
        flexBasis: '70%',
        fontFamily: 'Poppins SemiBold',
        fontSize: widthPercentageToDP(100)/8,
        lineHeight: 60 * 0.75,
        paddingTop: 60 - 35 * 0.75,
    },
    tm1:{
        width: widthPercentageToDP(3.5),
        height: widthPercentageToDP(3.5),
    },
    tm2:{
        width: widthPercentageToDP(13),
        height: widthPercentageToDP(13),
    },
    descBox:{
        paddingVertical: 13,
        borderColor:'#00000010',
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    desc:{
        fontSize: 17,
        fontFamily: 'Poppins Regular',
        paddingHorizontal: 15,
        color: '#989898'
    },
    varientBody:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 17
    },
    varientName:{
        fontSize: 18,
        fontFamily: 'Poppins Medium'
    },
    varientCost:{
        fontSize: 18,
        fontFamily: 'Poppins Medium'
    },
    part2:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    newVarientBtn:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#c4c4c430',
        paddingTop: 20,
        paddingBottom: 14,
        paddingHorizontal: 21,
        marginHorizontal: 22,
        borderRadius: 96,
    },
    newVarient:{
        fontFamily: 'Poppins Regular',
        fontSize: 15,
        color: '#635CC9'
    },
    line:{
        borderWidth: 1,
        borderColor: '#00000006',
        width:widthPercentageToDP(100),
        marginVertical: 26
    },
    line2:{
        borderWidth: 1,
        borderColor: '#00000006',
        width:widthPercentageToDP(100),
        marginVertical: 7
    },
    comp:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 23
    },
    compPart1:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    compText:{
        fontFamily: 'Poppins Regular',
        fontSize: 18
    },
    compImg:{
        height: 25,
        width: 25,
        marginRight: 5
    },
    hide:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    btnContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30
    },
    btn:{
        backgroundColor: '#635CC9',
        borderRadius: 65,
        // paddingHorizontal: widthPercentageToDP()
        width: widthPercentageToDP(90),
        paddingVertical: heightPercentageToDP(1.5)
    },
    btnText:{
        fontFamily: 'Poppins Medium',
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    }
})

import React from 'react'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { Image } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
const ImageLink = 'https://s3-alpha-sig.figma.com/img/9f1d/c315/08ab99a54f7760efb7348364a34f84a3?Expires=1617580800&Signature=LAU4jcVnfN7bAVg2PIDwLygNnGHW-e6LLGXcmMgxFccROEPkHPCbVYdlOKRQ7IaSqMklmr75mwPhvbeK6RnS4kn5ji75Ljoajd1Kodh~wQ5ZNpigPNQVHnncXcyfysw~uOqiq0wd989nH3FCmhDyelQPIsuFPy9jhvfrdyhEgH9iuNLDpdJ1O5FAI5HXBr6d5tLorQmORCIoevqd2O-BhPX2x8s7MDT9zW2gZdVnzpbkZIkQeZetXALoM5GWzwgK3xj4EX6V2Svfo~MZnEgCb0~t-ULly5-O4bZPUCpQ4kk6coCnP6oC1tFipp9XG2aTAftMsOR6xGJlrWBykBXB0w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA';
const DishDetail = ({navigation}) => {
    return (
        <SafeAreaView style={styles.body}>
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
            <TouchableOpacity 
                style={styles.edit}
                onPress={()=>{navigation.navigate('EditDish')}}>
                <Image source={require('../assets/images/icons/edit.png')}/>
            </TouchableOpacity>
            <View style={styles.part1}>
                <View style={styles.dishNameContainer}><Text style={styles.dishName}>Croissant</Text></View>
                <View style={styles.trademarks}>
                    <Image  style={styles.tm1} source={require('../assets/images/icons/gluten.png')} />
                    <Image  style={styles.tm2} source={require('../assets/images/icons/vegan.png')} />
                </View>
            </View>
            <View style={styles.descBox}>
                <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</Text>
            </View>
            <View style={styles.varientBody}>
                <Text style={styles.varientName}>Small</Text>
                <Text style={styles.varientCost}>$2.00</Text>
            </View>
            <View style={styles.varientBody}>
                <Text style={styles.varientName}>Medium</Text>
                <Text style={styles.varientCost}>$5.00</Text>
            </View>
            <View style={styles.varientBody}>
                <Text style={styles.varientName}>Large</Text>
                <Text style={styles.varientCost}>$8.00</Text>
            </View>
        </SafeAreaView>
    )
}

export default DishDetail

const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: '#fff'
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
    edit:{
        position:'absolute',
        top: heightPercentageToDP(1),
        right:widthPercentageToDP(3.5),
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
        flexDirection: 'row',
        alignItems: 'center'
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
        width: widthPercentageToDP(9),
        height: widthPercentageToDP(9),
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
        paddingVertical: 17,
        paddingHorizontal: 17
    },
    varientName:{
        fontSize: 18,
        fontFamily: 'Poppins Medium'
    },
    varientCost:{
        fontSize: 18,
        fontFamily: 'Poppins Medium'
    }
})

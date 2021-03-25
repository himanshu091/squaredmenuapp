import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const MenuSection = ({sectionName, itemList, addNew}) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionText}>{sectionName}</Text>
                <TouchableOpacity style={styles.delete}>
                    <Image source={require('../assets/images/icons/delete.png')}/>
                </TouchableOpacity>
            </View>
            {itemList.map((menu, idx0) => {
                return <View key={idx0} style={styles.menuItem}>
                    <View style={styles.menuSubItem}>
                        <Text style={styles.itemName}>{menu.itemName}</Text>
                        {!menu.varient && <Text style={styles.cost}>${parseFloat(menu.cost).toFixed(2)}</Text>}
                    </View>
                    
                    {
                        menu.varient && menu.varientList.map((varItem,idx1) => {
                            return <View key={idx1} style={styles.varientBox}>
                                <View style={styles.part1}>
                                    <Image source={require('../assets/images/icons/bullet.png')}/>
                                    <Text style={styles.varientItemName}>{varItem.name}</Text>
                                </View>
                                <Text style={styles.cost}>${parseFloat(varItem.cost).toFixed(2)}</Text>
                            </View>
                        })
                    }
                </View>
            })}
            <View style={styles.bar}></View>
            <TouchableOpacity style={styles.newSection} onPress={addNew}>
                <Text style={styles.sectionName}>Add New Item</Text>
                <Image style={styles.plus} source={require('../assets/images/icons/plus.png')}/>
            </TouchableOpacity>
        </View>
    )
}

export default MenuSection

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: '#fff',
        borderTopRightRadius: 17,
        borderTopLeftRadius: 17,
        marginHorizontal: 25,
        marginBottom: 15,
        elevation: 2
    },
    sectionHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 30
    },
    sectionText:{
        fontFamily: 'Poppins Bold',
        color: '#000',
        fontSize: 15
    },
    delete:{
        padding: 5
    },
    menuItem:{
        borderTopColor: '#00000004',
        borderTopWidth:1,
        paddingTop: 8,
        paddingHorizontal: 15,
    },
    itemName:{
        fontSize: 15,
        fontFamily: 'Poppins Medium'
    },
    varientBox:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    part1:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    varientItemName:{
        fontFamily: 'Poppins Regular',
        marginLeft: 12,
        paddingTop: 4,
        fontSize: 15,
        color: '#000'
    },
    cost:{
        fontFamily: 'Poppins Regular',
        fontSize: 18,
        color: '#000'
    },
    menuSubItem:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    newSection:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 17
    },
    plus:{
        height: 13,
        width: 13,
    },
    sectionName:{
        fontFamily: 'Poppins Regular',
        color: '#635CC9',
        fontSize: 15
    },
    bar:{
        borderTopColor: '#00000004',
        borderTopWidth:1,
    }
})

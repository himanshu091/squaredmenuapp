import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { deleteItem } from '../store/action'

const MenuSection = ({menuName, data, addNew, navigation, deleteItem, user_id, token, refresh, menu_id}) => {

    const deleteThisItem = async () => {
        var bodyFormData = new FormData();
        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        bodyFormData.append('item_id', data.item_id);
        const res = await deleteItem(bodyFormData)
        if(res.data.status){
            refresh()
        }
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionText}></Text>
                <TouchableOpacity style={styles.delete} onPress={deleteThisItem}>
                    <Image source={require('../assets/images/icons/delete.png')}/>
                </TouchableOpacity>
            </View>
                <View style={styles.menuItem}>
                    <View style={styles.menuSubItem}>
                        <TouchableOpacity onPress={()=>navigation.navigate('DishDetail', {item_id:data.item_id, menu_id:menu_id})}><Text style={styles.itemName}>{menuName}</Text></TouchableOpacity>
                        {data.has_variants === 0 && <Text style={styles.cost}>${parseFloat(data.price).toFixed(2)}</Text>}
                    </View>
                    
                    {
                       data.has_variants === 1 && data.variants.map((varItem,idx1) => {
                            return <View key={idx1} style={styles.varientBox}>
                                <View style={styles.part1}>
                                    <Image source={require('../assets/images/icons/bullet.png')}/>
                                    <Text style={styles.varientItemName}>{varItem.option}</Text>
                                </View>
                                <Text style={styles.cost}>${parseFloat(varItem.price).toFixed(2)}</Text>
                            </View>
                        })
                    }
                </View>
            {data.has_variants === 1 && <View style={styles.bar}></View>}
            {/* {data.has_variants === 1 && <TouchableOpacity style={styles.newSection} onPress={addNew}>
                <Text style={styles.sectionName}>Add New Varient</Text>
                <Image style={styles.plus} source={require('../assets/images/icons/plus.png')}/>
            </TouchableOpacity>} */}
            {data.has_variants === 0 && <View style={{paddingBottom: 10}}>
            </View>}
        </View>
    )
}
const mapStateToProps = state => {
    return{
        user_id: state.auth.user_id,
        token: state.auth.token
    }
}
export default connect(mapStateToProps,{deleteItem})(MenuSection)

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
        paddingTop: 7,
        paddingBottom: 3
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

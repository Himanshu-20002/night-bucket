import { View,  StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import {Colors, Fonts} from '../../utils/Constants'
import CustomText from '../../components/ui/CustomText'
import { RFValue } from 'react-native-responsive-fontsize';
import { formatISOToCustom } from '@utils/DateUtils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { navigate } from '@utils/NavigationUtils';

interface CartItem {
    _id: string | number;
    item: any;
    count: number;
  }
  
  interface OrderItemProps {
    orderId: string;
    items: CartItem[];
    totalPrice: number;
    status: 'confirmed' | 'pending' | 'cancelled';
    createdAt: string;
    deliveryLocation: {
        address: any;
    }
  }
  function getStatusColor(status:string){
    switch(status.toLowerCase()){
        case 'available': return '#4C0B8D'
        case 'delivered': return '#F59918'
        case 'confirmed': return '#179F37'
        case 'pending': return '#ffc107'
        case 'cancelled': return '#dc3545'
    }

  }

const OrderItem:FC<{item:OrderItemProps, index:number}> = ({item, index}) => {
  return (
    <View style={styles.container}>
        <View style={styles.flexRowBetween}>
            <CustomText variant='h8' fontFamily={Fonts.Medium}> #{item.orderId}</CustomText>
        </View>
        <View style={[styles.statusContainer,{backgroundColor:getStatusColor(item.status)}]}>
            <CustomText variant='h8' fontFamily={Fonts.SemiBold} style={[styles.statusText]}>{item.status}</CustomText>
        </View>
        <View style={styles.itemContainer}>
            {item.items.map((item,index)=>(
                <View key={index}>
                    <CustomText variant='h8' fontFamily={Fonts.SemiBold}>{item.count}x  {item.item.name}</CustomText>
                </View>
            ))}
        </View>
        <View style={styles.addressContainer}>
            <View style={styles.addressTextContainer}>
                <CustomText variant='h8' fontFamily={Fonts.SemiBold}>{item.deliveryLocation.address}</CustomText>
            </View>
            <View style={styles.iconContainer}>
                <CustomText variant='h8' fontFamily={Fonts.SemiBold}>{formatISOToCustom(item.createdAt)}</CustomText>

            </View>
            <TouchableOpacity style={styles.iconContainer} onPress={()=>{navigate('DeliveryMap',{orderId:item.orderId})}}>
                <Icon name='chevron-right' size={RFValue(20)} color={Colors.primary}/>
            </TouchableOpacity>
        </View>

   
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.7,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.border,
    paddingVertical: 15,
    marginVertical: 10,
    backgroundColor: 'white'
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'aquamarine',
  },
  statusContainer: {
    paddingVertical:4,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  statusText: {
    textTransform: 'capitalize',
    color: 'white'
  },
  itemContainer: {
    width:'50%',
    marginTop:10
  },
  addressContainer: {
    marginTop: 10,
  },
  addressTextContainer: {
    width:'70%'
  },
  dateText:{
    marginTop:2,
    fontSize:RFValue(12),
    
  },
  iconContainer: {
    alignItems: 'flex-end'
  }
})
export default OrderItem
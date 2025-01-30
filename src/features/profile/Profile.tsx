import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@state/authStore';
import { fetchCustomerOrders } from '@services/OrderService';
import { useCartStore } from '@state/cartStore';
import CustomHeader from '../../components/ui/CustomHeader';
import { Colors ,Fonts} from '../../utils/Constants';
import CustomText from '../../components/ui/CustomText';
import WalletSection from './WalletSection';
import ActionButton from './ActionButton';
import OrderItem from './OrderItem';
import { storage, tokenStorage } from '@state/storage';
import { resetAndNavigate } from '@utils/NavigationUtils';
const Profile = () => {

    const {user} = useAuthStore();
    const [orders,setOrders] = useState<any[]>([]);
    const {logout} = useAuthStore();
    const {clearCart} = useCartStore();
    const fetchOrders = async()=>{
        const data = await  fetchCustomerOrders(user?.id);
        if(data?.orders){
            setOrders(data?.orders);
        }
    }
    useEffect(()=>{
        fetchOrders();
    },[]);

    const renderOrderItem = ({item,index}:{item:any,index:number})=>{
        return (
            <OrderItem item={item} index={index}/>
        )
    }

    const renderHeader = ()=>{
        return (<View> 
            <CustomText variant='h3' fontFamily={Fonts.SemiBold}>Your Account</CustomText> 
            <CustomText variant='h7' fontFamily={Fonts.Medium}>{user?.phone}</CustomText> 
            <WalletSection/>
            <CustomText variant='h8' style={styles.informativeText}>YOUR INFORMATION</CustomText> 

            <ActionButton icon='book-outline' label='Address Book'/>
            <ActionButton icon='information-outline' label='About us'/>
            <ActionButton icon='logout' label='Logout' onPress={()=>{
                clearCart();
                logout();
                tokenStorage.clearAll();
                storage.clearAll();
                resetAndNavigate('CustomerLogin');
            }}/>
            <CustomText variant='h8' style={styles.pastText}>PAST ORDERS</CustomText> 
            </View>)
        
    }
  return (
    <View style={styles.container}>
    <CustomHeader title='Profile' search={false} />    
    <FlatList
    data={orders}
    ListHeaderComponent={renderHeader}
    renderItem={renderOrderItem}
    keyExtractor={(item)=>item?.orderId}
    contentContainerStyle={styles.scrollViewContent}
    removeClippedSubviews={false}
    />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.backgroundSecondary,

    },
    scrollViewContent:{
      padding:10,
      paddingTop:20,
      paddingBottom:100
    },
    informativeText:{
        opacity:0.7,
        marginBottom:20,
    },
    pastText:{
        marginVertical:20,
        opacity:0.7,

    },
});

export default Profile
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {FC, useEffect} from 'react';
import {useAuthStore} from '@state/authStore';
import {getOrderById} from '@services/OrderService';
import {Colors, Fonts} from '../../utils/Constants';
import LiveHeader from './LiveHeader';
import LiveMap from './LiveMap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '../../components/ui/CustomText';
import DeliveryDetails from './DeliveryDetails';
import OrderSummary from './OrderSummary';
import withLiveStatus from './withLiveStatus';

const LiveTracking: FC = () => {


  const {currentOrder, setCurrentOrder} = useAuthStore();


useEffect(() => {
  const fetchOrderDetails = async () => {
    try {
      const data = await getOrderById(currentOrder?.orderId as any);
      if (data && data.order) {
        setCurrentOrder(data.order); // Ensure the correct structure is set
      } else {
        console.error('Invalid order data:', data);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  if (currentOrder?._id) {
    fetchOrderDetails();
  }
}, [currentOrder?._id]);

  //The component sets msg and time based on the currentOrder status.
  // This is used to display different messages and times based on the order's progress.

  let msg = 'Packing your order';
  let time = 'Arriving in 10 minutes';
  if (currentOrder?.status === 'confirmed') {
    msg = 'Packing your order';
    time = 'Arriving in 8 minutes';
  } else if (currentOrder?.status === 'arriving') {
    msg = 'Your order is on the way';
    time = 'Arriving in 5 minutes';
  } else if (currentOrder?.status === 'delivered') {
    msg = 'Your order has been delivered';
    time = 'Enjoy your meal';
  }



  return (
    <View style={styles.container}>
      <LiveHeader type="Coustomer" title={msg} secondaryTitle={time} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <LiveMap />
        <View style={styles.flexRow}>
        <View style={styles.iconContainer}> 
            <Icon name={currentOrder?.deliveryPartner ? 'phone' : 'shopping'} size={RFValue(20)} color={Colors.disabled} />
            </View>
            <View style={{width:'80%'}}>
             { <CustomText variant='h7' fontFamily={Fonts.SemiBold}>{currentOrder?.deliveryPartner?.name || "we will soon assign a delivery partner"}</CustomText>}
             {currentOrder?.deliveryPartner && <CustomText variant='h7' fontFamily={Fonts.SemiBold}>{currentOrder?.deliveryPartner?.phone}</CustomText>}
             { <CustomText variant='h9' fontFamily={Fonts.Medium}>{currentOrder?.deliveryPartner?  "For Delivery instructions you can contact here":msg}</CustomText>}
            </View>
      
        </View>
        <DeliveryDetails details={currentOrder?.customer}/>
        {currentOrder && <OrderSummary  order={currentOrder}/>}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  scrollContent: {
    paddingBottom: 150,
    backgroundColor: Colors.backgroundSecondary,
    padding: 15,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:10,
    width:'100%',
    borderRadius:15,
    marginTop:15,
    paddingVertical:10,
    backgroundColor:'#fff',
    padding:10,
    borderBottomWidth:9,
    borderBottomColor:Colors.border,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    gap:10,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent:'center',
    alignItems:'center'
  },
});

export default withLiveStatus(LiveTracking);

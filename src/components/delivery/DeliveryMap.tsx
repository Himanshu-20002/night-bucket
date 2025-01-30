import {View,  StyleSheet, ScrollView, Alert} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {useAuthStore} from '@state/authStore';
import {confirmOrder, getOrderById, sendLiveOrderUpdates, updateOrderStatus} from '@services/OrderService';
import {Colors} from '../../utils/Constants';
import LiveHeader from '../../features/map/LiveHeader';
import LiveMap from '../../features/map/LiveMap';
import DeliveryDetails from '../../features/map/DeliveryDetails';
import OrderSummary from '../../features/map/OrderSummary';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import CustomButton from '@components/ui/CustomButton';
import { hocStyles } from '@styles/GlobalStyles';
import { PermissionsAndroid, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Text } from 'react-native-svg';

const DeliveryMap: FC = () => {
  const user = useAuthStore((state) => state.user)
  const [orderData,setOrderData] = useState<any>(null)
  const [myLocation,setMyLocation] = useState<any>(null)
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [loading, setLoading] = useState(false);
  const route = useRoute()
  const orderDetails = route?.params as Record<string,any>
  const {setCurrentOrder} = useAuthStore()
  console.log('orderDetails',orderDetails)
  console.log('orderData',orderData)
  if(myLocation){
    console.log('myLocation',myLocation)
  }

  const fetchOrderDetails = async () => {
    const data = await getOrderById(orderDetails?.orderId as any);
    setOrderData(data?.order);
  }

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        setPermissionGranted(granted === PermissionsAndroid.RESULTS.GRANTED);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        setPermissionGranted(result === RESULTS.GRANTED);
        return result === RESULTS.GRANTED;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  useEffect(()=>{
    fetchOrderDetails()
  },[])

//   useFocusEffect(
//     useCallback(() => {
//       const getLocation = async () => {
//         const hasPermission = await requestLocationPermission();
//         if (!hasPermission) {
//           Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
//           return;
//         }

//         const watchId = Geolocation.watchPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
//             const address = 'saultanpur 4h-ee';
//             setMyLocation({ latitude, longitude, address });
//             if(myLocation){
//               console.log('myLocation',myLocation);
//             }
//           },
//           (error) => {
//             console.log('error', error);
//           },
//           { enableHighAccuracy: true, distanceFilter: 7 }
//         );

//         return () => Geolocation.clearWatch(watchId);
//       };

//   getLocation();
// }, [myLocation])
//   );
// const startLocationTracking = useCallback(() => {
//   if (!permissionGranted) return;

//   const watchId = Geolocation.watchPosition(
//     (position) => {
//       const { latitude, longitude } = position.coords;
//       console.log('Location updated:', { latitude, longitude });
//       setMyLocation({ 
//         latitude, 
//         longitude, 
//         address: 'saultanpur 4h-ee' // You might want to use reverse geocoding here
//       });
//     },
//     (error) => {
//       console.error('Location error:', error);
//       Alert.alert(
//         'Location Error',
//         'Unable to get your location. Please check your GPS settings.'
//       );
//     },
//     { 
//       enableHighAccuracy: true, 
//       distanceFilter: 7,
//       timeout: 15000,
//       maximumAge: 10000
//     }
//   );

//   return () => Geolocation.clearWatch(watchId);
// }, [permissionGranted]);

// Use effect for initialization
const startLocationTracking = useCallback(() => {
  console.log('Starting location tracking...');
  
  // Get initial position
  Geolocation.getCurrentPosition(
    (position) => {
      console.log('Initial position:', position);
      const { latitude, longitude } = position.coords;
      setMyLocation({ 
        latitude, 
        longitude, 
        address: 'Current Location' 
      });
    },
    (error) => {
      console.log('Initial position error:', error);
      Alert.alert('Error', 'Could not get initial position');
    },
    { 
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000 
    }
  );

  // Start watching position
  const watchId = Geolocation.watchPosition(
    (position) => {
      console.log('Position update:', position);
      const { latitude, longitude } = position.coords;
      setMyLocation({ 
        latitude, 
        longitude, 
        address: 'Current Location'
      });
    },
    (error) => {
      console.log('Watch position error:', error);
    },
    { 
      enableHighAccuracy: true,
      distanceFilter: 10,
      interval: 5000,
      fastestInterval: 2000
    }
  );

  return () => {
    console.log('Cleaning up location tracking');
    Geolocation.clearWatch(watchId);
  };
}, []);



useEffect(() => {
  const initLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (hasPermission) {
      startLocationTracking();
    }
  };
  
  initLocation();
}, []);



const acceptOrder = async () => {
  if (!myLocation?.latitude || !myLocation?.longitude) {
    Alert.alert(
      'Location Required', 
      'Please wait while we get your current location.'
    );
    return;
  }

  try {
    setLoading(true); // Add loading state
    const data = await confirmOrder(orderData?._id, myLocation);
    
    if (data) {
      setCurrentOrder(data);
      Alert.alert('Success', 'Order accepted successfully');
      await fetchOrderDetails();
    } else {
      Alert.alert('Error', 'Failed to accept order');
    }
  } catch (error) {
    console.error('Accept order error:', error);
    Alert.alert('Error', 'Something went wrong while accepting the order');
  } finally {
    setLoading(false);
  }
};

  const orderPickedUp = async () => {
    const data = await updateOrderStatus(orderData?._id,myLocation,'arriving' )
    if(data){
      setCurrentOrder(data)
      Alert.alert('status changed to arriving')
    }else{
      Alert.alert('There was an error accepting the order')
    }
    fetchOrderDetails()
  } 
  const orderDelivered = async () => {
    const data = await updateOrderStatus(orderData?._id,myLocation,'delivered' )
    if(data){
      setCurrentOrder(data)
      Alert.alert('Order Delivered')
    }else{
      Alert.alert('There was an error deliverin the order')
    }
    fetchOrderDetails()
  }  


  //The component sets msg and time based on the currentOrder status.
  // This is used to display different messages and times based on the order's progress.

  let message = 'Start this order';
  let time = 'Arriving in 10 minutes';
  if (orderData?.deliveryPartner?._id  == user?._id && orderData?.status === 'confirmed') {
    message = 'Packing your order';
  }else if(orderData?.deliveryPartner?._id  == user?._id && orderData?.status === 'arriving'){
    message = 'Your order is on the way';
    time = 'Arriving in 5 minutes';
  }else if(orderData?.deliveryPartner?._id  == user?._id && orderData?.status === 'delivered'){
    message = 'Your order has been delivered';
    time = 'Enjoy your meal';
  }else if(orderData?.deliveryPartner?._id  != user?._id && orderData?.status === 'confirmed'){
    message = 'Order is assigned to another delivery partner';
  }



  useEffect(() => {
    async function sendLiveUpdate() {
      if (orderData?.deliveryPartner?._id == user?._id 
        && orderData?.status != 'delivered' 
        && orderData?.status != 'cancelled') {
        await sendLiveOrderUpdates(orderData._id, myLocation, orderData?.status);
        fetchOrderDetails();
      }
    }

    if (myLocation) {
      sendLiveUpdate();
    }
  }, [myLocation]);



  return (
    <View style={styles.container}>
      <LiveHeader type="Delivery" title={message} secondaryTitle='Delivery in 10 minutes' />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <LiveMap />
        <OrderSummary  order={orderData}/>

        <View style={styles.flexRow}>
        <DeliveryDetails details={orderData?.customer} location={myLocation}/>
      
        
        </View>
      </ScrollView>
      {orderData?.status != 'delivered' && orderData?.status != 'cancelled' && (
        <View style={[hocStyles.cartContainer,styles.btnContainer]}>
          {orderData?.status =='available' && (
            <CustomButton 
            disabled={false}
            title='Accept Order' 
            onPress={acceptOrder}
            loading={false}
            />
          )}
          {orderData?.status =='confirmed' &&
          orderData?.deliveryPartner?._id == user?._id && (
            <CustomButton 
            disabled={false}
            title='Order Picked Up' 
            onPress={orderPickedUp}
            loading={false}
            backgroundColor={Colors.primary}
            />
          )}
          {orderData?.status =='arriving' &&
          orderData?.deliveryPartner?._id == user?._id && (
            <CustomButton 
            disabled={false}
            title='Order Delivered' 
            onPress={orderDelivered}
            loading={false}
            backgroundColor='#F3145B'

            />
          )}
        </View>
      )}
      
    </View>
  );
};
const styles = StyleSheet.create({
  locationStatus: {
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  btnContainer:{
    padding:0,
    alignItems:'center',
    height:90,
    backgroundColor:Colors.backgroundSecondary
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

    backgroundColor: Colors.backgroundSecondary,
    justifyContent:'center',
    alignItems:'center'
  },
});

export default DeliveryMap;

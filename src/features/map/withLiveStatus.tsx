import React, {FC, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {Colors, Fonts} from '../../utils/Constants';
import {useNavigationState } from '@react-navigation/native';
import { useAuthStore } from '@state/authStore';
import { getOrderById } from '@services/OrderService';
import CustomText from '@components/ui/CustomText';
import { hocStyles, hocStyles2 } from '../../styles/GlobalStyles';
import { navigate } from '../../utils/NavigationUtils';
import { SOCKET_URL } from '@services/config';
import { io } from 'socket.io-client';
import FastImage from 'react-native-fast-image';

const withLiveStatus = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const WithCartComponent: FC<P> = props => {
    const {currentOrder,setCurrentOrder} = useAuthStore();
    const routeName = useNavigationState(state => state.routes[state.index].name);
    const fetchOrderDetails = async () => {
        const data = await getOrderById(currentOrder?._id as any);
        setCurrentOrder(data?.order);
    }

    useEffect(()=>{
        if(currentOrder){
            const socketInstance =io(SOCKET_URL,{
                transports:['websocket'],
                withCredentials:false,
            });
            socketInstance.emit('joinRoom',currentOrder?._id);
            socketInstance.on('liveTrackingUpdates',(updatedOrder:any)=>{
              fetchOrderDetails();
              console.log("RECEVING LIVE UPDATES",updatedOrder);
            });
            socketInstance.on('orderConfirmed',(updatedOrder:any)=>{
              fetchOrderDetails();
              console.log("ORDER CONFIRMATION LIVE UPDATE",updatedOrder);
            });
            return ()=>{
              socketInstance.disconnect();
            }
        }
    },[currentOrder]);
    return ( 
      // The component should render something here
      <View style={styles.container}>
        <WrappedComponent {...props} />
        {currentOrder && routeName ==='ProductDashboard' && (
            <View style={[hocStyles2.cartContainer,{flexDirection:'row',alignItems:'center'}]}>
                <View style={styles.flexRow}>
                    <View style={{width:'68%',height:'30'}}>
                      
                        <CustomText variant='h7' fontFamily={Fonts.SemiBold}>Order is {currentOrder?.status}</CustomText>
                        <CustomText variant='h7' fontFamily={Fonts.Regular} style={{color:"green"}}  numberOfLines={1}>
                            {currentOrder?.items![0]?.item.name +
                            (currentOrder?.items?.length -1>0 ? ` and ${currentOrder?.items?.length -1} + items` : '')} 
                            </CustomText>
                        <CustomText variant='h7' fontFamily={Fonts.SemiBold}>{currentOrder?.status === 'confirmed' ? 'Packing your order' : currentOrder?.status === 'ready_to_deliver' ? 'Ready to deliver' : currentOrder?.status === 'on_the_way' ? 'On the way' : currentOrder?.status === 'delivered' ? 'Delivered' : ''}</CustomText>

                    </View> 

                    {/* <CustomText variant='h8' style={{color:Colors.secondary}} fontFamily={Fonts.Medium}>View Order</CustomText> */}

                <TouchableOpacity style={styles.btn} onPress={()=>navigate('LiveTracking')}>
                            <FastImage source={{uri:currentOrder?.items![0]?.item?.images[0]}} style={styles.cartIcon} />
                </TouchableOpacity>
                </View>
            </View>
        )}
        



      </View>
    );
  };

  return WithCartComponent;
};
const styles = StyleSheet.create({
  container: {
    flex:1,
    // backgroundColor: Colors.backgroundSecondary,
  },
  flexRow:{
    flexDirection:'row',
    gap:10,
    borderRadius:100,
    width:'100%',
    marginTop:0,
    marginLeft:7,
    paddingVertical:3,
    backgroundColor:'white',
    // height:"50",
    padding:10,
    borderBottomWidth:0.9,
    borderColor:Colors.border,
    alignItems:'center',
  },
  img:{
    backgroundColor:Colors.backgroundSecondary,
    borderRadius:100,
    padding:10,
    justifyContent:'center',
    alignItems:'center'
  },
  cartIcon:{
    width:30,
    height:40,
    resizeMode:'contain',
    backgroundColor:Colors.backgroundSecondary,
    borderRadius:100,
    padding:10,
    justifyContent:'center',
    alignItems:'center'
  },
  btn:{
 
   padding:0,
   borderRadius:50,
    borderWidth:5,
    borderColor:Colors.secondary,
    marginRight:17,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    resizeMode:"contain",
    right:9
  }
});

export default withLiveStatus;

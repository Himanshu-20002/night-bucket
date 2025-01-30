import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '../../utils/Constants'
import { Fonts } from '../../utils/Constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '../../components/ui/CustomText'


const DeliveryDetails:FC<{details:any ,location:any}> = ({details,location}) => {
  console.log(location)
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.iconContainer}>
            <Icon name='bike-fast' size={RFValue(20)} color={Colors.disabled} />
        </View>
        <View>
            <CustomText variant='h5' fontFamily={Fonts.SemiBold}>Your Delivery details</CustomText>
            <CustomText variant='h8' fontFamily={Fonts.Medium}>Details of your current order</CustomText>
        </View>
      </View>
      <View style={styles.flexRow2}>
        <View style={styles.iconContainer}>
            <Icon name='map-marker-outline' size={RFValue(20)} color={Colors.disabled} />
        </View>
        <View>
            <CustomText variant='h8' fontFamily={Fonts.Medium}>Delivery at Home</CustomText>
            <CustomText variant='h8' fontFamily={Fonts.Regular}>{details?.address || '------'}</CustomText>
        </View>
      </View>
      <View style={styles.flexRow2}>
        <View style={styles.iconContainer}>
            <Icon name='phone-outline' size={RFValue(20)} color={Colors.disabled} />
        </View>
        <View>
            <CustomText variant='h8' fontFamily={Fonts.SemiBold}>{details?.name || '------'}       {details?.phone || 'XXXXXXXXXX'}</CustomText>
            <CustomText variant='h8' fontFamily={Fonts.Medium}>Receiver's Contact Number</CustomText>
        </View>
      </View>
      <View style={styles.flexRow2}>
        <View style={styles.iconContainer}>
            <Icon name='chess-bishop' size={RFValue(20)} color={Colors.disabled} />
        </View>
        <View>
            <CustomText variant='h8' fontFamily={Fonts.SemiBold}>{location?.latitude},{location?.longitude}</CustomText>
            <CustomText variant='h8' fontFamily={Fonts.Medium}>{location?.address}</CustomText>
        </View>
      </View>


    </View>
  )
}



const  styles = StyleSheet.create({
  container:{
    padding:10,
    borderBottomWidth:0.7,
    borderRadius:15,
    width:'100%',
    paddingVertical:10,
    backgroundColor:'#fff'
  },
  flexRow:{
    flexDirection:'row',
    // justifyContent:'space-between',
    alignItems:'center',
    gap:10,
    padding:10,
    borderBottomWidth:0.7,
    borderBottomColor:Colors.border

  },
  flexRow2:{
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    padding:10,


  },
  iconContainer:{
    backgroundColor:Colors.backgroundSecondary,
    padding:10,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:100
  }
})
export default DeliveryDetails
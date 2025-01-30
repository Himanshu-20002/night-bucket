import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { screenHeight, screenWidth } from '../../utils/Scaling';
import { Colors, Fonts } from '../../utils/Constants';
import CustomText from '../../components/ui/CustomText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { navigate } from '../../utils/NavigationUtils';
interface CartSummaryProps {
  cartCount: number;
  cartImage: string;
}


const CartSummary:FC<CartSummaryProps> = ({ cartCount, cartImage }) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexRowGap}>
        <Image source={cartImage===null ? require('../../assets/icons/bucket.png') : { uri: cartImage }} style={styles.image} />
       <CustomText variant='h5' fontFamily={Fonts.SemiBold}>{cartCount}</CustomText>
       <Icon name='arrow-expand-vertical' size={RFValue(25)} color={Colors.secondary}/>
      </View>
      <TouchableOpacity 
      style={styles.btn}
      onPress={()=>navigate('ProductOrder')}
      >
        <CustomText variant='h5' fontFamily={Fonts.Medium} style={styles.btnText}>View Cart</CustomText>
        <Icon name='arrow-right' size={RFValue(16)} color='#fff'/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: screenWidth * 0.05,
    paddingBottom: screenHeight * 0.03,
    paddingTop: screenHeight * 0.014,
  },
  flexRowGap: {
    flexDirection: 'row',
    gap: screenWidth * 0.03,
    alignItems: 'center',
  },
  image: {
    width: screenWidth * 0.15,
    height: screenHeight * 0.06,
    borderRadius: 10,
    borderColor: Colors.border,
    borderWidth: 1,
    resizeMode: 'contain',
    backgroundColor: '#FFFFFF',
  },
  btn: {
    paddingHorizontal: screenWidth * 0.1,
    paddingVertical: screenHeight * 0.01,
    borderRadius: screenWidth * 0.05,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: Colors.secondary,

  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: screenWidth * 0.02,
  },
});

export default CartSummary
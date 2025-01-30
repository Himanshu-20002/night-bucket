import {View, Text, StyleSheet, Image} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '../../utils/Constants';
import CustomText from '../../components/ui/CustomText';
import UniversalAdd from '../../components/ui/UniversalAdd';
const OrderItem: FC<{item: CartItem}> = ({item}) => {
  return (
    <View style={styles.flexRow}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item?.item?.images[0]}} style={styles.img} />
      </View>
      <View style={{width: '55%'}}>
        <CustomText variant="h7" fontFamily={Fonts.Medium}>
          {item?.item?.name}
        </CustomText>
        <CustomText variant="h8" style={{opacity: 0.5}}>
          {item?.item?.quantity}
        </CustomText>
      </View>
      <View style={{width: '20%',alignItems:'flex-end'}}>
        <UniversalAdd item={item?.item} />
        <CustomText variant="h7" fontFamily={Fonts.Medium} style={{alignSelf:'flex-end',marginTop:4}}>
        ₹{item.count* item.item.price}
        </CustomText>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  imageContainer: {
    backgroundColor: '#E8E8E8',
    padding: 10,
    borderRadius: 15,
    width: '17%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderTopWidth: 0.6,
    borderColor: Colors.border,
  },
});

export default OrderItem;

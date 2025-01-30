import {View, Text, StyleSheet, Image} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '../../utils/Constants';
import CustomText from '../../components/ui/CustomText';
import {formatISOToCustom} from '@utils/DateUtils';
import FastImage from 'react-native-fast-image';
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
}

const OrderItem: FC<{item: OrderItemProps; index: number}> = ({
  item,
  index,
}) => {
  return (
    <View
      style={[
        styles.orderItemContainer,
        {borderTopWidth: index === 0 ? 0.7 : 0},
      ]}>
      <View style={styles.flexRowBetween}>
        <CustomText variant="h8" fontFamily={Fonts.Medium}>
          #{item.orderId}
        </CustomText>
        <CustomText
          variant="h8"
          fontFamily={Fonts.Medium}
          style={{textTransform: 'capitalize'}}>
          {item.status}
        </CustomText>
      </View>
      <View style={styles.flexRowBetween}>
        <View style={{width: '50%'}}>
          {item?.items.map((i, idx) => (
            <CustomText
              variant="h8"
              fontFamily={Fonts.Medium}
              key={idx}
              numberOfLines={1}>
              {i.count}x {i.item.name}
            </CustomText>
          ))}
        </View>
      </View>

        <View style={styles.flexRowBetween}>
            <View style={{flexDirection: 'row', gap: 4, marginTop: 10}}>
         {item?.items.map((i, idx) => (
            <FastImage
              source={{uri: i.item.images[0]}}
              style={styles.itemImage}
              key={idx}
            />
          ))}
        </View>

          <View style={{alignItems:'flex-end'}}>   
          <CustomText
            variant="h5"
            fontFamily={Fonts.SemiBold}
            style={{marginTop: 10}}>
            ₹{item.totalPrice}
          </CustomText>
        <CustomText variant="h9" fontFamily={Fonts.Medium}>
          {formatISOToCustom(item.createdAt)}
          </CustomText>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  orderItemContainer: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.7,
    paddingVertical: 15,
    opacity: 0.7,
    backgroundColor: 'white',
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
});

export default OrderItem;

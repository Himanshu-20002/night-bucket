import {View, Text, StyleSheet, Image} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '../../utils/Constants';
import {useCartStore} from '../../state/cartStore';
import CustomText from '../../components/ui/CustomText';
import OrderItem from './OrderItem';
const OrderList: FC = () => {
  const cartItem = useCartStore(state => state.cart);
  const totalItems = cartItem.reduce((acc, cart) => acc + cart?.count, 0);
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/icons/clock.png')}
            style={styles.img}
          />
        </View>
        <View>
          <CustomText variant="h4" fontFamily={Fonts.SemiBold}>
            Delivery in 9 min
          </CustomText>
          <CustomText style={{opacity: 0.5}} variant="h8">
            Shiment of {totalItems || 0} items
          </CustomText>
        </View>
      </View>
      {cartItem.map((item) => (
        <OrderItem key={item._id} item={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
  },
  flexRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  imageContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 15,
  },
  img: {
    width: 30,
    height: 30,
  },
});

export default OrderList;

import {
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {FC, useState} from 'react';
import CustomHeader from '../../components/ui/CustomHeader';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors, Fonts} from '../../utils/Constants';
import OrderList from './OrderList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '../../components/ui/CustomText';
import {useCartStore} from '../../state/cartStore';
import BillDetails from './BillDetails';
import {useAuthStore} from '@state/authStore';
import ArrowButton from '../../components/ui/ArrowButton';
import {navigate} from '../../utils/NavigationUtils';
import {createOrder} from '../../services/OrderService';

const ProductOrder: FC = () => {
  const {getTotalPrice, cart, clearCart} = useCartStore();
  const {user, setCurrentOrder, currentOrder} = useAuthStore();
  const totalItemPrice = getTotalPrice();
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    // if (currentOrder != null) {
    //   Alert.alert('let your first order to be delivered');
    //   return;
    // }
    const formattedData = cart.map(item => ({
      id: item._id,
      item: item._id,
      count: item.count,
    }));
    if (formattedData.length == 0) {
      Alert.alert('Cart is empty');
      return;
    }
    setLoading(true);
    const response = await createOrder(formattedData, totalItemPrice);
    if (response !== null) {
      setCurrentOrder(response.order);
      clearCart();
      navigate('OrderSuccess', {...response.order});
    } else {
      Alert.alert('there was an error placing the order');
    }
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <CustomHeader title="Checkout" search={false} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <OrderList />
        <View style={styles.flexRowBetween}>
          <TouchableOpacity>
            <View style={styles.flexRow}>
              <Image
                source={require('../../assets/icons/coupon.png')}
                style={styles.img}
              />
              <CustomText variant="h6" fontFamily={Fonts.SemiBold}>
                Apply Coupon
              </CustomText>
            </View>
          </TouchableOpacity>
          <Icon name="arrow-right" size={RFValue(16)} color={Colors.text} />
        </View>
        <BillDetails totalItemPrice={totalItemPrice} />

        <View style={styles.flexRowBetweenPolicy}>
          <View>
            <CustomText
              variant="h7"
              fontFamily={Fonts.Medium}
              style={styles.text}>
              Canceletion Policy
            </CustomText>
            <CustomText
              variant="h9"
              style={styles.cancelText}
              fontFamily={Fonts.Medium}>
              Order can be cancelled within 15 minutes of placing the order in
              case of unexpected delay a refund will be provided,if applicable
            </CustomText>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View style={styles.absoluteContainer}>
          <View style={styles.addressContainer}>
            <View style={styles.flexRow}>
              <Image
                source={require('../../assets/icons/home.png')}
                style={{height: 25, width: 25, resizeMode: 'contain'}}
              />
              <View style={{width: '75%'}}>
                <CustomText
                  variant="h7"
                  fontFamily={Fonts.SemiBold}
                  style={styles.deliveryText}>
                  Delivering to Home
                </CustomText>
                <CustomText
                  variant="h7"
                  fontFamily={Fonts.Medium}
                  style={styles.addressText}>
                  {user?.address}
                </CustomText>
              </View>
            </View>
            <TouchableOpacity>
              <CustomText
                variant="h7"
                fontFamily={Fonts.Medium}
                style={{color: Colors.secondary}}>
                Change
              </CustomText>
            </TouchableOpacity>
          </View>

          <View style={styles.paymentGateway}>
            <View style={{width: '30%'}}>
              <CustomText
                variant="h7"
                fontFamily={Fonts.Regular}
                style={styles.text}>
                🎉 PAY USING
              </CustomText>
              <CustomText
                variant="h9"
                fontFamily={Fonts.Regular}
                style={{marginTop: 2}}>
                Cash on Delivery
              </CustomText>
            </View>

            <View style={{width: '60%'}}>
              <ArrowButton
                loading={loading}
                price={totalItemPrice}
                title="Place Order"
                onPress={async () => {
                  await handlePlaceOrder();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  absoluteContainer: {
    marginVertical: 15,
    marginBottom: Platform.OS === 'ios' ? 30 : 10,
  },
  buttonContainer: {
    backgroundColor: '#FFFFFF',
    padding: 9,
    borderRadius: 15,
    opacity: 0.9,

    shadowColor: '#980000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 0.7,
    borderBottomWidth: 0.7,
    borderBottomColor: Colors.secondary,
  },
  addressText: {
    color: '#AFABAB',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    paddingBottom: 250,
  },
  img: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  flexRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#C6D4EC',
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    color: Colors.secondary,
  },
  deliveryText: {
    color: '#404036',
  },
  cancelText: {
    color: Colors.text,
  },
  flexRowBetweenPolicy: {
    backgroundColor: '#E0F5E0',
    padding: 9,
    borderRadius: 15,
    marginTop: 10,
    opacity: 0.5,
  },
  paymentGateway: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 14,
    marginTop: 4,
  },
});

export default ProductOrder;

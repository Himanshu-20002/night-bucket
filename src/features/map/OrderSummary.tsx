import { View, StyleSheet, Image } from 'react-native'
import React, { FC, useMemo } from 'react'
import { Colors, Fonts } from '../../utils/Constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '../../components/ui/CustomText'
import BillDetails from '@features/order/BillDetails'
import { FadeIn } from 'react-native-reanimated'
import FastImage from 'react-native-fast-image'

interface OrderSummaryProps {
  order?: {
    orderId?: string;
    items?: Array<{
      item?: {
        name?: string;
        price?: number;
        quantity?: string;
        images?: string[];
      };
      count?: number;
    }>;
  };
}

const OrderSummary: FC<OrderSummaryProps> = ({ order }) => {
  const totalPrice = useMemo(() => 
    order?.items?.reduce((total: number, cartItem: any) => 
      total + ((cartItem?.count || 0) * (cartItem?.item?.price || 0)), 0
    ) || 0,
  [order?.items]);

  if (!order?.items?.length) {
    return null; // Or return a loading/error state
  }

  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.iconContainer}>
          <Icon name='shopping-outline' size={RFValue(20)} color={Colors.disabled} />
        </View>
        <View>
          <CustomText variant='h7' fontFamily={Fonts.SemiBold}>Order Summary</CustomText>
          <CustomText variant='h9' fontFamily={Fonts.Medium}>
            Order Id: #{order?.orderId || 'N/A'}
          </CustomText>
        </View>
      </View>
      {order?.items?.map((item, index) => {
        const imageUrl = item?.item?.images?.[0] || '';
        
        return (
          <View style={styles.flexRow} key={index}>
            <View style={styles.imageContainer}>
              {imageUrl ? (
                <FastImage 
                  source={{ uri: imageUrl }} 
                  style={styles.image}
                  // defaultSource={require('../../assets/images/placeholder.png')} // Add a placeholder image
                />
              ) : (
                <View style={styles.placeholderImage} />
              )}
            </View>
            <View style={{ width: '55%' }}>
              <CustomText variant='h7' fontFamily={Fonts.SemiBold}>
                {item?.item?.name || 'Unknown'} {item?.item?.quantity || ''}
              </CustomText>
              <CustomText variant='h9' fontFamily={Fonts.Medium}>
                {item?.count || 0} x ₹{item?.item?.price || 0}
              </CustomText>
            </View>
          </View>
        );
      })}
      <BillDetails totalItemPrice={totalPrice} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 15,
    marginVertical: 15,
    paddingVertical: 10,
    backgroundColor: '#fff'
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  },
  imageContainer: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: 15,
    backgroundColor: Colors.backgroundSecondary,
    padding: 2,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 15
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 15
  }
});

export default React.memo(OrderSummary);
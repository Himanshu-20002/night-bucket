import CustomText from '@components/ui/CustomText';
import UniversalAdd from '@components/ui/UniversalAdd'; // Ensure this is imported
import OrderItem from '@features/profile/OrderItem';
import {fetchCustomerOrders} from '@services/OrderService';
import {useAuthStore} from '@state/authStore';
import {Colors, Fonts} from '@utils/Constants';
import LottieView from 'lottie-react-native';
import React, {FC, useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, View, Text, Animated} from 'react-native';

const PreviousFlatlist: FC<{orders: any[]}> = ({orders}) => {
  console.log('rendering flashdeals flatlist');

  const renderItem = ({item}: {item: any}) => {
  
    
    return (
      <View
        style={{flexDirection: 'row', gap: 0.5, justifyContent: 'flex-start'}}>
       
        {item?.items.map((i: any, idx: number) => (
          <View
            key={idx}
            style={{
              backgroundColor: '#FFFFFF7C',
              borderRadius: 3,
              padding: 3,
              justifyContent: 'center',
            }}> 
            <Text
              style={{
                paddingLeft: 8,
                paddingTop: 9,
                paddingHorizontal: 10,
                fontFamily: Fonts.Medium,
                fontSize: 10,
                color: Colors.secondary,
              }}>
              {i.item ? i.item.name.slice(0, 20) : 'Item not available'}
            </Text>
            <Image source={{uri: i.item.images[0]}} style={styles.orderItemImage} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingTop: 5,
                paddingBottom: 5,
                paddingHorizontal: 3,
                paddingRight: 10,
              }}>
              <Animated.View>
                <LottieView
                  autoPlay={true}
                  enableMergePathsAndroidForKitKatAndAbove={true}
                  loop={true}
                  source={require('../../../assets/animations/expAnimation/star2.json')}
                  style={styles.star}
                />
              </Animated.View>
              <UniversalAdd item={i.item} />
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={{zIndex: 1000}}>
      <FlatList
        horizontal={true}
        data={orders}
        renderItem={renderItem}
        keyExtractor={item => item?.orderId?.toString()}
        contentContainerStyle={styles.scrollViewContent}
        removeClippedSubviews={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  star: {
    marginTop: 4,
    width: 20,
    height: 20,
    transform: [{rotate: '90deg'}, {scale: 1.2}, {scaleX: -1}],
  },
  scrollViewContent: {
    padding: 0,
    paddingTop: 2,
    paddingBottom: 0,
  },
  orderItemContainer: {
    borderWidth: 0.7,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 1,
    flexDirection: 'row',
  },
  orderItemImage: {
    width: '100%',
    height: 100,
    borderRadius: 4,
    marginTop: 4,
    resizeMode: 'contain',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default PreviousFlatlist;

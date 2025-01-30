import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {productsList} from '@utils/dummyData';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import GreenUniversalAdd from '@components/ui/GreenUniversalAdd';
import { getProductsByCategoryId } from '@services/ProductService';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const FULL_WIDTH = screenWidth;

interface FlashListProps {

}
const FlashDealsFlatlist: React.FC<FlashListProps> = ({

}) => {
  const [products, setProducts] = useState<any[]>([]);
  
  const fetchProducts = useCallback(async(categoryId: string)=> {
    try {
      const response = await getProductsByCategoryId (categoryId);
      setProducts((response.slice(0, 8)));
    } catch (error) {
      console.log('Error fetching Products', error);
    }
  },[]);
  useEffect(() => {
    fetchProducts("6741c69799ee3a4b31a42a22");
  }, []);


  const renderItem = ({item, index}: any) => {
    return (
      <View>
        <Image
          source={{uri: item.backgroundImage}}
          resizeMode="cover"
          style={styles.productBackgroundImage}
        />

        <View style={styles.featuredProductContainer}>
          <View
            style={[
              StyleSheet.absoluteFillObject,
              {
                backgroundColor: 'rgba(236 236 236 / 0.8)',
                borderRadius: 13,
              },
            ]}
          />
          <Image
            source={require('@assets/images/back.png')}
            style={{
              width: '100%',
              height: 140,
              zIndex: 0,
              resizeMode: 'contain',
            }}
          />
          <View style={styles.featuredProductTextContainer}>
            <CustomText
              variant="h7"
              fontFamily={Fonts.Regular}
              style={styles.rupee}>
              ₹
            </CustomText>
            <CustomText
              variant="h4"
              fontFamily={Fonts.Bold}
              style={styles.priceText}>
              {item.price}/
            </CustomText>
            <CustomText
              variant="h9"
              fontFamily={Fonts.Bold}
              style={styles.priceText}>
              {item.quantity}
            </CustomText>
          </View>
          <CustomText
            variant="h9"
            fontFamily={Fonts.Bold}
            style={styles.titleText}>
            {item.name}
          </CustomText>
          <Image
            source={{uri: item.images[0]}}
            resizeMode="contain"
            style={styles.productImage}
          />
          <View
            style={{position: 'absolute', top: 110, zIndex: 1000, right: 4}}>
            <GreenUniversalAdd item={item} />
          </View>
        </View>
      </View>
    );
  };

  return (
    // onCategoryChange('6741c69799ee3a4b31a42a22')
    <View>
      <FlatList
        keyExtractor={item => item._id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={products}
        renderItem={renderItem}
        snapToInterval={FULL_WIDTH - 28}
        decelerationRate="fast"
        style={styles.touchableContainer2}
        contentContainerStyle={{
          gap: 10,
          zIndex: 1,
          paddingBottom: 0,
          marginLeft: 6,
        }}
        removeClippedSubviews={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rupee: {
    color: 'white',
    marginBottom: 6,
  },
  priceText: {
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: 'whitesmoke',
    position: 'absolute',
    top: 35,
    left: 25,
    right: 0,
    bottom: 0,
  },
  touchableContainer2: {
    width: '100%',
    height: 145,
    zIndex: 1,
    overflow: 'hidden',
    marginRight: 1,
  },
  touchableContainer: {
    width: '100%',
    height: 150,
    zIndex: 1,
    backgroundColor: 'orangered',
    borderRadius: 9,
    overflow: 'hidden',
    position: 'absolute',
    top: 350,
    left: 0,
    right: 0,
    bottom: 0,
    marginRight: 100,
  },
  featuredProductTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderBottomEndRadius: 13,
    borderBottomStartRadius: 13,
    alignItems: 'center',
    gap: 0,
    zIndex: 1,
    position: 'absolute',
    width: 90,
    height: 30,
    top: 0,
    left: 14,
    right: 0,
    bottom: 0,
  },
  featuredProductContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 123,
    height: 145,
    zIndex: 1,
    gap: 10,

    // backgroundColor: 'limegreen',
  },
  productImage: {
    width: 90,
    height: 90,
    zIndex: 1,
    position: 'absolute',
    top: 53,
    left: 0,
    right: 0,
    bottom: 0,
  },
  productBackgroundImage: {
    width: '100%',
    height: 130,
    borderRadius: 13,
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // opacity:0.9
  },
});
export default FlashDealsFlatlist;

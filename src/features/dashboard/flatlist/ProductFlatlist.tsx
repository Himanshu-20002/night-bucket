import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import GreenUniversalAdd from '@components/ui/GreenUniversalAdd';

interface ProductFlatlistProps {
  products: any[];
  categoryId: string;
  onCategoryChange: (categoryId: string) => void;
}

const ProductFlatlist: React.FC<ProductFlatlistProps> = ({
  products,
  categoryId,
  onCategoryChange,
}) => {
  useEffect(() => {
    onCategoryChange('6740e58eafaba47dc6654457');
  }, [onCategoryChange]);

  const renderItem = useCallback(({ item }) => (
    <ProductItem item={item} />
  ), []);

  const keyExtractor = useCallback(item => item._id.toString(), []);
  return (
    <View style={styles.mainContainer}>
      <FlashList
        data={products}
        horizontal
        estimatedItemSize={115}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        getItemLayout={(data, index) => (
          { length: 130, offset: 130 * index, index }
        )}
      />
    </View>
  );
};

const ProductItem = React.memo(({ item }) => (
  <View style={styles.itemContainer}>
    <View style={styles.imageContainer}>
      <FastImage
        source={{ uri: item.images[0] }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
    <GreenUniversalAdd item={item} />
  </View>
));
const styles = StyleSheet.create({
  mainContainer: {
    padding: 0,
    height: 146,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 26,
  },
  itemContainer: {
    backgroundColor: '#EDECEDDC',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 115,
    height: 130,
    marginBottom: 20,
    marginLeft: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  imageContainer: {
    width: 109,
    height: 109,
    borderRadius: 10,
    padding: 3,
    backgroundColor: 'thistle',
    marginTop: 13,
  },
});
      
export default ProductFlatlist;

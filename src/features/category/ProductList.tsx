import { StyleSheet, FlatList } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '../../utils/Constants'
import ProductItem from './ProductItem'
const ProductList:FC<{data:any}> = ({data}) => {


  const renderItem = ({item,index}:any) => {
    return (
      <ProductItem item={item} index={index}/>
      
    )
    

    
}

//- **Source:** The `renderItem` function is defined in your `ProductList` component. It takes an object with `item` and `index` properties and returns a `ProductItem` component for each product.
  
  
    return (
    <FlatList
    data={data}
    keyExtractor={(item) => item._id.toString()}
    renderItem={renderItem}
    contentContainerStyle={styles.content}
    style={styles.container}
    numColumns={2}
    extraData={data}
    removeClippedSubviews={false}
    />
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  content:{
    paddingHorizontal: 1,
    paddingVertical: 10,
  }
});

export default ProductList
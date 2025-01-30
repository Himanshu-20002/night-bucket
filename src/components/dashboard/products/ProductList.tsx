import { FlatList, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import CustomText from '../../ui/CustomText'
import { Fonts } from '../../../utils/Constants'
import ProductItem from '@features/category/ProductItem'
import { FlashList } from '@shopify/flash-list'
import FeaturedProductList from './FeaturedProductList'


const ProductList:FC<{data:any}> = ({data}) => {
    const renderItem = ({item,index}:{item:any,index:number})=>{
        return <FeaturedProductList item={item} key={index} index={index}/>
    }
  return (
        <FlashList
        data={data}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={(item)=>item._id}
        estimatedItemSize={160}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.listContent}
        overScrollMode="never"
        bounces={true}
        />
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
    },
    listContent: {
        paddingBottom: 0,
    }
});

export default ProductList
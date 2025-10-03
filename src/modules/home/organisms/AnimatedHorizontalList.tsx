import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { FONTS, screenWidth } from '@utils/Constants'
import { FlatList, } from 'react-native-gesture-handler'
import { navigate } from '@navigation/NavigationUtil'
import img from '../../../assets/icons/grocery.png'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { getProductsByCategory } from '@modules/products/api/getProducts'

const AnimatedHorizontalList: FC<{ data: any }> = ({ data }) => {
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    const data = await getProductsByCategory("67af315c4ff2ce42941e9fa4")
    setProducts(data)
  }
  useEffect(() => {


    fetchProducts()



  }, [])

  return (
    <View style={styles.container}>
      <Image source={img} style={styles.img} />

      <Text style={{ fontWeight: '800', color: '#ffff' }}>bucket combo</Text>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>at 99</Text>
        <Icon name="cart-plus" size={RFValue(22)} color="white" />
      </View>
      <FlatList
      data={data?.data}
      keyExtractor={(item)=>item.id}
      horizontal
      renderItem={({item,index})=>(
        <Pressable style={styles.imgContainer} key={index} onPress={()=>navigate('Categories')}>
          <Image source={{uri:item.image_uri}} style={styles.img}/>

        </Pressable>
        
        

      )}
      showsHorizontalScrollIndicator={false}
      />
      {/* <TouchableOpacity key={index} onPress={() => navigate('Product', {
        id: item._id,
        name: item.name
      })} style={styles.itemContainer}>
        <Image source={{ uri: item.image_uri }} style={styles.img} />
        <Text style={styles.name}>{item.name}</Text>



      </TouchableOpacity> */}

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 13,
    backgroundColor: '#fd2121ff',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // height:screenWidth*0.6

  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15
  },
  textStyle: {
    fontFamily: FONTS.heading,
    fontSize: RFValue(14),
    color: '#ffff',
    fontWeight: '700',
    marginVertical: 5, // Reduced from 17 to give tighter spacing
  },
  img: {
    width: '30%',
    height: 'auto',
    aspectRatio: 1,
    resizeMode: 'contain'

  },
  imgContainer: {
    width: screenWidth * 0.45,
    height: screenWidth * 0.6,
    marginRight: 14
  }
})

export default AnimatedHorizontalList
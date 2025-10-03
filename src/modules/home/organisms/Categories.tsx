import { View, Text, ScrollView, StyleSheet, FlatList, Pressable, Image } from 'react-native'
import React, { FC } from 'react'
import { navigate } from '@navigation/NavigationUtil'
import { screenWidth } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'

const Categories:FC<{data:any}> = ({data}) => {
 const renderItem =({item}:{item:any})=>{
    return(
        <Pressable onPress={()=>navigate('Category')} style={styles.itemContainer}>
            <Image source={{uri:item?.image_uri}} style={styles.img}/>
            <Text style={styles.nameText}>{item?.name}</Text>

        </Pressable>
        
    )
 }

 
 return (
     <>
     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
         <FlatList
         numColumns={Math.ceil(data.data.length/2)}
         data={data.data}
         scrollEnabled={false}
         keyExtractor={(item,index)=>index.toString()}
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={styles.listContainer}
         style={styles.listContentContainer}
         renderItem={renderItem}
         />
         </ScrollView>

  
    </>
  )
}

const styles = StyleSheet.create({

  listContainer:{
    paddingHorizontal:19,
    justifyContent:'center',
    alignItems:'center',
  },
  listContentContainer:{
    marginHorizontal:15,
    marginVertical:10,
  },
  itemContainer:{
    marginRight:15,
    width:screenWidth * 0.2,
    height:screenWidth * 0.2,
    borderRadius:10,
    overflow:'hidden',
    // justifyContent:'center',
    // alignItems:'center',
    marginLeft:6,
  },
  img:{
    width:screenWidth * 0.12,
    height:screenWidth * 0.12,
    borderRadius:10,
    resizeMode:'cover'
  },
  nameText:{
    fontSize:RFValue(12),
    fontWeight:'bold',
    textAlign:'center',
    marginTop:5,
  }
    
})

export default Categories
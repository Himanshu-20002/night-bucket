import { View, Text, SafeAreaView, StyleSheet, Pressable } from 'react-native'
import React, {FC} from 'react'
import CustomText from './CustomText'
import { Colors, Fonts } from '../../utils/Constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {goBack} from '../../utils/NavigationUtils'
import { RFValue } from 'react-native-responsive-fontsize';

const CustomHeader:FC<{title:string; search:boolean}> =({title,search}) => {

  return (
   <SafeAreaView>
        <View style={styles.flexRow}>
         <Pressable onPress={()=>goBack()}>
          <Icon name='arrow-left' size={RFValue(16)} color={Colors.text}/>
         </Pressable>
          <CustomText variant='h5' fontFamily={Fonts.SemiBold}>{title}</CustomText>
          <View>
            {search && <Icon name='magnify' size={RFValue(16)} color={Colors.text}/>}
          </View>
        </View>
   </SafeAreaView>
  )
}
const styles=StyleSheet.create({
  container:{
    padding:20,
    backgroundColor:'#fff'
  },
  flexRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:10,
    height:50,
    backgroundColor:'#fff',
    borderBottomWidth:0.6,
    borderBottomColor:Colors.border,
  },
  text:{
   textAlign:'center'
  }
})
export default CustomHeader
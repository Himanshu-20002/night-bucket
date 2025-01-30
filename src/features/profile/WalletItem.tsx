import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts } from '../../utils/Constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomText from '../../components/ui/CustomText'
import { RFValue } from 'react-native-responsive-fontsize'
const WalletItem:FC<{icon:string,label:string}> = ({icon,label}) => {
  return (
    <View style={styles.walletItemContainer}>
  <Icon name={icon} size={RFValue(20)} color={Colors.text}/>
  <CustomText fontFamily={Fonts.Medium} variant='h8' style={styles.walletItemText}>{label}</CustomText>
    </View>
  )
}
const styles = StyleSheet.create({
    walletItemContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    walletItemText:{
        marginLeft:10,
    }
})
export default WalletItem
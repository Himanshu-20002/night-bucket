import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '../../utils/Constants'
import WalletItem from './WalletItem'
const WalletSection = () => {
  return (
    <View style={styles.walletContainer}>
     <WalletItem icon='wallet-outline' label='Wallet'/>
     <WalletItem icon='chat-processing' label='Support'/>
     <WalletItem icon='credit-card-outline' label='Payments'/>

    </View>
  )
}
const styles = StyleSheet.create({
    walletContainer:{
      justifyContent:'space-between',
      flexDirection:'row',
      padding:15,
      alignItems:'center',
      backgroundColor:'#E0E0E0',
      paddingVertical:19,
      borderRadius:15,
      marginVertical:20,
    },
    walletText:{
      color:Colors.primary,
      fontFamily:Fonts.Bold,
      fontSize:16
    }
})

export default WalletSection
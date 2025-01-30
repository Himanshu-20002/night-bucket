import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts } from '../../utils/Constants'
import CustomText from '../../components/ui/CustomText'
interface TabBarProps{  
    selectedTab: 'available' | 'delivered',
    onTabChange: (tab: 'available' | 'delivered') => void
}
const TabBar:FC<TabBarProps> = ({selectedTab, onTabChange}) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity activeOpacity={0.8} style={[styles.tab,selectedTab === 'available' && styles.activeTab]}  onPress={()=>onTabChange('available')}>

       <CustomText fontFamily={Fonts.SemiBold} variant='h8'
        style={[styles.tabText,selectedTab === 'available' ? styles.activeTabText : styles.inactiveTabText]}>Available</CustomText>  
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8} style={[styles.tab,selectedTab != 'available' && styles.activeTab]}  onPress={()=>onTabChange('delivered')}>

      <CustomText fontFamily={Fonts.SemiBold} variant='h8'
       style={[styles.tabText,selectedTab != 'available' ? styles.activeTabText : styles.inactiveTabText]}>Delivered</CustomText>  
       </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    tabContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        padding:10,
        marginBottom:10
    },
    tab:{
        paddingVertical:10,
        borderRadius:25,
        width:'38%',
        margin:10,
        alignItems:'center',
        borderWidth:2,
         borderColor:Colors.border,
    },
    activeTab:{
        backgroundColor:Colors.secondary,
        borderColor:Colors.secondary
    },
    tabText:{
        color:Colors.text,
    },
    activeTabText:{
        color:'white'
    },
    inactiveTabText:{
        color:Colors.disabled
    }
})

export default TabBar
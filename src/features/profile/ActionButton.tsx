import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts } from '../../utils/Constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomText from '../../components/ui/CustomText'
import { RFValue } from 'react-native-responsive-fontsize'



interface ActionButtonProps{
    icon:string;
    label:string;
    onPress?:()=>void;
}
const ActionButton:FC<ActionButtonProps> = ({icon,label,onPress}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
        <View style={styles.iconContainer}>
            <Icon name={icon} size={RFValue(14)} color={Colors.text}/>
        </View>
        <CustomText fontFamily={Fonts.Medium} variant='h7'>{label}</CustomText>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    actionButtonContainer:{
        flexDirection:'row',
        alignItems:'center',
    }
    ,btn:{
        alignItems:'center',
        flexDirection:'row',
     marginVertical:10,
        gap:10,
    },
    iconContainer:{
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:100,
        backgroundColor:'#fff',
    },
    label:{
        color:Colors.text,
        justifyContent:'flex-start',
        flex:1,
    }
})

export default ActionButton
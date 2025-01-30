import {FC} from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import CustomText from './CustomText';
import {Colors} from '../../utils/Constants';
import React from 'react';
import {Fonts} from '../../utils/Constants';

interface CustomButtonProps {
    title: string;
    onPress: ()=>void;
    disabled?: boolean;
    loading?: boolean;
    backgroundColor?: string;
}
const CustomButton: FC<CustomButtonProps> = ({title, onPress, disabled, loading,  backgroundColor,}) => {
    return (
     <TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.btn,{backgroundColor: disabled ? Colors.disabled  : backgroundColor || Colors.secondary}]} activeOpacity={0.8} >
        {loading ? <ActivityIndicator color="white" size="small"/> : <CustomText variant='h6' fontFamily={Fonts.SemiBold} style={styles.text} numberOfLines={1}>{title}</CustomText>}
     </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    btn:{
        justifyContent: 'center',
        alignItems: 'center',
        padding:14,
        borderRadius: 90,
        marginVertical: 15,
        width: '95%',

    },
    text:{
        color:'#fff'
        
    }
})
export default CustomButton;

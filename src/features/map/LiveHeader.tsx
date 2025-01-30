import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts } from '../../utils/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { goBack, navigate } from '../../utils/NavigationUtils';
import { useAuthStore } from '@state/authStore'
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '../../components/ui/CustomText';

const LiveHeader:FC<{type:'Coustomer'|'Delivery';
    title:string, 
    secondaryTitle:string}> = ({type, title, secondaryTitle}) => {

        const isCustomer= type==='Coustomer'
        const {currentOrder,setCurrentOrder}= useAuthStore()
  return (
    <SafeAreaView>
        <View style={styles.container}>
            <Pressable style={styles.backButton} onPress={()=>{
                if(isCustomer){
                    navigate('ProductDashboard')
                    if(currentOrder?.status==='delivered'){
                        setCurrentOrder(null)
                    }
                    return
                }
                navigate('DeliveryDashboard')
            }}>
                <Icon name='arrow-left' size={RFValue(19)} color={isCustomer? 'limegreen' : 'white'} />
            </Pressable>
            <CustomText style={isCustomer? styles.titleTextBlack : styles.titleTextWhite} variant='h8' fontFamily={Fonts.SemiBold} numberOfLines={1}>{title}</CustomText>
            <CustomText style={isCustomer? styles.titleTextWhite : styles.titleTextWhite} variant='h5' fontFamily={Fonts.SemiBold} numberOfLines={1}>{secondaryTitle}</CustomText>
        </View>
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:10
    },
    backButton:{
        position:'absolute',
        left:20,
       

    },
    titleTextBlack:{
        color:'limegreen'
    },
    titleTextWhite:{
        color:'white'
    }

})

export default LiveHeader
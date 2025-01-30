import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts } from '../../utils/Constants'
import { useAuthStore } from '@state/authStore'
import CustomText from '../ui/CustomText'
import { resetAndNavigate } from '@utils/NavigationUtils'
import { storage, tokenStorage } from '@state/storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'



interface DeliveryHeaderProps{
    name:string,
    email:string
}
const DeliveryHeader:FC<DeliveryHeaderProps> = ({name,email}) => {
    const {logout} = useAuthStore()
  return (
    <View style={styles.flexRow}>
        <View style={styles.ImageContainer}>
           <Image source={require('../../assets/images/delivery_boy.png')} style={styles.img}/>
        </View>
        <View style={styles.infoContainer}>
            <CustomText variant='h4' fontFamily={Fonts.SemiBold} >Hello {name}!</CustomText>
            <CustomText variant='h8' fontFamily={Fonts.Medium} >{email}</CustomText>
        </View>
        <TouchableOpacity onPress={()=>{
            resetAndNavigate('CustomerLogin')
            logout(),
            tokenStorage.clearAll(),
            storage.clearAll()
        }}>
            <Icon name='logout' size={30} color='black'/>
        </TouchableOpacity>
      
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        padding:6
    },
    flexRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:10,
    },
    ImageContainer:{
        backgroundColor:Colors.backgroundSecondary,
        padding:4,
        width:60,
        height:60,
        overflow:'hidden',
        borderRadius:100
    },
    img:{
        width:'100%',
        bottom:-8,
        height:'100%',
        resizeMode:'contain'
    },
    infoContainer:{
    width:'70%'
    }
})

export default DeliveryHeader
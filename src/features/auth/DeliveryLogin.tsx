import { View, Text, Alert, StyleSheet } from 'react-native'
import React, { FC, useState } from 'react'
import { deliveryLogin} from '../../services/authService';
import { resetAndNavigate } from '../../utils/NavigationUtils';
import { ScrollView } from 'react-native-gesture-handler';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import { screenHeight } from '../../utils/Scaling';
import LottieView from 'lottie-react-native';
import CustomInput from '@components/ui/CustomInput';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '../../utils/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomButton from '@components/ui/CustomButton';
const DeliveryLogin:FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
   
  const handleLogin = async () => {
    setLoading(true);
    try {
    await deliveryLogin(email, password);
    resetAndNavigate('DeliveryDashboard');
    console.log('i am delivery login');
    } catch (error) {
      Alert.alert('Error', 'Invalid email or password');
    }finally{
      setLoading(false);
    }
  };
  return (
<CustomSafeAreaView>
  <ScrollView keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag'>
    <View style={styles.container}>
     <View style={styles.lottieContainer}>
      <LottieView source={require('../../assets/animations/delivery_man.json')} autoPlay loop style={styles.lottie}/>
     </View>
     <CustomText variant='h3' fontFamily={Fonts.Bold}>
      Delivery Partner Portal
     </CustomText>
     <CustomText variant='h6' fontFamily={Fonts.Bold} style={styles.text}>
      Faster than Flash
     </CustomText>
     <CustomInput
     value={email}
     onChangeText={(text) => setEmail(text)}
     placeholder='Email'
     left={<Icon name='email-outline' size={20} color='#F8890E' style={{marginLeft:10}} size={RFValue(18)}/>}
     inputMode='email'
     right={false}
     />
     <CustomInput
     value={password}
     onChangeText={(text) => setPassword(text)}
     placeholder='Password'
     secureTextEntry
     left={<Icon name='key-outline' size={20} color='#F8890E' style={{marginLeft:10}} size={RFValue(18)}/>}
     />
     <CustomButton
     disabled={email.length === 0 || password.length <8}
     onPress={handleLogin}
     loading={loading}
     title='Login'
     />
    </View>
  </ScrollView>
</CustomSafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:20,
  },
  lottie:{
    width:'100%',
    height:'100%',
  },lottieContainer:{
    width:'100%',
    height:screenHeight*0.12,
  },text:{
    marginTop:2,
    marginBottom:25,
    opacity:0.8,
  }
});

export default DeliveryLogin
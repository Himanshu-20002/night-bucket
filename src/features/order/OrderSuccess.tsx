import {View, StyleSheet} from 'react-native';
import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import CustomText from '../../components/ui/CustomText';
import {screenHeight} from '@utils/Scaling';
import { Colors, Fonts } from '../../utils/Constants';
import { useAuthStore } from '@state/authStore';
import { replace } from '@utils/NavigationUtils';

const OrderSuccess = () => {
    const {user}= useAuthStore()
    useEffect(() => {
       const timeout= setTimeout(() => {
        replace('LiveTracking')
       }, 3000)
       return () => clearTimeout(timeout)
    }, []);
  return (
    <View style={styles.container}>
      <View style={styles.lottieContainer}>
        <LottieView
          source={require('../../assets/animations/confirm.json')}
          autoPlay
          speed={1}
          enableMergePathsAndroidForKitKatAndAbove={true}
          hardwareAccelerationAndroid={true}
          duration={2000}
        //   loop={false}
          style={{width: 200, height: 200}}
        />
        <CustomText variant='h8' fontFamily={Fonts.SemiBold} style={styles.text}>ORDER PLACED</CustomText>
      </View>
      <LottieView
        source={require('../../assets/confettiFullscreen.json')}
        autoPlay
        loop
        style={styles.confetti}
        enableMergePathsAndroidForKitKatAndAbove={true}
        hardwareAccelerationAndroid={true}
      />
      <View style={styles.deliveryContainer}>
        <CustomText variant="h4" fontFamily={Fonts.SemiBold} style={styles.deliveryText}>Delivery to Home</CustomText>
      </View>
      <CustomText variant='h7' fontFamily={Fonts.SemiBold} style={styles.addressText}>{user?.address || 'No address found'}</CustomText>
      <CustomText variant='h8' fontFamily={Fonts.SemiBold} style={styles.delivery2Text}>Your order will be delivered to your home within 30 minutes</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieContainer: {
    width: 200,
    height: 200,
    zIndex: 1,
  },

  lottie: {
    width: 200,
    height: 200,
  },
  textContainer: {
    marginTop: 20,
  },
  text: {
    marginTop: 2,
    textAlign: 'center',
    marginBottom: 10,
    color: '#B4B4B4',
  },
  deliveryContainer: {
    marginTop: 15,
    borderBottomWidth: 2,
    paddingBottom: 4,
    marginBottom: 5,
    borderColor: Colors.secondary,
  },
  addressText: {
    marginTop: 15,
    textAlign: 'center',
    opacity: 0.8,
    width: '80%',
    lineHeight: 20,
    color: '#34AB6F',
  },
  deliveryText: {
    textAlign: 'center',
    marginTop: 15,
    borderColor: Colors.secondary,

  },
  delivery2Text: {
    position: 'absolute',
    bottom: 19,
    textAlign: 'center',
    color: '#B4B4B4',
  },
  confetti: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: screenHeight * 0.5,
    transform: [{scaleX: 1}],
    zIndex: -1, // Ensure this is behind
  },
});

export default OrderSuccess;

// its call waiting api page

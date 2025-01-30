import {GestureHandlerRootView, State} from 'react-native-gesture-handler';
import React, {FC, useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Animated, SafeAreaView, Keyboard, Alert} from 'react-native';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {resetAndNavigate} from '../../utils/NavigationUtils';
import {Image} from 'react-native';
import CustomText from '@components/ui/CustomText';
import {Colors, Fonts, lightColors} from '../../utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import useKeyboardOffsetHeight from '../../utils/useKeyboardOffsetHeight';
import CustomButton from '@components/ui/CustomButton';
import {RFValue} from 'react-native-responsive-fontsize';
import { customerLogin } from '@services/authService';
import LinearGradient from 'react-native-linear-gradient';

const bottomColors = [...lightColors].reverse();
const CustomerLogin: FC = () => {
  const [gestureSequence, setGestureSequence] = useState<any[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const keyboardOffsetHeight = useKeyboardOffsetHeight();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (keyboardOffsetHeight == 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.84,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [keyboardOffsetHeight]);
  console.log(keyboardOffsetHeight);

  const handleLogin = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const loginSuccess = await customerLogin(phoneNumber);
      if (loginSuccess) {
        resetAndNavigate('ProductDashboard');
      }
    } catch (error) {
      Alert.alert('Error', 'Sorry, we could not log you in');
    }
    setLoading(false);
  };

  const handleGesture = ({nativeEvent}: any) => {
    if (nativeEvent.state === State.END) {
      const {translationX, translationY} = nativeEvent;
      let direction = '';
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        direction = translationY > 0 ? 'down' : 'up';
      }
      console.log(translationX, translationY, direction);
      const newSequence = [...gestureSequence, direction].slice(-5);
      setGestureSequence(newSequence);
      if (newSequence.join(' ') === 'up up down left right') {
        setGestureSequence([]);
        resetAndNavigate('DeliveryLogin');
      }
    }
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <CustomSafeAreaView>
          <ProductSlider />
          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <Animated.ScrollView
              bounces={false}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.subContainer}
              style={{transform: [{translateY: animatedValue}],}}>
                <LinearGradient colors={bottomColors} style={styles.gradient}/>
              <View style={styles.content}>
                <Image
                  source={require('../../assets/images/logo.png')}
                  style={styles.logo}
                />
                <CustomText variant="h2" fontFamily={Fonts.Bold}>
                  India's last minute app
                </CustomText>
                <CustomText
                  variant="h5"
                  fontFamily={Fonts.SemiBold}
                  style={styles.text}>
                  Log in or sign up
                </CustomText>
                <CustomInput
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChangeText={text => setPhoneNumber(text.slice(0, 10))}
                  onClear={() => setPhoneNumber('')}
                  left={
                    <CustomText
                      style={styles.phoneText}
                      variant="h5"
                      fontFamily={Fonts.SemiBold}>
                      +91
                    </CustomText>
                  }
                  inputMode="numeric"
                />
                <CustomButton
                  disabled={phoneNumber.length !== 10}
                  onPress={() => handleLogin()}
                  loading={loading}
                  title="Continue"
                />
              </View>
            </Animated.ScrollView>
          </PanGestureHandler>
        </CustomSafeAreaView>
        <View style={styles.footer}>
          <SafeAreaView>
            <CustomText fontSize={RFValue(6)}>
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </CustomText>
          </SafeAreaView>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,

  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginVertical: 5,
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
  phoneText: {
    marginRight: 2,
    marginLeft: 10, // Add left margin for spacing
    color: Colors.text,
    fontFamily: Fonts.SemiBold,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#f8f9fc',
    padding: 10,
    borderTopWidth: 0.8,
    borderColor: Colors.border,
    zIndex: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    width: '100%',
    paddingTop: 60,
  },
});
export default CustomerLogin;




// CustomerLogin Component
// ├── Imports
// │   ├── Gesture Handling
// │   ├── React and Hooks
// │   ├── React Native Components
// │   ├── Custom Components
// │   ├── Utilities
// │   └── Services
// ├── State Variables
// │   ├── gestureSequence (stores gesture inputs)
// │   ├── phoneNumber (stores user input)
// │   └── loading (indicates loading state)
// ├── Keyboard Offset Handling
// │   ├── Adjusts form position based on keyboard visibility
// │   └── Animates the form's position
// ├── Login Handling
// │   ├── Dismisses keyboard
// │   ├── Calls customerLogin service
// │   ├── Navigates to ProductDashboard on success
// │   └── Displays error alert on failure
// ├── Gesture Handling
// │   ├── Detects gesture direction
// │   ├── Updates gesture sequence
// │   └── Navigates to DeliveryLogin on specific sequence
// ├── Rendering
// │   ├── GestureHandlerRootView
// │   ├── ProductSlider
// │   ├── PanGestureHandler
// │   ├── Animated.ScrollView
// │   ├── CustomInput for phone number
// │   ├── CustomButton for login
// │   └── Footer with terms of service
// └── Styles
//     ├── Container styles
//     ├── Sub-container styles
//     ├── Content styles
//     ├── Logo styles
//     ├── Text styles
//     ├── Footer styles
//     └── Gradient styles
import {View, StyleSheet, Alert, Dimensions} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Colors} from '../../utils/Constants';
import Geolocation from '@react-native-community/geolocation';
import {useAuthStore} from '@state/authStore';
import {storage, tokenStorage} from '../../state/storage';
import {jwtDecode} from 'jwt-decode';
import {refresh_token, refetchUser} from '../../services/authService';
import {resetAndNavigate} from '../../utils/NavigationUtils';
import Rive, { RiveRef} from 'rive-react-native';



Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

interface DecodedToken {
  exp: number;
}
const SplashScreen = () => {
  const {user, setUser} = useAuthStore();
  const riveRef = useRef<RiveRef>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString('accessToken') as string;
    const refreshToken = tokenStorage.getString('refreshToken') as string;
    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);
      const currentTime = Date.now() / 1000;
      if (decodedRefreshToken?.exp < currentTime) {
        resetAndNavigate('CustomerLogin');
        Alert.alert(
          'Session Expired',
          'Your session has expired. Please log in again.',
        );
        return false;
      }
      if (decodedAccessToken?.exp < currentTime) {
        try {
          await refresh_token();
          await refetchUser(setUser);
        } catch (error) {
          Alert.alert('Error', 'Failed to refresh token');
          return false;
        }
      }
      const updatedUser = useAuthStore.getState().user;
      if (updatedUser?.role === 'customer') {
        resetAndNavigate('ProductDashboard');
      } else {
        resetAndNavigate('DeliveryDashboard');
      }
      return true;
    }
    resetAndNavigate('CustomerLogin');
    return false;
  };

  useEffect(() => {
    const loadUserData = async () => {
      const storedUser = tokenStorage.getString('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Set the user in Zustand store
        console.log('User loaded from storage:', JSON.parse(storedUser)); // Debugging log
      } else {
        console.log('No user found in storage');
      }
    };

    loadUserData();
  }, [setUser]);

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        Geolocation.requestAuthorization();
       await  tokenCheck();
      } catch (error) {
        Alert.alert('Error', 'Sorry, we could not get your location');
      }
    };
    const timeoutId = setTimeout(fetchUserLocation, 2000);
    return () => clearTimeout(timeoutId);
  }, []);
  


  const handleAnimationComplete = () => {
    console.log("animation finished");
    setIsAnimationComplete(true);
  };


  return (
    <View style={styles.container}>
        <View style={styles.animationWrapper}>
        <Rive
          ref={riveRef}
          resourceName="nightbucket"
          style={styles.animation}
          autoplay={!isAnimationComplete}
          // onLoopEnd={handleAnimationComplete}
        />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:"blue",
    flex: 1,
    width: '100%',
    height: '100%',
  },
  animationWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default SplashScreen;

// SplashScreen Component
// ├── Imports
// │   ├── React Native Components
// │   ├── Utilities (Colors, Scaling)
// │   ├── Geolocation
// │   ├── Zustand Store (useAuthStore)
// │   ├── Token Storage
// │   ├── JWT Decode
// │   ├── Auth Service (refresh_token, refetchUser)
// │   └── Navigation Utility (resetAndNavigate)
// ├── Geolocation Configuration
// │   ├── Request permissions
// │   ├── Enable background updates
// │   └── Set location provider
// ├── Token Check Function
// │   ├── Purpose: Validate tokens
// │   ├── Functionality:
// │   │   ├── Decode tokens
// │   │   ├── Check expiration
// │   │   ├── Refresh token if expired
// │   │   └── Navigate based on user role
// ├── Load User Data
// │   ├── Purpose: Retrieve user data from storage
// │   ├── Functionality:
// │   │   ├── Set user in Zustand store
// │   │   └── Log user loading status
// ├── Fetch User Location
// │   ├── Purpose: Request location permissions
// │   ├── Functionality:
// │   │   ├── Call tokenCheck
// │   │   └── Handle errors
// └── Rendering
//     ├── Display splash logo
//     └── Style container

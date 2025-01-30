import {View, StyleSheet, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {Colors} from '../../utils/Constants';
import logo from '@assets/images/splash_logo.jpeg';
import {screenHeight, screenWidth} from '../../utils/Scaling';
import Geolocation from '@react-native-community/geolocation';
import {useAuthStore} from '../../state/authStore';
import {storage, tokenStorage} from '../../state/storage';
import {jwtDecode} from 'jwt-decode';
import {refresh_token, refetchUser} from '../../services/authService';
import {resetAndNavigate} from '../../utils/NavigationUtils';

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
        tokenCheck();
      } catch (error) {
        Alert.alert('Error', 'Sorry, we could not get your location');
      }
    };
    const timeoutId = setTimeout(fetchUserLocation, 1000);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: screenWidth * 0.7,
    height: screenHeight * 0.7,
    resizeMode: 'contain',
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

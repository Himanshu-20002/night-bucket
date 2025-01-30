import {Alert} from 'react-native';
import {BASE_URL} from './config';
import axios from 'axios';
import {storage, tokenStorage} from '../state/storage';
import {useAuthStore} from '@state/authStore';
import {resetAndNavigate} from '../utils/NavigationUtils';
import { appAxios } from './apiInterceptors';


export const deliveryLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/delivery/login`, {
      email,
      password,
    });
   
    const {accessToken, refreshToken, deliveryPartner} = response.data;
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', refreshToken);
    tokenStorage.set('user', JSON.stringify(deliveryPartner));
    const {setUser} = useAuthStore.getState();
    setUser(deliveryPartner);
    console.log('delivery partner set in zustand', deliveryPartner);
    return true;
  } catch (error) {
    console.log('error in deliveryLogin', error);
  }
};

export const customerLogin = async (phoneNumber: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/customer/login`, {
      phone: phoneNumber,
    });
    console.log('login response', response.data);
    const {accessToken, refreshToken, customer} = response.data;
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', refreshToken);
    tokenStorage.set('user', JSON.stringify(customer));
    const {setUser} = useAuthStore.getState();
    setUser(customer);
    return true;
  } catch (error) {
    Alert.alert('Error', 'Sorry, we could not log you in  ok ?');
    console.log('login error', error);
  }
};

export const refresh_token = async () => {
  try {
    const refreshToken = tokenStorage.getString('refreshToken');
    const response = await axios.post(`${BASE_URL}/refresh-token`, {
      refreshToken,
    });
    const new_access_token = response.data.accessToken;
    const new_refresh_token = response.data.refreshToken;
    tokenStorage.set('accessToken', new_access_token);
    tokenStorage.set('refreshToken', new_refresh_token);
    return new_access_token;
  } catch (error) {
    console.log('error in refresh_token', error);
    tokenStorage.clearAll();
    resetAndNavigate('CustomerLogin');
  }
};

export const refetchUser = async (setUser: any) => {
  try {
    const response = await appAxios.get(`/user`);
    setUser(response.data.user);
  } catch (error) {
    console.log('error in refetchUser', error);
  }
};













// Auth Service
// ├── Imports
// │   ├── Alert (for user notifications)
// │   ├── BASE_URL (API base URL)
// │   ├── axios (HTTP client)
// │   ├── tokenStorage (for token management)
// │   ├── useAuthStore (for state management)
// │   ├── resetAndNavigate (for navigation)
// │   └── appAxios (configured axios instance)
// ├── Functions
// │   ├── customerLogin
// │   │   ├── Purpose: Authenticate user
// │   │   ├── API Call: POST /customer/login
// │   │   ├── Stores: accessToken, refreshToken, user
// │   │   └── Updates: Zustand store with user data
// │   ├── refresh_token
// │   │   ├── Purpose: Refresh access token
// │   │   ├── API Call: POST /refresh-token
// │   │   ├── Updates: accessToken, refreshToken
// │   │   └── Error Handling: Clears tokens and navigates to login
// │   └── refetchUser
// │       ├── Purpose: Fetch current user data
// │       ├── API Call: GET /user
// │       └── Updates: Zustand store with user data
// └── Use Cases
//     ├── User Login
//     ├── Token Refresh
//     ├── User Data Fetching
//     └── Error Handling
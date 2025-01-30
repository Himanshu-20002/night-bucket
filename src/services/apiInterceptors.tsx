import axios from 'axios';
import {BASE_URL} from './config';
import {tokenStorage} from '@state/storage';
import {refresh_token} from './authService';
import {Alert} from 'react-native';

export const appAxios = axios.create({
  baseURL: BASE_URL,
});
appAxios.interceptors.request.use(async config => {
  const accessToken = await tokenStorage.getString('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

appAxios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) {
      try {
        const newAccessToken = await refresh_token();
        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return appAxios(error.config);
        }
      } catch (error) {
        console.log('Error in refreshing token:', error);
      }
    }
    if (error.response && error.response.status! === 401) {
      const errorMessage =
        error.response.data.message || 'Something went wrong';
      Alert.alert('Error', errorMessage);
    }
    return Promise.resolve(error);
  },
);



// API Interceptors (Axios)
// ├── Imports
// │   ├── axios (HTTP client)
// │   ├── BASE_URL (API base URL)
// │   ├── tokenStorage (for token management)
// │   ├── refresh_token (for refreshing tokens)
// │   └── Alert (for user notifications)
// ├── Axios Instance
// │   ├── Instance: appAxios
// │   ├── Purpose: Centralized API calls
// │   └── Configuration: baseURL
// ├── Request Interceptor
// │   ├── Purpose: Attach access token to requests
// │   ├── Functionality:
// │   │   ├── Retrieve access token
// │   │   └── Set Authorization header
// │   └── Benefit: Ensures authenticated requests
// └── Response Interceptor
//     ├── Purpose: Handle responses and errors
//     ├── Functionality:
//     │   ├── Check for 401 status
//     │   ├── Attempt to refresh token
//     │   ├── Retry original request
//     │   └── Show error alert if needed
//     └── Benefit: Automatic token management

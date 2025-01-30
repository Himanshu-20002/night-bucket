import axios from 'axios';
import {BASE_URL} from './config';

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.log('error in getAllCategories', error);
    return[]
  }
};

export const getProductsByCategoryId = async (Id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/product/${Id}`);
    console.log('products fetched')
    return response.data;
  } catch (error) {
    console.log('error in getProductsByCategoryId', error);
    return[]
  }
};
export const getProductsBySubcategoryId = async (Id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/product/subcategory/${Id}`);
    console.log('products fetched')
    return response.data;
  } catch (error) {
    console.log('error in getProductsBySubcategoryId', error);
    return[]
  }
};

export const getSubcategory = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/subcategories`);
    console.log('subcategory fetched')
    return response.data;
  } catch (error) {
    console.log('error in getSubcategory', error);
    return[]
  }
};

export const fetchProduct = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/product`);
    console.log('products fetched')
    return response.data;
  } catch (error) {
    console.log('error fetching products', error);
    return[]
  }
};
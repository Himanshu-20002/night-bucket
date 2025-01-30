import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import CustomHeader from '../../components/ui/CustomHeader';
import SideBar from './SideBar';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  getAllCategories,
  getProductsByCategoryId,
} from '../../services/ProductService';
import ProductList from './ProductList';
import WithCart from '../cart/WithCart';



const ProductCategories: FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [products, setProducts] = useState<any[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const response = await getAllCategories();
         setCategories(response);
    } catch (error) {
      console.log('Error fetching categories', error);
    } finally {
      setCategoriesLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);


  const fetchProducts = async (categoryId: string) => {
    try {
      setProductsLoading(true);
      const response = await getProductsByCategoryId(categoryId);
      setProducts(response);
    } catch (error) {
      console.log('Error fetching Products', error);
    } finally {
      setProductsLoading(false);
    }
  };
  useEffect(() => {
    if (selectedCategory?._id) {
      fetchProducts(selectedCategory._id);
    }
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <CustomHeader
        title={selectedCategory?.name || 'Product Categories'}
        search
      />
      <View style={styles.subContainer}>
        {categoriesLoading ? (
          <ActivityIndicator size="small" color={Colors.border} />
        ) : (
          <SideBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryPress={(category: any) => setSelectedCategory(category)}
          />
        )}
        {productsLoading ? (<ActivityIndicator size="small" color={Colors.border} style={styles.center}/>
        ) : (
          <ProductList data={products} />
        
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WithCart(ProductCategories);

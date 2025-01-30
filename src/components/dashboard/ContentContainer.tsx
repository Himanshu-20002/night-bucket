import Animated from 'react-native-reanimated';
import {View, StyleSheet} from 'react-native';
import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {adData, adData2, categories} from '../../utils/dummyData';
import AdCarousal from './AdCarousal';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '../../utils/Constants';
import CategoryContainer from './CategoryContainer';
import HomeFlatlist from '@features/dashboard/flatlist/HomeFlatlist';
import SavedFlatlist from '@features/dashboard/flatlist/SavedFlatlist';
import FlashDealsFlatlist from '@features/dashboard/flatlist/FlashDealsFlatlist';
import ProductFlatlist from '@features/dashboard/flatlist/ProductFlatlist';
import LinearGradient from 'react-native-linear-gradient';
import PreviousFlatlist from '@features/dashboard/flatlist/PreviousFlatlist';
import {useAuthStore} from '@state/authStore';
import {fetchCustomerOrders} from '@services/OrderService';
import {
  getAllCategories,
  getProductsByCategoryId,
  getSubcategory,
} from '@services/ProductService';
import CountDownTimer from './CountDownTimer';
import SubcategoryFlatlist from '@features/dashboard/flatlist/SubcategoryFlatlist';
import CategoryFlatlist from '@features/dashboard/flatlist/CategoryFlatlist';
import LottieView from 'lottie-react-native';

const ContentContainer = React.memo(({selectedIndex}: {selectedIndex: number}) => {
  console.log('rendering content container');
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 18,
      marginTop: selectedIndex === 0 ? -10 : 247,
      flex: 1,
    },
    linearGradient: {
      height: 150,
      position: 'absolute',
      width: '100%',
      top: -4,
      left: 0,
      right: 0,
      zIndex: 1,
      transform: [{scaleY: -1}, {scaleX: -5}],
      opacity: 0.8,
    },
    homeLinearGradient2: {
      height: 150,
      position: 'absolute',
      width: '100%',
      top: -23,
      left: 18,
      right: 18,
      zIndex: -1,
      transform: [{scaleY: -1}, {scaleX: -5}],
      opacity: 0.8,
    },
    textHeader: {
      zIndex: 1000,
      marginBottom: 4,
      marginTop: 3,
    },
    textHeader2: {
      zIndex: 1000,
      marginBottom: 4,
      position: 'absolute',
      color: '#432432',
    },
    homeLinearGradient: {
      height: 150,
      position: 'absolute',
      width: '100%',
      top: 300,
      left: 18,
      right: 18,
      zIndex: 1,
      transform: [{scaleY: -1}, {scaleX: -5}],
      opacity: 0.8,
    },
    homeLinearGradient3: {
      height: 150,
      position: 'absolute',
      width: '100%',
      top: -9,
      left: 18,
      right: 18,
      zIndex: -1,
      transform: [{scaleY: -1}, {scaleX: -5}],
      opacity: 1,
    },
    homeLinearBorder: {
      height: 190,
      position: 'absolute',
      width: '100%',
      top: 249,
      left: 18,
      right: 18,
      zIndex: 0,
      transform: [{scaleY: -1}, {scaleX: -5}],
      opacity: 1,
    },
    homeLinearBorder2: {
      height: 190,
      position: 'absolute',
      width: '100%',
      top: 9,
      left: 18,
      right: 18,
      zIndex: 0,
      transform: [{scaleY: -1}, {scaleX: -5}],
      opacity: 1,
    },
    homeLinearBorderCover: {
      height: 190,
      position: 'absolute',
      width: '100%',
      top: 257,
      left: 18,
      right: 18,
      zIndex: 1,
      transform: [{scaleY: -1}, {scaleX: -5}],
      opacity: 1,
    },
    homeLinearBorderCover2: {
      height: 190,
      position: 'absolute',
      width: '100%',
      top: 257,
      left: 18,
      right: 18,
      zIndex: 1,
      transform: [{scaleY: -1}, {scaleX: -5}],
      opacity: 1,
    },
    flashDealsText: {
      marginBottom: 4,
      zIndex: 1000,
    },
    groceryLinearGradient: {
      height: 140,
      position: 'absolute',
      width: 800,
      top: 350,
      left: -20,
      right: 0,
      zIndex: 1,
      opacity: 1,
    },
    FoodgroceryLinearGradient: {
      height: 140,
      position: 'absolute',
      width: 800,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      opacity: 1,
    },
    flashDealCounter: {
      marginBottom: 4,
      zIndex: 1000,
      color: 'white',
      position: 'absolute',
      right: 0,
    },
    lottie: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      top: -99,
      left: 300,
      width: 100,
      height: 100,
      transform: [{scaleX: 1}],
      zIndex: -22,
    },
    lottie2: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      top: -49,
      left: 320,
      width: 120,
      height: 100,
      transform: [{scaleX: 1}],
      zIndex: 1,
    },
  });

  const [products, setProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState('');
  const [subcategory, setSubcategory] = useState<any[]>([]);
  const [category, setCategory] = useState<any[]>([]);
  const {user} = useAuthStore();
  const [orders, setOrders] = useState<any[]>([]);

  const fetchProducts = useCallback(async (categoryId: string) => {
    if (!categoryId) return; // Prevent fetching if no categoryId
    setProductsLoading(true);
    try {
      const response = await getProductsByCategoryId(categoryId);
      setProducts(response.slice(0, 8));
    } catch (error) {
      console.log('Error fetching Products', error);
    } finally {
      setProductsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(currentCategoryId);
  }, [currentCategoryId, fetchProducts]);

  const fetchSubcategory = useCallback(async () => {
    try {
      const response = await getSubcategory();
      setSubcategory(response.slice(3, 20));
    } catch (error) {
      console.log('Error fetching Subcategory Products', error);
    }
  }, []);

  const fetchCategory = useCallback(async () => {
    try {
      const response = await getAllCategories();
      setCategory(response);
    } catch (error) {
      console.log('Error fetching Category Products', error);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    const data = await fetchCustomerOrders(user?.id);
    if (data?.orders) {
      const sortedOrders = data.orders.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setOrders(sortedOrders.slice(0, 4)); // Get the first 4 orders
    }
  }, [user]);

  useEffect(() => {
    fetchSubcategory();
    fetchCategory();
    fetchOrders();
  }, [selectedIndex, fetchSubcategory, fetchCategory, fetchOrders]);

  const renderPreviousFlatlist = useCallback(() => <PreviousFlatlist orders={orders} />, [orders]);
  const renderCountDownTimer = useCallback(() => <CountDownTimer />, []);

  return (
    <View style={styles.container}>
      {selectedIndex === 0 && (
        <View style={{paddingBottom: 10}}>
          <AdCarousal adData={adData} />
          <HomeFlatlist />
          <LinearGradient
            colors={['transparent', '#891DF5', 'hsl(268 88.24% 60%)']}
            style={styles.homeLinearBorderCover}
          />
          <LinearGradient
            colors={['transparent', '#891DF5', 'hsl(58.08 100% 50.98%)']}
            style={styles.homeLinearBorder}
          />
            <LinearGradient
          colors={['#ffffff', '#FFFFFF', 'transparent']}
          style={styles.groceryLinearGradient}></LinearGradient>
        </View>
      )}
      {selectedIndex === 1 && (
        <View style={{marginTop: 1}}>
          <LinearGradient
            colors={['transparent', '#8A59DD', '#21C2F8']}
            style={styles.linearGradient}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <CustomText variant="h5" fontFamily={Fonts.SemiBold} style={styles.flashDealsText}>
              Flash Deals
            </CustomText>
            <View style={{position: 'absolute', right: 0, backgroundColor: '#4967FB', borderRadius: 4, zIndex: 1000, paddingHorizontal: 4}}>
              {renderCountDownTimer()}
            </View>
          </View>
          <FlashDealsFlatlist />
          <CustomText variant="h5" fontFamily={Fonts.SemiBold} style={styles.textHeader}>
            Previously bought
          </CustomText>
          {renderPreviousFlatlist()}
        </View>
      )}
      {selectedIndex === 2 && (
        <View style={{paddingBottom: 10}}>
          <HomeFlatlist />
          <LinearGradient
            colors={['transparent', '#891DF5', 'hsl(58.08 100% 50.98%)']}
            style={styles.homeLinearBorder2}
          />
        </View>
      )}
      <CustomText variant="h5" fontFamily={Fonts.SemiBold} style={[styles.textHeader, {marginTop: 18}]}>
        Grocery & Kitchen
      </CustomText>
      <CategoryContainer data={categories} />
      <View style={{marginBottom: 13}}>
        <LinearGradient
          colors={['transparent', '#8A59DD', '#0267FF']}
          style={styles.homeLinearGradient2}
        />
        <CountDownTimer />
        <CustomText variant="h5" fontFamily={Fonts.SemiBold} style={styles.textHeader}>
          Flash Deal !
        </CustomText>
        <Animated.View>
          <LottieView
            autoPlay={true}
            enableMergePathsAndroidForKitKatAndAbove={true}
            loop={true}
            source={require('../../assets/animations/lastAnimation/airBallon.json')}
            style={styles.lottie}
          />
        </Animated.View>
        <FlashDealsFlatlist />
      </View>
      {selectedIndex === 0 &&   <ProductFlatlist
        products={products}
        categoryId={currentCategoryId}
        onCategoryChange={setCurrentCategoryId}
      />}


      {/* <ProductFlatlist
        products={products}
        categoryId={currentCategoryId}
        onCategoryChange={setCurrentCategoryId}
      /> */}

      
      <View style={{marginTop: 60, flex: 1}}>
        <CustomText variant="h5" fontFamily={Fonts.SemiBold} style={styles.textHeader2}>
          -Subcategory-
        </CustomText>
        <LinearGradient
          colors={['transparent', '#E4E2E6', 'hsl(268.09 100% 56.86%)']}
          style={styles.homeLinearGradient3}
        />
        <SubcategoryFlatlist subcategory={subcategory} />
        <CategoryFlatlist category={category} />
        <AdCarousal adData={adData2} height={120} width={440} />
      </View>
    </View>
  );
});

export default ContentContainer;

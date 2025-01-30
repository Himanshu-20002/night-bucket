import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RollingBar from 'react-native-rolling-bar';
import {navigate} from '@utils/NavigationUtils';
import {Colors, Fonts} from '@utils/Constants';
import {fetchProduct} from '@services/ProductService';
import ProductItem from '@features/category/ProductItem';
import {FlashList} from '@shopify/flash-list';
import SearchProductList from './products/SearchProductList';
import AdCarousal from './AdCarousal';
import { adData2 } from '@utils/dummyData';
import WithCart from '@features/cart/WithCart';

const ITEMS_PER_PAGE = 10;

const SearchProducts = () => {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const inputRef = useRef(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const onSearch = (text: string) => {
    const filtered = products.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredProducts(filtered.slice(0, 30));
    setCurrentPage(0);
  };

  const handlePress = () => {
    if (!isSearchMode) {
      setIsSearchMode(true);
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      navigate('SearchProducts');
    }
  };

  const getProducts = async () => {
    const fetchedProducts = await fetchProduct();
    setProducts(fetchedProducts);
    setFilteredProducts(fetchedProducts.slice(0, 30));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const renderItem = ({item, index}: any) => {
    return (
      <View style={styles.flatContainer}>
        <SearchProductList item={item} index={index} />
      </View>
    );
  };
  const loadMoreItems = () => {
    const nextPage = currentPage + 1;
    const startIndex = nextPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newItems = products.slice(startIndex, endIndex);

    if (newItems.length > 0) {
      setFilteredProducts([...filteredProducts, ...newItems]);
      setCurrentPage(nextPage);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.container2}
        activeOpacity={0.8}
        onPress={handlePress}>
        <Icon
          name="curtains"
          color="black"
          size={RFValue(20)}
          style={styles.profile}
        />
        {isSearchMode ? (
          <TextInput
            ref={inputRef}
            placeholder="Search"
            style={styles.input}
            onChangeText={onSearch}
            placeholderTextColor="#111111"
            autoCapitalize="none"
            autoCorrect={true}
          />
        ) : (
          <RollingBar
            interval={3000}
            defaultStyle={false}
            customStyle={styles.textContainer}>
            <CustomText variant="h6" style={styles.Medium}>
              Search "milk"
            </CustomText>
            <CustomText variant="h6" style={styles.Medium}>
              Search "jalabi"
            </CustomText>
            <CustomText variant="h6" style={styles.Medium}>
              Search "water"
            </CustomText>
            <CustomText variant="h6" style={styles.Medium}>
              Search "pooja thali"
            </CustomText>
            <CustomText variant="h6" style={styles.Medium}>
              Search "y-food"
            </CustomText>
          </RollingBar>
        )}
        <View style={styles.divider} />
        <Icon
          name="microphone"
          color="#000000"
          size={RFValue(20)}
          style={styles.profile}
        />
      </TouchableOpacity>
      <View  style={{marginHorizontal:10}}>



      <AdCarousal adData={adData2}height={120} width={440}/>
      </View >
      <View style={{flex:1 ,marginTop:100}}>
      <FlashList
        data={filteredProducts}
        renderItem={renderItem}
        estimatedItemSize={150}
        numColumns={3}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
      />
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  flatContainer: {
    flex: 1,
    // backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    marginBottom: 10
     // Added fixed padding to prevent layout shift
  },
  content: {
    paddingHorizontal: 1,
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F4F7',
    paddingHorizontal: 10,
    paddingBottom: 0, // Added fixed padding to prevent layout shift
    marginRight:9
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E4E5E4',
    paddingHorizontal: 10,
    marginTop: 20,
    overflow: 'hidden',
    marginHorizontal: 10,
    borderRadius: 10,
    height: 50, // Added fixed height to prevent layout shift
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#F3F4F7',
    color: '#0C0C0C',
    fontFamily: Fonts.Medium,
    fontSize: RFValue(14),
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
    height: 50,
    backgroundColor: '#F3F4F7',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#00000060',
    marginHorizontal: 10,
  },
  Medium: {
    fontFamily: Fonts.Medium,
  },
  profile: {
    marginRight: 10,
  },
});
export default WithCart(SearchProducts);

import CustomText from '@components/ui/CustomText';
import Scalepress from '@components/ui/Scalepress';
import {FlashList} from '@shopify/flash-list';
import {Fonts} from '@utils/Constants';
import {navigate} from '@utils/NavigationUtils';
import {Image, Text, View, StyleSheet} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const CategoryFlatlist = ({category}: {category: any[]}) => {
  return (
    <View style={styles.container}>
      <FlashList
        data={category.slice(10, 30)}
        estimatedItemSize={50}
        numColumns={6}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Scalepress
            onPress={() => {
              navigate('ProductCategories', {category: item.name});
              console.log(item.name);
            }}
            key={item._id}
            style={styles.item}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <CustomText
              variant="h8"
              fontFamily={Fonts.Medium}
              style={styles.text}>
              {item.name}
            </CustomText>
          </Scalepress>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 27,
    // marginVertical: 10,
     padding:1,
     flex:1,
     alignContent:'center',
     width:'100%',
     height:400,

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 100,
    alignItems: 'baseline', //baseline for text to remain in same line and on top
    marginBottom: 45,
    maxWidth: 'auto',
  },
  item: {
    width: '100%',
    // height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    zIndex: 100,
  },
  imageContainer: {
    width: '90%',
    height: 69,
    borderRadius: 10,
    padding: 4,
    marginBottom: 8,
    backgroundColor: '#E5F3F39F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 5,
    textAlign: 'center',
  },
});

export default CategoryFlatlist;

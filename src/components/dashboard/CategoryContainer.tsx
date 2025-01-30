import {View, StyleSheet, Image} from 'react-native';
import React, {FC} from 'react';
import {navigate} from '../../utils/NavigationUtils';
import Scalepress from '@components/ui/Scalepress';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '../../utils/Constants';

const CategoryContainer: FC<{data: any}> = ({data}) => {
  const renderItems = (items:any[]) => {
    // Ensure items is an array before mapping
    const validItems = Array.isArray(items) ? items : [];
    return (
      <>
        {validItems.map((item: any, index: any) => {
          return (
            <Scalepress
            onPress={() => {
                navigate('ProductCategories', { category: item.name });
                console.log(item.name);
            }}
            key={index}
            style={styles.item}
        >
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
              </View>
              <CustomText
                variant="h8"
                fontFamily={Fonts.Medium}
                style={styles.text}>
                {item.name}
              </CustomText>
            </Scalepress>
          );
        })}
      </>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>{renderItems(data?.slice(0, 4))}</View>
      <View style={styles.row}>{renderItems(data?.slice(4, 8))}</View>
      <View style={styles.row}>{renderItems(data?.slice(8, 13))}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop:27,
    marginVertical: 15,
    marginHorizontal:10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height:100,
    alignItems: 'baseline', //baseline for text to remain in same line and on top
    marginBottom: 45,
  },
  item: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imageContainer: {
    width: '100%',
    height: 89,
    borderRadius: 10,
    padding: 6,
    marginBottom: 8,
    backgroundColor: '#E5F3F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 5,
    textAlign: 'center',
  },
});

export default CategoryContainer;

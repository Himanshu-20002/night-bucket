import {View, StyleSheet,Text, Image} from 'react-native';
import React, {FC} from 'react';
import { screenHeight } from '../../../utils/Scaling';
import CustomText from '../../../components/ui/CustomText';
import {Colors, Fonts} from '../../../utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import UniversalAdd from '../../../components/ui/UniversalAdd';


const SearchProductList: FC<{item: any; index: number}> = ({item, index}) => {


  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={{uri: item.images[0]}} style={styles.image}/>
        </View>
        <View style={styles.content}>
        <View style={styles.flexRow}>
           <Image source={require('../../../assets/icons/clock.png')} style={styles.clockIcon}/>
           <CustomText fontSize={RFValue(6)} fontFamily={Fonts.Regular}>8 min</CustomText>
        </View>
        <CustomText variant='h8' numberOfLines={2}style={{marginVertical:4}} fontFamily={Fonts.Medium}>{item.name}</CustomText>
        <View style={styles.priceContainer}>
            <View>
            <CustomText variant='h8' fontFamily={Fonts.Medium}>{item?.price}</CustomText>
            <CustomText variant='h8' style={{opacity:0.5,textDecorationLine:'line-through',color:'#3A1D52'}} fontFamily={Fonts.Medium}>{item?.price}</CustomText>
            </View>
           <UniversalAdd item={item}/>
        </View>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '110%',
    height:'100%',
    borderRadius:10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginTop: 12,
  },
  imageContainer: {
    width: '100%',
    height: screenHeight * 0.14,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:5
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    aspectRatio: 1 / 1,
  },
  content: {
    paddingHorizontal: 10,
    flex:1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding:2,
    gap: 2,
    backgroundColor:Colors.backgroundSecondary,
    alignSelf: 'flex-start',
    borderRadius: 4,
  },
  clockIcon: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
  },
  priceContainer: {
 flexDirection: 'row',
 alignItems: 'center',
 justifyContent: 'space-between',
 paddingVertical: 4,
 marginTop:'auto'
  },
});

export default SearchProductList
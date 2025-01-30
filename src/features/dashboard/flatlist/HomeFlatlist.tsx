import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import React, { useRef } from 'react'
import { productHeader } from '@utils/dummyData'
import CustomText from '@components/ui/CustomText'
import { navigate } from '@utils/NavigationUtils'
import { Fonts } from '@utils/Constants'
import LinearGradient from 'react-native-linear-gradient'
import { BottomSheetRefProps } from '@components/dashboard/BottomSheet'
import FastImage from 'react-native-fast-image'

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const FULL_WIDTH = screenWidth;

const HomeFlatlist = () => {
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);
        const renderItem = ({item, index}: any) => {
            return (
              <TouchableOpacity
              onPress={() =>  navigate('ListDetail' , {item})}
                 
                activeOpacity={0.7}>
                      {/* <Image
                  source={{uri: item.backgroundImage}}
                  resizeMode="cover"
                  style={styles.productBackgroundImage}
                /> */}
                <LinearGradient colors={['#BDA1F5', '#FCFCFC','#897979']} style={styles.productBackgroundImage}></LinearGradient>
        
                <View style={styles.featuredProductContainer}>
                  <View
                    style={[
                      StyleSheet.absoluteFillObject,
                      {
                        // backgroundColor: 'rgba(104 180 205 / 0.5)', 
                        borderRadius: 13},
                    ]}
                  />
                  <View style={styles.featuredProductTextContainer}>
                    <CustomText variant="h9" fontFamily={Fonts.SemiBold}>
                      Featured
                    </CustomText>
                    <CustomText variant="h9" fontFamily={Fonts.Bold} style={{color: item.name.length < 4 ? 'red' : 'white'}} >
                      {item.name}
                    </CustomText>
                  </View>
                  <FastImage
                    source={{uri: item.image}}
                    resizeMode="cover"
                    style={styles.productImage} 
                  />
                </View>
            
              </TouchableOpacity>
    )
}   

  return (
    <View>
            <FlatList
              keyExtractor={item => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={productHeader} 
              renderItem={renderItem}
              snapToInterval={FULL_WIDTH-28}
              decelerationRate="fast"
              style={styles.touchableContainer2}
              contentContainerStyle={{gap: 10, zIndex: 1000, paddingBottom: 19, paddingTop: 6, marginLeft:0}}
              removeClippedSubviews={false}
            />
     
    </View>
  )
}

const styles = StyleSheet.create({
    touchableContainer2: {
        width: '100%',
        height: 150,
        zIndex: 1000,
        overflow: 'hidden',
        marginTop: 10
      },
      touchableContainer: {
        width: '100%',
        height: 150,
        zIndex: 100,
        backgroundColor: 'orangered',
        borderRadius: 9,
        overflow: 'hidden',
        position: 'absolute',
        top: 350,
        left: 0,
        right: 0,
        bottom: 0,
        marginRight: 100,
      },
      featuredProductTextContainer: {
        // flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 0,
        marginLeft: 10,
        zIndex: 1000,
        position:'absolute',
        width:90,
        height:60,
        top:3,
        left:0,
        right:0,
        bottom:0
        
      },
      featuredProductContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 118,
        height: 100,
        zIndex: 1000,
        gap: 0,
        
    
        // backgroundColor: 'limegreen',
      },
      productImage: {
        width: '80%',
        height: 100,

        zIndex: 1000,
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
        top:30,
        left:12,
        right:0,
        bottom:5,
      },
      productBackgroundImage: {
        width: '100%',
        height: 130,
        borderRadius: 13,
        zIndex: 99,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // opacity:0.9
      },
})
export default HomeFlatlist
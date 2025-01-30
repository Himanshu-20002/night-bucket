import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import React from 'react';
import { FlashList } from '@shopify/flash-list';
import CustomText from '@components/ui/CustomText';
import { green } from 'react-native-reanimated/lib/typescript/Colors';
import LinearGradient from 'react-native-linear-gradient';



const SubcategoryFlatlist = ({subcategory}: {subcategory: any[]}) => {
  return (
    <View style={styles.mainContainer}>
       
    <FlashList
      data={subcategory}
      horizontal={true}
      estimatedItemSize={100}
      keyExtractor={(item) => item._id}
      // numColumns={6}
      contentContainerStyle={
        {
       padding:2,
       paddingTop:25,
       paddingVertical:90
        }      }
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          {/* <View  style={{backgroundColor:'green'}} /> */}
            <View style={styles.imageContainer}>
               <Image source={{ uri: "https://res.cloudinary.com/duyyhs6ef/image/upload/v1732522906/Untitled_design_10_waa7ck.png" }} style={styles.containerImage} />
               <Image source={{ uri: item.image }} style={styles.image} />
          </View>
          <CustomText style={styles.itemName} numberOfLines={1}>{item.name.slice(0,15)}</CustomText>
        </View>
      )}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  // homeLinearGradient: {
  //   height: 150,
  //   position: 'absolute',
  //   width: '100%',
  //   top: 30,
  //   left: 18,
  //   right: 18,
  //   zIndex: 1,
  //   transform: [{scaleY: -1}, {scaleX: -5}],
  //   opacity: 0.8,
  // },
    mainContainer: {
    padding: 0,
    // backgroundColor: '#2961FC',
    borderRadius: 2,
    marginBottom: 10,
    marginLeft: -19,
    zIndex: 100,
    height:189,
    width: '110%',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    // position:'absolute',
    // top: 0,
    // left: 0,
    // right: 10,
    // bottom: 0,
    // backgroundColor: 'green',
    marginTop: 10,
  },
  itemContainer: {
     backgroundColor: '#FFFFFF',
    borderRadius: 10,
    gap:0,
    paddingBottom:10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 115,
    height: 145,
    marginBottom: 20,
    marginLeft: 10,
    // backgroundColor: 'green',
  

  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    position: 'absolute',
    top: 9,
    left:5,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',

    

  },
  imageContainer: {
    width: 109,
    height: 109,
    borderRadius: 10,
    padding:3,
    // backgroundColor: 'red',
    marginTop:3
  },
  
  containerImage:{
    width: 109,
    height: 109,
    borderRadius: 10,
    // backgroundColor: '#fff',
    padding:0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 9, // Adjust elevation as needed
    marginBottom: 5, // Adjust margin as needed
    marginLeft: 10, // Adjust margin as needed
    lineHeight: 18, // Adjust line height as needed
    marginRight: 10, // Adjust margin as needed
 // Adjust elevation as needed
   position: 'absolute',
    top: 0, // Adjust top position as needed
    right: 0, // Adjust right position as needed
    left: -10, // Adjust left position as
  },
  itemName: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#9C8E8E',
    fontSize: 14, // Adjust font size as needed
    marginBottom: 5, // Adjust margin as needed
    marginLeft: 10, // Adjust margin as needed
    lineHeight: 18, // Adjust line height as needed
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2, // Adjust elevation as needed
    

  },
});

export default SubcategoryFlatlist;
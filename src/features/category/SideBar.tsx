import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {FC, useEffect, useRef,} from 'react';
import CustomText from '../../components/ui/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {runOnJS} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

interface SideBarProps {
  categories: any[];
  selectedCategory: any;
  onCategoryPress: (category: any) => void;
}

const SideBar:FC<SideBarProps> = ({
  categories,
  selectedCategory,
  onCategoryPress,
}) => {
  //scrollViewRef is a reference created using the useRef hook from React. It is specifically used to hold "a reference to the ScrollView component" in React Native.
  //scrollViewRef is used to access the ScrollView component's methods and properties, such as scrollTo, which is used to scroll to a specific position in the ScrollView.
  //Programmatic Scrolling: When a category is selected, the component needs to scroll to the corresponding category in the `ScrollView`. By using `scrollViewRef`, you can call `scrollViewRef.current.scrollTo(...)` to programmatically scroll to a specific position based on the selected category's index.
  const scrollViewRef = useRef<ScrollView>(null);
  //indicatorPosition is a shared value created using the useSharedValue hook from Reanimated. It is used to animate the position of the indicator.
  //The indicator's position is updated based on the index of the selected category, and the category images animate up or down based on whether they are selected.
  const indicatorPosition = useSharedValue(0); //Animated position of the indicator

  //animatedValues is an array of shared values created using the useSharedValue hook from Reanimated. It is used to animate the bottom position of each category button.
  const animatedValues = categories?.map(() => useSharedValue(0));
  //categories.map is used to create an array of shared values, each initialized to 0. This array is used to animate the bottom position of each category button.

  useEffect(() => {
    let targetIndex = -1;
    categories?.forEach((category, index) => {
      const isSelected = selectedCategory?._id === category?._id;
      animatedValues[index].value = withTiming(isSelected ? 2 : -15, {
        duration: 500,
      });
      if (isSelected) targetIndex = index;
    });
    if (targetIndex !== -1) {
      // indicatorPosition.value = targetIndex * 100;
      //If a target index is found, the indicator's position is animated to the target index multiplied by 100, creating a scrolling effect.
      indicatorPosition.value = withTiming(targetIndex * 100, {duration: 100});
      // Check if scrollViewRef is valid before calling scrollTo
      if (scrollViewRef.current) {
        runOnJS(() => {
          scrollViewRef.current?.scrollTo({
            y: targetIndex * 100,
            animated: true,
          });
        })();
      }
    }
    console.log('Selected Category ID:', selectedCategory?._id);
    console.log('Target Index:', targetIndex);
  }, [selectedCategory]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{translateY: indicatorPosition.value}],
  }));

  return (
    <View style={styles.sideBar}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{paddingBottom: 50}}
        showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.indicator, indicatorStyle]} />

        <Animated.View>
          {categories?.map((category, index) => {
            const animatedStyles = useAnimatedStyle(
              () => ({
                bottom: animatedValues[index].value || 0,
              }),
              [animatedValues[index]],
            );
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  onCategoryPress(category); // Call the parent function to update the selected category
                }}
                style={styles.categoryButton}>
                <View
                  style={[
                    styles.imageContainer,
                    selectedCategory?._id === category?._id &&
                      styles.selectedImageContainer,
                  ]}>
                  <Animated.Image
                    source={{uri: category.image}}
                    style={[styles.image, animatedStyles]}
                  />
                </View>
                <CustomText fontSize={RFValue(7)}>{category.name}</CustomText>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  sideBar: {
    width: '24%',
    borderRightWidth: 0.8,
    borderRightColor: '#eee',
    position: 'relative',
  },
  categoryButton: {
    paddingVertical: 0,
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 100,
  },
  imageContainer: {
    width: '55%',
    height: '40%',
    borderRadius: 100,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D5E8E9',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'contain',
  },
  selectedImageContainer: {
    backgroundColor: '#70C944',
  },
  indicator: {
    position: 'absolute',
    right: 0,
    top: 10,
    width: 8,
    height: 80,
    borderRadius: 100,
    backgroundColor: '#E3ACEE',
    alignSelf: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default SideBar;

// SideBar Component
// ├── Props
// │   ├── categories: Array of category objects
// │   ├── selectedCategory: Currently selected category
// │   └── onCategoryPress: Callback for category selection
// ├── State Management
// │   ├── scrollViewRef: Reference to ScrollView
// │   ├── indicatorPosition: Animated position of the indicator
// │   └── animatedValues: Array of animated values for categories
// ├── Animations
// │   ├── Indicator Animation
// │   │   ├── Position updated based on selected category index
// │   │   └── Animated using withTiming
// │   └── Category Animation
// │       ├── Bottom position animated based on selection
// │       └── Animated using withTiming
// └── Rendering
//     ├── View: Main container
//     ├── ScrollView: Contains category buttons
//     └── TouchableOpacity: For each category button

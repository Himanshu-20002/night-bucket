import {Dimensions,} from 'react-native';
import {View, StyleSheet, Image, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import React, {FC, useMemo} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {darkWeatherColors} from '../../utils/Constants';
import LottieView from 'lottie-react-native';
import {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {useCollapsibleContext} from '@r0b0t3d/react-native-collapsible';
import Video from 'react-native-video';
import {BlurView} from '@react-native-community/blur';
import SavedFlatlist from './flatlist/SavedFlatlist';
import FastImage from 'react-native-fast-image';

//implementation of on Refresh Visuals changes including change in all theme and 1 dark mode and loading animation
// Theme 1: Light Mode
// Theme 2: Dark Mode
// Theme 3: Dark Mode with loading animation
// Theme 4: raining weather thunderstorm  bushesh flying appart city scene close up  emotion quick action button animation in case of animation slider  , boy running forom cycles to delive the product rainy weather thunder storm rain cote trafic light police chase
// implement a cirle  indian rath circle aswasthama rath circle for offer product loading animation
// implementation of haptic feedback in tuch vibrations and sound in placing and order and adding to cart  and payment  sound effect of money and sound effect of success and sound effect of error
// Theme 3: Loading Animation

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const FULL_WIDTH = screenWidth;

type VisualsProps = {
  type: string;
};

const Visuals: FC<VisualsProps> = React.memo(({type}) => {
  //When you call const { scrollY } = useCollapsibleContext(); in your Visuals.tsx file, you are destructuring the context object to get the scrollY animated value. This value represents the current vertical scroll position and is updated as the user scrolls.
  const {scrollY} = useCollapsibleContext();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 120], [1, 0.6]);
    return {
      opacity,
    };
  });

  const leftAnimatedStyle = useAnimatedStyle(() => {
    const leftPosition = interpolate(scrollY.value, [0, 100], [-44, 100]);
    console.log(leftPosition);
    return {
      position: 'absolute',
      right: 0,
      bottom: 0,
      top: 130,
      left: leftPosition,
      width: 250,
      height: 250,
      transform: [{scaleX: -1}],
      zIndex: -22,
    };
  });

  const birdAnimatedStyle = useAnimatedStyle(() => {
    const birdPosition = interpolate(scrollY.value, [0, 100], [44, 100]);
    return {
      position: 'absolute',
      right: 6,
      bottom: 0,
      top: 130,
      left: birdPosition,
      // transform: [{scaleX: -1}],
      zIndex: -22,
    };
  });

  const animationSource = useMemo(() => {
    switch (type) {
      case 'home':
        return require('../../assets/animations/raining.json');
      //deliveryGuy
      case 'saved':
        return require('../../assets/animations/expAnimation/5.json');
      case 'food':
        return require('../../assets/animations/expAnimation/1.json');
      case 'tryIt':
        return require('../../assets/animations/expAnimation/deadlightshock.json');
      //3,wire
      case 'games':
        return require('../../assets/animations/expAnimation/game.json');
      default:
        return require('../../assets/animations/expAnimation/1.json');
    }
  }, [type]);

  const dynamicStyles = useMemo(() => {
    switch (type) {
      case 'home':
        return {
          lottieContainer: {
            borderRadius: 0,
            // backgroundColor: 'rgba(246 210 46 / 0.65)',
            padding: 10, // Add padding if needed
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden', // Ensure corners are clipped
          },
          lottie: {
            width: '100%',
            height: 150,
            position: 'absolute',
            transform: [{scaleX: -1}],
            // width: '100%',
            // height: 500,
            // position: 'absolute',
            // transform: [{scaleX: -1}],
            // top:9,
            // left:7,
            // right:5,
            // bottom:5,
          },
        };
      case 'saved':
        return {
          lottieContainer: {
            borderRadius: 0,
            backgroundColor: 'pink',
            // opacity:0.5, // Ensure the background is visible
            padding: 10, // Add padding if needed
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden', // Ensure corners are clipped
          },
          lottie: {
            position: 'absolute',
            right: 0,
            bottom: 0,
            top: 130,
            left: 44,
            width: 250,
            height: 250,
            transform: [{scaleX: -1}],
            zIndex: -22,
          },
        };
      case 'food':
        return {
          lottieContainer: {
            borderRadius: 0,
            backgroundColor: '#FF0335C3',
            padding: 10, // Add padding if needed
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden', // Ensure corners are clipped
          },
          lottie: {
            width: '100%',
            height: 400,
            position: 'absolute',
            transform: [{scaleX: -1}],
            top: 170,
            left: 0,
            right: 5,
            bottom: 0,
          },
        };
      case 'tryIt':
        return {
          lottieContainer: {
            borderRadius: 0,
            // backgroundColor: 'cadetblue', // Ensure the background is visible
            padding: 10, // Add padding if needed
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden', // Ensure corners are clipped
          },
          lottie: {
            width: '100%',
            height: 500,
            position: 'absolute',
            transform: [{scaleX: -1}],
            top: -30,
            left: 0,
            right: 5,
            bottom: 5,
          },
        };
      case 'games':
        return {
          lottieContainer: {
            borderRadius: 0,
            // backgroundColor: 'black', // Ensure the background is visible
            padding: 10, // Add padding if needed
            position: 'absolute',
            top: -11,
            left: -22,
            right: 0,
            bottom: 0,
            overflow: 'hidden', // Ensure corners are clipped
          },
          lottie: {
            width: 450,
            height: 450,
            position: 'absolute',
            transform: [{scaleX: -1}],
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 10,
            // opacity:-6
          },
        };
      default:
        return {
          container: {backgroundColor: 'red'},
          lottie: {height: 150},
        };
    }
  }, [type]);

  const DynamicStyles = dynamicStyles;


  // headerAnimatedStyle
  return (
    <Animated.View style={[styles.container, headerAnimatedStyle]}>
      <LinearGradient colors={darkWeatherColors} style={styles.gradient} />
      <FastImage
        source={require('../../assets/images/cloud.png')}
        style={styles.cloud}
      />

      {type === 'tryIt' && (
        <Video
          source={require('../../assets/video/PurpleStar.mp4')}
          style={styles.video}
          resizeMode="cover"
          repeat={true}
          muted={true} // Mute the video if you don't want sound
        />
      )}
      {type === 'games' && (
        <View style={styles.videoContainer}>
          <Video
            source={require('../../assets/video/dancing.mp4')}
            style={styles.video}
            resizeMode="cover"
            repeat={true}
            muted={true} // Mute the video if you don't want sound
          />
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light" // You can choose 'light', 'dark', or 'xlight'
            blurAmount={100} // Adjust the blur intensity
          />
        </View>
      )}
      <View style={DynamicStyles.lottieContainer}>
        <View style={styles.lottieWrapper}>
          <LottieView
            autoPlay={true}
            enableMergePathsAndroidForKitKatAndAbove={true}
            loop={true}
            source={animationSource}
            style={[DynamicStyles.lottie as ViewStyle]} // Adjust height as needed
          />
          {type === 'saved' && (
            <LinearGradient
              colors={['transparent', 'rgba(16 37 96 / 0.8)', 'fuchsia']} // Adjust colors for fade effect
              style={styles.lottieBottomFade}
            />
          )}
          {type === 'games' && (
            <LinearGradient
              colors={['transparent', '#102560CC', 'fuchsia']} // Adjust colors for fade effect
              style={styles.lottieBottomFade}
            />
          )}
          {type === 'home' && (
            <LinearGradient
              colors={['transparent', '#102560CC', 'fuchsia']} // Adjust colors for fade effect
              style={styles.lottieBottomFade}
            />
          )}
         
          {type === 'saved' && (
            <Animated.View style={leftAnimatedStyle}>
              <LottieView
                autoPlay={true}
                enableMergePathsAndroidForKitKatAndAbove={true}
                loop={true}
                source={require('../../assets/animations/expAnimation/deliveryGuy.json')}
                style={styles.lottie}
              />
            </Animated.View>
          )}
          {type === 'saved' && (
            <Animated.View style={birdAnimatedStyle}>
              <LottieView
                autoPlay={true}
                enableMergePathsAndroidForKitKatAndAbove={true}
                loop={true}
                source={require('../../assets/animations/expAnimation/bird.json')}
                style={styles.lottieBird}
              />
            </Animated.View>
          )}

        {type === 'saved' && (
          <SavedFlatlist selectedIndex={1}/>
        )}
        {type === 'saved' && (
            <FastImage
            source={require('../../assets/images/yellowDecoration.jpg')}
            style={styles.saveGhost}
          />
        )}
        {type === 'food' && (
          <FastImage
            source={require('../../assets/images/textBackground.png')}
            style={styles.foodBanner}
          />
        )}
        {type === 'food' && (
          <FastImage
            source={require('../../assets/images/Pizza.png')}
            style={styles.pizza}
          />
        )}
        {type === 'food' && (
          <FastImage
            source={require('../../assets/images/cheese-burger.png')}
            style={styles.burger}
          />
        )}
        {type === 'food' && (
          <FastImage
            source={require('../../assets/images/topbar3.png')}
            style={styles.tasteOfItalia}
          />
        )}
        {type === 'food' && (
          <FastImage
            source={require('../../assets/images/dish.png')}
            style={styles.dish}
          />
        )}
           {type === 'food' && (
          <LinearGradient
            colors={['transparent', 'rgb(194 38 38)', 'lightpink']} // Adjust colors for fade effect
            style={styles.lottieBottomFadeFood}
          />
        )}
           {type === 'food' && (
          <LinearGradient
            colors={['transparent', 'rgb(194 38 38)', 'lightpink']} // Adjust colors for fade effect
            style={styles.lottieTopFadeFood}
          />
        )}
        {type === 'home' && (
          <FastImage
            source={require('../../assets/images/2.jpg')}
            style={styles.homeGhost}
          />
        )}

      </View>
      </View>
    </Animated.View>
  );
});
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFEC43'
  },
  saveGhost: {
    width: '100%',
    height: 400,
    position: 'absolute',
    // transform: [{scaleX: -1}],
    top: 0,
    right: 0,
    left: 0,
    zIndex: -99,
  },
  pizza: {
    width: '100%',
    height: 400,
    position: 'absolute',
    // transform: [{scaleX: -1}],
    top: 170,
    right: 0,
    left: -20,
    zIndex: 99,
  },
  burger: {
    width: '20%',
    height: 80,
    position: 'absolute',
    // transform: [{scaleX: -1}],
    top: 345,
    right: 0,
    left: 40,
    zIndex: 98,
  },
  dish: {
    width: '50%',
    height: 200,
    position: 'absolute',
    // transform: [{scaleX: -1}],
    top: 290,
    right: 0,
    left: 230,
    zIndex: 98,
  },
  foodBanner: {
    width: '100%',
    height: 400,
    position: 'absolute',
    // transform: [{scaleX: -1}],
    top: 95,
    right: 0,
    left: 0,
    zIndex: -99,
  },
  homeGhost: {
    width: '100%',
    height: 500,
    position: 'absolute',
    // transform: [{scaleX: -1}],
    top: 0,
    right: 0,
    left: 0,
    zIndex: -99,
  },
  tasteOfItalia: {
    width: '100%',
    height: 110,
    position: 'absolute',
    // transform: [{scaleX: -1}],
    top: 0,
    right: 0,
    left: 0,
    zIndex: -99,
    opacity:0.94
  },
  touchableContentContainer: {},
  touchableContainer2: {
    width: '100%',
    height: 150,
    zIndex: 1000,
    overflow: 'hidden',
    position: 'absolute',
    // backgroundColor:'rgb(246 245 233)',
    top: 330,
    left: 0,
    right: 0,
    bottom: 0,
    marginRight: 1,
  },
  touchableContainer: {
    width: '90%',
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
    justifyContent: 'space-between',
    width: 400,
    height: 100,
    zIndex: 1000,
    gap: 10,
    

    // backgroundColor: 'limegreen',
  },
  productImage: {
    width: 130,
    height: 130,
    borderRadius: 13,
    borderWidth: 3,
    zIndex: 1000,
    position:'absolute',
    top:0,
    left:270,
    right:0,
    bottom:0
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

  
  lottieBottomFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 90, // Small height for a subtle border fade
    zIndex:9999,
    top:385
  },
  lottieBottomFadeHome: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top:770,
    height: 90, // Small height for a subtle border fade
   transform: [{scaleY: -1}],
   zIndex:9999,
   
   
  },
  lottieBottomFadeFood: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top:450,
    height: 50, // Small height for a subtle border fade
   transform: [{scaleY: -1}],
   zIndex:9,
   
   
  },
  lottieTopFadeFood: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 93,
    height: 50, // Small height for a subtle border fade
   transform: [{scaleY: -1}],
   
  },
  bottomFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 10, // Small height for a subtle border fade
  },
  videoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    overflow: 'hidden',
  },
  // lottieContainer: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   overflow: 'hidden', // Ensure corners are clipped
  //   // backgroundColor:'pink'
  // },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1, // Ensure the video is behind other content
    // opacity:0.01,
  },

  lottie: {
    width: '100%',
    height: 120,
    position: 'absolute',
    // transform: [{scaleX: -1}],
    right: 0,
    bottom: 0,
    top: 80,
    left: -10,
    zIndex: -9999,
  },  
  lottieWrapper:{
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    zIndex:9999
  },
  lottieBird: {
    width: 150,
    height: 20,
    position: 'absolute',
    transform: [{scaleX: -1}],
    right: 44,
    bottom: 0,
    top: 85,
    left: 0,
    zIndex: -9999,
  },
  gradient: {
    width: '100%',
    height: screenHeight * 0.4,
    position: 'absolute',
  },
  cloud: {
    width: screenWidth,
    height: 100,
    resizeMode: 'stretch',
  },
});

export default Visuals;

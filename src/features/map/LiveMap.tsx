import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../../utils/Constants'
import {screenHeight} from '../../utils/Scaling'
import Animated from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
const LiveMap = () => {
  return (
    <View style={styles.container}>
        <Animated.View >
              <LottieView
                autoPlay={true}
                enableMergePathsAndroidForKitKatAndAbove={true}
                loop={true}
                source={require('../../assets/animations/lastAnimation/map.json')}
                style={styles.lottie2}
              />
              <LottieView
                autoPlay={true}
                enableMergePathsAndroidForKitKatAndAbove={true}
                loop={true}
                source={require('../../assets/animations/lastAnimation/Animation - 1732707615086.json')}
                style={styles.lottie}
              />
            </Animated.View>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        height:screenHeight*0.35,
        width:'100%',
        borderRadius:15,
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:Colors.border,
        position:'relative',
        overflow:'hidden'
    },
    lottie2: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      top:-50,
      left:20,
      width: 360,
      height: 390,
      transform: [{scaleX: 1}],
      zIndex: 1,
    },
    lottie: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      top:-7,
      left:5,
      width: 150,
      height: 200,
      transform: [{scaleX: 1}],
      zIndex: 2,
    },
})
export default LiveMap
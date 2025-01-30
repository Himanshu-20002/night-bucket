import {  ViewStyle, TouchableOpacity, Animated } from 'react-native'
import React, { FC } from 'react'

interface ScalepressProps{
    onPress?:()=>void;
    children:React.ReactNode;
    style?:ViewStyle;
}

const Scalepress:FC<ScalepressProps> = ({children,onPress,style}) => {
  const scaleValue =  new Animated.Value(1)
  const onPressIn = ()=>{
    Animated.spring(scaleValue,{
        toValue:0.92,
        useNativeDriver:true
    }).start()
  }
  const onPressOut = ()=>{
    Animated.spring(scaleValue,{
        toValue:1,
        useNativeDriver:true
    }).start()
  }
  return (
<TouchableOpacity
onPressIn={onPressIn}
onPressOut={onPressOut}
onPress={onPress}
style={{...style}}
>
  <Animated.View style={[{
    transform:[{scale:scaleValue}],
    width:'100%'
  }]}>
    {children}
  </Animated.View>
</TouchableOpacity>
  )
}

export default Scalepress
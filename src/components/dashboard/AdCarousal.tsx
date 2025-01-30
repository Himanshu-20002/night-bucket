import { View, Text, StyleSheet, Image } from 'react-native'
import React, { FC } from 'react'
import { useSharedValue } from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'
import { screenWidth } from '../../utils/Scaling'
import Scalepress from '@components/ui/Scalepress'

const AdCarousal:FC<{adData:any,height:number,width:number}> = ({adData ,height,width}) => {
    const progressValue = useSharedValue(0)
    const baseOptions={
        vertical:false,
        width:screenWidth,
        height:screenWidth*0.49,
    }
  return (
    <View style={{left:-25,}}>  
    <Carousel {...baseOptions}
    loop
    pagingEnabled
    autoPlay
    autoPlayInterval={3000}
    mode='parallax'
    data={adData}
    modeConfig={{
        parallaxScrollingOffset:0,
        parallaxScrollingScale:0.9,
    }}
    renderItem={({item}:any) => (
        <Scalepress style={{width ,height}}>
            <Image source={item} style={styles.img}/>
        </Scalepress>
    )}
    />
    </View>
  )
}

const styles = StyleSheet.create({
    imageContainer:{
        
    },
    img:{
        width:'100%',
        height:'100%',
        resizeMode:'cover',
        borderRadius:20,
    }
})

export default AdCarousal
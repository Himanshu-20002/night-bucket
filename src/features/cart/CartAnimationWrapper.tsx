import {FC, useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';
import { hocStyles } from '../../styles/GlobalStyles';

interface CartAnimationWrapperProps {
  cartCount: number;
  children: React.ReactNode;
}

const CartAnimationWrapper: FC<CartAnimationWrapperProps> = ({
  cartCount,
  children,
}) => {

    //creating animation is easy we first initialize the animation value and the we change that value to animate the view and get the desired effect 
    const slideAnimation = useRef(new Animated.Value(0)).current
    const [hasAnimated, setHasAnimated] = useState(false)

    useEffect(()=>{
        if(cartCount > 0 && !hasAnimated){
            Animated.timing(slideAnimation,{
                toValue:1,
                duration:300,
                useNativeDriver:true
            }).start(()=>{
                setHasAnimated(true)
            })
    } else if(cartCount === 0 && hasAnimated){
        Animated.timing(slideAnimation,{
            toValue:0,
            duration:300,
            useNativeDriver:true
        }).start(()=>{
            setHasAnimated(false)
        })
    }
  }, [cartCount, hasAnimated,]);

  const slideUpStyle = {
    transform:[{translateY:slideAnimation.interpolate({
        inputRange:[0,1],
        outputRange:[100,0]
    })}],
    opacity:slideAnimation
  }

  return(
    <Animated.View style={[hocStyles.cartContainer, slideUpStyle]}>
        {children}
    </Animated.View>
  )
};
export default CartAnimationWrapper;

import { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { useCartStore } from '../../state/cartStore';
import CartAnimationWrapper from './CartAnimationWrapper';
import CartSummary from './CartSummary';

const WithCart = <P extends object>(WrappedComponent: React.ComponentType<P>): FC<P> => {
  const WithCartComponent: FC<P> = (props) => {
    const cart = useCartStore(state => state.cart);
    const cartCount = cart.reduce((acc, item) => acc + item.count, 0);

    return (
      <View style={styles.container}>
        <WrappedComponent {...props} />
        <CartAnimationWrapper cartCount={cartCount}>
          <CartSummary
            cartCount={cartCount}
            cartImage={cart![0]?.item?.images[0] || null}
          />
        </CartAnimationWrapper>
      </View>
    );
  };

  return WithCartComponent; // Moved return statement here
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex:9999
  },
});

export default WithCart;

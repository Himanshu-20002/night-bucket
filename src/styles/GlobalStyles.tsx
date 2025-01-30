import {StyleSheet} from 'react-native';

export const hocStyles = StyleSheet.create({
  cartContainer: {
    position:'absolute',
    bottom: 0,
    
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 10,
    shadowOffset: {width: 1, height:1},
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
export const hocStyles2 = StyleSheet.create({
  cartContainer: {
    position:'absolute',
    bottom: 94,
    right: -17,
    width:"50%",
    height: 50,
    backgroundColor: '#00C8FF',
    borderRadius: 100,
    elevation: 10,
    shadowOffset: {width: 1, height:1},
    shadowColor: '#000',
    shadowOpacity: 0.3,
    zIndex:99999999999,
    shadowRadius: 5,
  },
});

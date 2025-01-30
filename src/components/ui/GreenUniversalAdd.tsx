import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '../../utils/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useCartStore} from '../../state/cartStore';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from './CustomText';

const GreenUniversalAdd: FC<{item: any}> = ({item}) => {
  const count = useCartStore(state => state.getItemCount(item._id));
  const {addItem, removeItem} = useCartStore();

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: count === 0 ? Colors.secondary : Colors.secondary},
      ]}>
      {count === 0 ? (
        <Pressable onPress={() => addItem(item)} style={styles.add}>
          <CustomText
            variant="h8"
            fontFamily={Fonts.SemiBold}
            style={styles.addText}>
            Add
          </CustomText>
        </Pressable>
      ) : (
        <View style={styles.counterContainer}>
          <Pressable onPress={() => removeItem(item._id)} style={styles.minus}>
            <Icon name="minus" size={RFValue(14)} color="#fff" />
          </Pressable>
          <CustomText
            variant="h8"
            fontFamily={Fonts.SemiBold}
            style={{color:'#dff'}}>
            {count}
          </CustomText>
          <Pressable onPress={() => addItem(item)} style={styles.plus}>
            <Icon name="plus" size={RFValue(14)} color="#fff" />
          </Pressable>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  minus: {
    backgroundColor: Colors.primary,
    borderRadius: 7,
    padding:2
  },
  plus: {
    backgroundColor: Colors.primary,
    borderRadius: 7,
    padding:2
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 7,
    width: 80,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: "100%",
    paddingHorizontal: 4,
    paddingVertical: 6,
    
  },
  add: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  addText: {
    color: '#fff',
  },
});

export default GreenUniversalAdd;

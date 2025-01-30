import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '../../utils/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useCartStore} from '../../state/cartStore';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from './CustomText';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';

const UniversalAdd: FC<{item: any}> = ({item}) => {
  const count = useCartStore(state => state.getItemCount(item._id));
  const {addItem, removeItem} = useCartStore();

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: count === 0? '#FFFFFF' : Colors.secondary},
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
          <Pressable onPress={() => removeItem(item._id)}>
            <Icon name="minus" size={RFValue(14)} color="#fff" />
          </Pressable>
          <CustomText
            variant="h8"
            fontFamily={Fonts.SemiBold}
            style={{color:'#dff'}}>
            {count}
          </CustomText>
          <Pressable onPress={() => addItem(item)}>
            <Icon name="plus" size={RFValue(14)} color="#fff" />
          </Pressable>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
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
    color: '#3C9E26',
  },
});

export default UniversalAdd;

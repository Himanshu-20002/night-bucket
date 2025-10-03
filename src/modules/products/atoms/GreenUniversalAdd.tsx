import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {FC} from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {RFValue} from 'react-native-responsive-fontsize';
import { useAppDispatch, useAppSelector } from '@store/reduxHook';
import { addItem, removeItem, selectItemCountById } from '@modules/cart/api/slice';
import { Colors } from '@utils/Constants';


const GreenUniversalAdd: FC<{item: any}> = ({item}) => {
 const count = useAppSelector(selectItemCountById(item._id));
 const dispatch = useAppDispatch();

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: count === 0 ? '#03C03C' :'#2a3439'},
      ]}>
      {count === 0 ? (
        <Pressable onPress={() => dispatch(addItem(item))} style={styles.add}>
        <Text
        style={styles.addText}>
        ADD
        </Text>
           
          
        </Pressable>
      ) : (
        <View style={styles.counterContainer}>
          <Pressable onPress={() => dispatch(removeItem(item))} style={styles.minus}>
            <Icon name="minus" size={RFValue(14)} color="#fff" />
          </Pressable>
          <Text
            style={{color:'#dff'}}>
            {count}
          </Text>
          <Pressable onPress={() => dispatch(addItem(item))} style={styles.plus}>
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
    backgroundColor:'#009E60',
    borderRadius: 7,
    padding:2
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
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

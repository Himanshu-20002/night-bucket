import { FC } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import  Icon  from 'react-native-vector-icons/Ionicons';
import React from 'react';


interface InputProps {
  left?: React.ReactNode;
  onClear?: () => void;
  right?: boolean;
}
const CustomInput: FC<InputProps & React.ComponentProps<typeof TextInput>> = ({
  left,
  right = true,
  onClear,
  ...props
}) => {
  return (
    <View style={styles.flexRow}>
        {left}
      <TextInput
        {...props}
        style={styles.inputContainer}
        placeholderTextColor='#ccc'
      />
      <View style={styles.icon}>
        {props.value?.length !==0 && right &&( 
        <TouchableOpacity onPress={onClear}>
          <Icon name="close-circle-outline" size={RFValue(16)} color={Colors.text} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  text: {
    width: '10%',
    marginRight: 90,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderRadius: 150,
    width: '95%',
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowColor: Colors.border,
    borderColor:Colors.border,
    elevation: 6,
    height: 50,
    marginBottom:10,
  },
  inputContainer:{
    width: '90%',
    flex:1,
    fontFamily: Fonts.SemiBold,
    fontSize: RFValue(13),
    paddingVertical: 0,
    paddingHorizontal: 15,
    color: Colors.text,
    lineHeight: 10,
    bottom: -1,
    height: '100%',
  },
  icon: {
    width: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    padding:10,
    fontSize: RFValue(13),
  },
});

export default CustomInput;

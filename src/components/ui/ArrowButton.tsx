import {View, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '../../utils/Constants';
import CustomText from './CustomText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
interface ArrowButtonProps {
  title: string;
  price?: number;
  onPress?: () => void;
  loading?: boolean;
}

const ArrowButton: FC<ArrowButtonProps> = ({
  price,
  title,
  onPress,
  loading,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {justifyContent: price != 0 ? 'space-between' : 'center'},
      ]}
      activeOpacity={0.9}
      disabled={loading}>
      {price != 0 && price && (
        <View >
          <CustomText
            variant="h7"
            fontFamily={Fonts.Medium}
            style={{color: 'white'}}>
            ₹{price + 39}.0
          </CustomText>
          <CustomText
            variant="h9"
            fontFamily={Fonts.Medium}
            style={{color: 'white'}}>
            TOTAL
          </CustomText>
        </View>
      )}
      <View style={styles.flexRow}>
        <CustomText variant="h6" fontFamily={Fonts.Medium} style={{color: 'white'}}>
          {title}
        </CustomText>
        {loading ? (
          <ActivityIndicator size="small" style={{marginHorizontal: 5}} color="white" />
        ) : (
          <Icon name="arrow-right" size={20} color="white" />
        )}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    marginHorizontal: 15,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    width: 20,
    height: 20,
  },
});
export default ArrowButton;

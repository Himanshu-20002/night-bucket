import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import CustomText from '../../utils/ui/ui';
import {FONTS} from '../../utils/Constants';
import {Colors} from '../../utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
// import {useAuthStore} from '@state/authStore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { navigate } from '../../utils/NavigationUtils';

const Header: FC = () => {
//   const {setUser, user} = useAuthStore();
  return (
    <View style={styles.subContainer}>
      <TouchableOpacity activeOpacity={0.8}>
        <CustomText fontFamily={FONTS.Bold} variant="h8" style={styles.text}>
          Delivery in
        </CustomText>
        <View style={styles.flexRowGap}>
          <CustomText
            fontFamily={FONTS.SemiBold}
            variant="h2"
            style={styles.text}>
            10 minutes
          </CustomText>
          <TouchableOpacity style={styles.noticeButton} >
            {/* onPress={showNotice} */}
            <CustomText
              fontSize={RFValue(5)}
              fontFamily={FONTS.SemiBold}
              variant="h8"
              style={{color: '#5c87ffff'}}>
              🌈 Rain
            </CustomText>
          </TouchableOpacity>
        </View>
        <View style={styles.flexRow}>
          <CustomText
            fontFamily={FONTS.Bold}
            variant="h8"
            numberOfLines={1}
            style={styles.text2}>
            addresss
          </CustomText>
          <Icon
            name="chevron-down"
              color="#fff"
              size={RFValue(20)}
            style={styles.menuDown}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity >
        <Icon name="account-circle-outline" color="#fff" size={RFValue(36)}  style={styles.profile}/>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  subContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'android' ? 15 : 5,
    justifyContent: 'flex-start',
    backgroundColor:'#f10808ff'
  },
  noticeButton: {
    backgroundColor: '#E8EAF5',
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    bottom: -2,
  },
  text: {
    color: '#FFFFFF',
  },
  flexRowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    width: '70%',
  },
  text2: {
    color: '#FFFFFF',
    width: '90%',
    textAlign: 'center',
  },
  menuDown: {
    bottom: -1,
  },
  profile: {
    bottom: -13,
    right: -75,
  },
});

export default Header;

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts } from '../../utils/Constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize'
import RollingBar from 'react-native-rolling-bar'
import CustomText from '@components/ui/CustomText'
import { navigate } from '@utils/NavigationUtils';
const SearchBar: FC = () => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={
      () => {
        navigate('SearchProducts')
      }
    }>
      <Icon name="curtains" color="#000000" size={RFValue(20)} style={styles.profile} />
      <RollingBar interval={3000} defaultStyle={false} customStyle={styles.textContainer}>
        <CustomText variant="h6" style={styles.Medium}>Search &quot;milk&quot;</CustomText>
        <CustomText variant="h6" style={styles.Medium}>Search &quot;jalabi&quot;</CustomText>
        <CustomText variant="h6" style={styles.Medium}>Search &quot;water&quot;</CustomText>
        <CustomText variant="h6" style={styles.Medium}>Search &quot;pooja thali&quot;</CustomText>
        <CustomText variant="h6" style={styles.Medium}>Search &quot;y-food&quot;</CustomText>
      </RollingBar>
      <View style={styles.divider} />
      <Icon name="microphone" color="#000000" size={RFValue(20)} style={styles.profile} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F7',
    paddingHorizontal: 10,
    marginTop:15,
    overflow: 'hidden',
    marginHorizontal: 10,
    borderRadius: 10,
  


  },
  textContainer: {
    width: '90%',
    paddingLeft: 10,
    height:50,
    backgroundColor: '#F3F4F7',
  },
  divider: {
    width: 1,
    height:24,
    backgroundColor: '#00000060',
    marginHorizontal: 10,
  },
  Medium: {
    fontFamily: Fonts.Medium,
  },
  profile: {
    marginRight: 10,
  },
})

export default SearchBar 
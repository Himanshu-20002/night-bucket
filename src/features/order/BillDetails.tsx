import {View, Text, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import CustomText from '../../components/ui/CustomText';
import {Colors, Fonts} from '../../utils/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';

const ReportItem:FC<{iconName:string,underLine?:boolean,title:string,price:number}> = ({iconName,underLine,title,price}) => {
    return(
        <View style={[styles.flexRowBetween,{marginBottom:10}]}>
            <View style={styles.flexRow}>
             <Icon name={iconName} size={RFValue(12)} style={{opacity:0.7}} color={Colors.text}/>
             <CustomText style={{textDecorationLine:underLine ? 'underline' :'none' ,textDecorationStyle:'dashed'}} variant='h8' fontFamily={Fonts.Medium}>{title}</CustomText>
            </View>
            <CustomText variant='h8' fontFamily={Fonts.Medium}>₹{price}</CustomText>
        </View>
    )

}
const BillDetails: FC<{totalItemPrice: number}> = ({totalItemPrice}) => {
  return (
    <View style={styles.container}>
      <CustomText variant="h6" fontFamily={Fonts.SemiBold} style={styles.text}>
        Bill Details
      </CustomText>
      <View style={styles.billContainer}>
        <ReportItem iconName='note-text-outline' title='Item Total' price={totalItemPrice}/>
        <ReportItem iconName='bike-fast' title='Delivery Charges' price={34}/>
        <ReportItem iconName='bat' title='Platform Charge' price={2}/>
        <ReportItem iconName='weather-lightning-rainy' title='Surge Charge' price={3}/>

      </View>

      <View style={[styles.flexRowBetween,{marginBottom:10}]}>
        <CustomText variant='h7' fontFamily={Fonts.SemiBold} style={styles.text}>Grand Total</CustomText>
        <CustomText variant='h7' fontFamily={Fonts.Medium}>₹{totalItemPrice +34+2+3}</CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 15,
  },
  text: {
    marginHorizontal: 10,
    marginTop: 15,
  },
  billContainer: {
    padding: 10,
    paddingBottom: 0,
    borderBottomColor: '#CEDCF5',
    borderBottomWidth: 0.7,
  },
  flexRowBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',

    marginRight: 10,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
export default BillDetails;

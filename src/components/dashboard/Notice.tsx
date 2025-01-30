import { View, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { NoticeHeight } from '../../utils/Scaling'
import CustomText from '@components/ui/CustomText'
import { Colors, Fonts } from '../../utils/Constants'
import Svg from 'react-native-svg'
import { Defs, Path, G, Use } from 'react-native-svg'
import { wavyData } from '../../utils/dummyData'
import { useAuthStore } from '@state/authStore'
import { navigate } from '../../utils/NavigationUtils'

const Notice = () => {
  const { currentOrder } = useAuthStore();

  if (currentOrder) {
    return (
      <View style={{height: NoticeHeight}}>
        <View style={[styles.Container, { backgroundColor: Colors.secondary }]}>   
          <View style={styles.noticeContainer}>
            <SafeAreaView style={{padding: 10}}>
              <View style={styles.orderContent}>
                <View style={styles.flexRow}>
                  <View style={styles.iconContainer}>
                    <Image 
                      source={require('../../assets/icons/bucket.png')} 
                      style={styles.cartIcon} 
                    />
                  </View>
                  <View style={styles.orderDetails}>
                    <CustomText style={styles.orderStatus} variant='h8' fontFamily={Fonts.SemiBold}>
                      Order is {currentOrder.status}
                    </CustomText>
                    <CustomText style={styles.orderItems} variant='h9' fontFamily={Fonts.Medium}>
                      {currentOrder.items?.[0]?.item.name}
                      {currentOrder.items?.length > 1 ? 
                        ` and ${currentOrder.items.length - 1} more items` : 
                        ''}
                    </CustomText>
                  </View>
                  <TouchableOpacity 
                    style={styles.viewButton}
                    onPress={() => navigate('LiveTracking')}
                  >
                    <CustomText 
                      variant='h9' 
                      style={styles.buttonText} 
                      fontFamily={Fonts.Medium}
                    >
                      View Order
                    </CustomText>
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          </View>
        </View>
        <Svg
          width='100%'
          height='35'
          fill={Colors.secondary}
          viewBox='0 0 4000 1000'
          preserveAspectRatio='none'
          style={styles.wave}
        >
          <Defs>
            <Path id='wavepath' d={wavyData} />
          </Defs>
          <G>
            <Use href='#wavepath' y="321"/>
          </G>
        </Svg>
      </View>
    )
  }

  // Default weather notice
  return (
    <View style={{height: NoticeHeight}}>
      <View style={styles.Container}>   
        <View style={styles.noticeContainer}>
          <SafeAreaView style={{padding: 10}}>
            <View style={styles.noticeContent}>
              <CustomText style={styles.heading} variant='h8' fontFamily={Fonts.SemiBold}>
                It's raining near this location 
              </CustomText>
              <CustomText style={styles.textCenter} variant='h9'>
                Our Delivery Partner may take longer to reach you
              </CustomText>
            </View>
          </SafeAreaView>
        </View>
      </View>
      <Svg
        width='100%'
        height='35'
        fill='#CCD5E4'
        viewBox='0 0 4000 1000'
        preserveAspectRatio='none'
        style={styles.wave}
      >
        <Defs>
          <Path id='wavepath' d={wavyData} />
        </Defs>
        <G>
          <Use href='#wavepath' y="321"/>
        </G>
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: '#CCD5E4',
    },
    noticeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    noticeContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    orderContent: {
        width: '100%',
        paddingHorizontal: 10,
    },
    heading: {
        color: '#2D3875',
        marginBottom: 8,
        textAlign: 'center'
    },
    textCenter: {
        textAlign: 'center',
        marginBottom: 8
    },
    wave: {
        width: '100%',
        transform: [{rotate: '180deg'}],
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    iconContainer: {
        backgroundColor: Colors.backgroundSecondary,
        borderRadius: 100,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cartIcon: {
        width: 20,
        height: 20
    },
    orderDetails: {
        flex: 1,
        paddingHorizontal: 10,
    },
    orderStatus: {
        color: Colors.white,
    },
    orderItems: {
        color: Colors.white,
        opacity: 0.8,
    },
    viewButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.white,
        backgroundColor: 'transparent',
    },
    buttonText: {
        color: Colors.white,
    }
});

export default Notice;
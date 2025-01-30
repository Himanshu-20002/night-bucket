import {View, StyleSheet, Animated as RNAnimated} from 'react-native';
import React, {FC} from 'react';
import {NoticeHeight} from '../../utils/Scaling';
import Notice from '../../components/dashboard/Notice';

//The NOTICE_HEIGHT constant is used to position the notice off-screen above the visible content. It is calculated as the negative of the NoticeHeight plus 12 pixels to ensure it is completely hidden.
const NOTICE_HEIGHT = -(NoticeHeight + 12);

const NoticeAnimation: FC<{
  noticePosition: any;
  children: React.ReactElement;
}> = ({noticePosition, children}) => {
  return (
    <View style={styles.container}>
      <RNAnimated.View
        style={[
          styles.noticeContainer,
          {
            transform: [
              {
                translateY: noticePosition,
              },
            ],
          },
        ]}>
        <Notice />
      </RNAnimated.View>
      <RNAnimated.View
        style={[
          styles.contentContainer,
          {
            paddingTop: noticePosition.interpolate({
              inputRange: [NOTICE_HEIGHT, 0],
              outputRange: [0, NoticeHeight + 20],
            }),
          },
        ]}>
        {children}
      </RNAnimated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  noticeContainer: {
    width: '100%',
    zIndex: 999,
    position: 'absolute',
    top: 0,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#524093',
  },
});

export default NoticeAnimation;

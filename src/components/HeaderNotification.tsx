import React from 'react';
import {Animated, StyleSheet, Text} from 'react-native';
import {NotificationContext} from '../context/NotificationProvider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const HeaderNotification = () => {
  const context = React.useContext(NotificationContext);
  const insets = useSafeAreaInsets();
  const headerHeight = insets.top;
  const animValue = React.useRef(new Animated.Value(-40)).current;

  const fadeOut = React.useCallback(() => {
    Animated.timing(animValue, {
      toValue: -40,
      duration: 500,
      useNativeDriver: false,
    }).start(() => context.setNotification(null));
  }, [animValue, context]);

  const fadeIn = React.useCallback(() => {
    Animated.timing(animValue, {
      toValue: headerHeight,
      duration: 500,
      useNativeDriver: false,
    }).start(() =>
      setTimeout(() => {
        fadeOut();
      }, 2000),
    );
  }, [animValue, fadeOut, headerHeight]);

  React.useEffect(() => {
    context.notification && fadeIn();
  }, [context.notification, fadeIn]);

  const textColor = () => {
    switch (context.notification?.type) {
      case 'error':
        return 'pink';
      case 'success':
        return 'lightgreen';
      default:
        return 'lightgray';
    }
  };

  return (
    <Animated.View style={[styles.animated, {top: animValue}]}>
      <Text style={{color: textColor()}}>{context.notification?.title}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animated: {
    position: 'absolute',
    left: 16,
    right: 16,
    height: 40,
    backgroundColor: 'pink',
    justifyContent: 'center',
    paddingLeft: 16,
    borderRadius: 16,
  },
});

import React from 'react';
import {SignInScreen} from '../screens/auth/SignInScreen';
import {SignUpScreen} from '../screens/auth/SignUpScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './StackParamList';

export const AuthNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        statusBarTranslucent: true,
        statusBarColor: 'transparent',
        headerShown: false,
      }}>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

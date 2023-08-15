import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './StackParamList';
import {TabNavigation} from './TabNavigation';
import {CartScreen, ItemScreen} from '../screens/main';

export const MainNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarTranslucent: true,
        statusBarColor: 'transparent',
        headerStyle: {backgroundColor: 'red'},
      }}
      initialRouteName="TabNavigation">
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="ItemScreen" component={ItemScreen} />
    </Stack.Navigator>
  );
};

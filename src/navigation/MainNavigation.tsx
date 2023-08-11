import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './StackParamList';
import {TabNavigation} from './TabNavigation';
import {CartList, ItemList} from '../screens/main';

export const MainNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        statusBarTranslucent: true,
        statusBarColor: 'transparent',
        headerShown: false,
      }}
      initialRouteName="TabNavigation">
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
      <Stack.Screen name="CartScreen" component={CartList} />
      <Stack.Screen name="ItemScreen" component={ItemList} />
    </Stack.Navigator>
  );
};

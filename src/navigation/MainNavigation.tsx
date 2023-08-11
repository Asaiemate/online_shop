import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './StackParamList';
import {TabNavigation} from './TabNavigation';
import {CartList, ItemList} from '../screens/main';
import {Text} from 'react-native';

export const MainNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const header = () => <Text>Header</Text>;

  return (
    <Stack.Navigator
      screenOptions={{
        statusBarTranslucent: true,
        statusBarColor: 'transparent',
        header,
      }}
      initialRouteName="TabNavigation">
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
      <Stack.Screen name="CartScreen" component={CartList} />
      <Stack.Screen name="ItemScreen" component={ItemList} />
    </Stack.Navigator>
  );
};

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ItemsList, Profile} from '../screens/main';

export const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="ItemsList" component={ItemsList} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

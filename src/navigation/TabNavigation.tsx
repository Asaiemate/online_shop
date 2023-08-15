import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProductsScreen, ProfileScreen} from '../screens/main';
import {RootStackParamList} from './StackParamList';
import {List, Profile} from '../icons';

export const TabNavigation = () => {
  const Tab = createBottomTabNavigator<RootStackParamList>();

  const ItemsListIcon = React.useCallback((focused: boolean) => {
    return <List color={focused ? 'black' : 'gray'} />;
  }, []);

  const ProfileIcon = React.useCallback((focused: boolean) => {
    return <Profile color={focused ? 'black' : 'gray'} />;
  }, []);

  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarLabelStyle: {fontSize: 16},
        tabBarStyle: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          paddingVertical: 4,
        },
      })}>
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarIcon: ({focused}) => ItemsListIcon(focused),
          tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: 'black',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => ProfileIcon(focused),
          tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: 'black',
        }}
      />
    </Tab.Navigator>
  );
};

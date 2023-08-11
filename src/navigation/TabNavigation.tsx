import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ItemsList} from '../screens/main';
import {RootStackParamList} from './StackParamList';
import {List, Profile} from '../icons';

export const TabNavigation = () => {
  const Tab = createBottomTabNavigator<RootStackParamList>();

  const ItemsListIcon = React.useCallback((focused: boolean) => {
    return <List color={focused ? 'blue' : 'black'} />;
  }, []);

  const ProfileIcon = React.useCallback((focused: boolean) => {
    return <Profile color={focused ? 'blue' : 'black'} />;
  }, []);

  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarLabelStyle: {fontSize: 16},
        tabBarStyle: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          paddingVertical: 16,
          hight: 40,
        },
      })}>
      <Tab.Screen
        name="ItemsList"
        component={ItemsList}
        options={{tabBarIcon: ({focused}) => ItemsListIcon(focused)}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => ProfileIcon(focused),
        }}
      />
    </Tab.Navigator>
  );
};

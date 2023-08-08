import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainNavigation} from './MainNavigation';
import {AuthNavigation} from './AuthNavigation';
import {useAppSelector} from '../redux/store';

const Navigation = () => {
  const isSignedIn = useAppSelector(state => state.auth.token);

  return (
    <NavigationContainer>
      {isSignedIn ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;

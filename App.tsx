import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import {NotificationProvider} from './src/context/NotificationProvider';
import {HeaderNotification} from './src/components/HeaderNotification';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <NotificationProvider>
        <Navigation />
        <HeaderNotification />
      </NotificationProvider>
    </SafeAreaProvider>
  );
}

export default App;

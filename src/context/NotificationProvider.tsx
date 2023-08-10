import React from 'react';
import {ViewProps} from 'react-native';

export interface IHeaderNotification {
  title: string;
  type: 'error' | 'success';
}

interface Props extends ViewProps {}

export const NotificationContext = React.createContext<{
  notification: IHeaderNotification | null;
  setNotification: (notification: IHeaderNotification | null) => void;
}>({
  notification: null,
  setNotification: () => null,
});

export const NotificationProvider = (props: Props) => {
  const {children} = props;
  const [notification, setNotification] =
    React.useState<IHeaderNotification | null>(null);

  return (
    <NotificationContext.Provider
      value={{
        notification,
        setNotification,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};

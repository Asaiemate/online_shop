import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../navigation/StackParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>;

export const SignUpScreen = (props: Props) => {
  return (
    <SafeAreaView>
      <Text>SignUpScreen</Text>
    </SafeAreaView>
  );
};

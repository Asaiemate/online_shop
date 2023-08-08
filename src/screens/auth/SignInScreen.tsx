import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppDispatch} from '../../redux/store';
import {Controller, useForm} from 'react-hook-form';
import {Field} from '../../components/Field';
import {User} from '../../icons/user';
import {Password} from '../../icons/password';

interface IFormProps {
  username: string;
  password: string;
}

export const SignInScreen = () => {
  const dispatch = useAppDispatch;

  const {control, handleSubmit} = useForm<IFormProps>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const submit = () => {};

  const goToSignUp = () => {};

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <Text>Welcome Back</Text>

      <Text>Login to continue</Text>

      <Controller
        control={control}
        name="username"
        rules={{
          required: {
            value: true,
            message: 'Required field',
          },
        }}
        render={({field: {value, onChange}}) => (
          <Field
            label="Username"
            value={value}
            onChangeText={onChange}
            icon={<User />}
            placeholder="Username"
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{
          required: {
            value: true,
            message: 'Required field',
          },
        }}
        render={({field: {value, onChange}}) => (
          <Field
            label="Password"
            value={value}
            onChangeText={onChange}
            icon={<Password />}
            placeholder="Password"
          />
        )}
      />

      <Button title="Sign in" onPress={handleSubmit(submit)} />

      <View style={styles.signUp}>
        <Text>Don't have an account?</Text>
        <Text onPress={goToSignUp}>Sign up</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  signUp: {
    flexDirection: 'row',
  },
});

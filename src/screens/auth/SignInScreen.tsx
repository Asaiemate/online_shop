import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppDispatch} from '../../redux/store';
import {Controller, useForm} from 'react-hook-form';
import {Field} from '../../components/Field';
import {User} from '../../icons';
import {Password} from '../../icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/StackParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'SignInScreen'>;

interface IFormProps {
  username: string;
  password: string;
}

export const SignInScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch;

  const {control, handleSubmit} = useForm<IFormProps>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const submit = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Welcome Back</Text>

        <Text style={styles.title}>Login to continue</Text>
      </View>

      <View>
        <Controller
          control={control}
          name="username"
          rules={{
            required: {
              value: true,
              message: 'Required field',
            },
          }}
          render={({field: {value, onChange}, fieldState: {error}}) => (
            <Field
              containerStyle={styles.field}
              label="Username"
              value={value}
              onChangeText={onChange}
              icon={<User />}
              placeholder="Username"
              error={error?.message}
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
          render={({field: {value, onChange}, fieldState: {error}}) => (
            <Field
              containerStyle={styles.field}
              label="Password"
              value={value}
              onChangeText={onChange}
              icon={<Password />}
              placeholder="Password"
              password
              error={error?.message}
            />
          )}
        />
      </View>

      <View style={styles.footer}>
        <Button title="Sign in" onPress={handleSubmit(submit)} />

        <View style={styles.signUpWrapper}>
          <Text>Don't have an account?</Text>
          <Text
            onPress={() => navigation.navigate('SignUpScreen')}
            style={styles.signUp}>
            Sign up
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {textAlign: 'center', fontSize: 24, marginTop: 24},
  field: {
    marginTop: 16,
  },
  footer: {marginHorizontal: 16},
  signUpWrapper: {
    marginTop: 8,
    flexDirection: 'row',
  },
  signUp: {
    fontWeight: '800',
  },
});

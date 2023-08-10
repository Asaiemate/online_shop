import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {Controller, useForm} from 'react-hook-form';
import {Field} from '../../components/Field';
import {User} from '../../icons';
import {Password} from '../../icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/StackParamList';
import {SignInThunk} from '../../redux/thunks/auth';
import {NotificationContext} from '../../context/NotificationProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'SignInScreen'>;

interface IFormProps {
  username: string;
  password: string;
}

export const SignInScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.auth.status);

  const notification = React.useContext(NotificationContext);

  const {control, handleSubmit} = useForm<IFormProps>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const submit = async (data: IFormProps) => {
    dispatch(SignInThunk({username: data.username, password: data.password}));
  };

  useEffect(() => {
    switch (status) {
      case 'failed':
        notification.setNotification({
          title: 'Ошибка авторизации',
          type: 'error',
        });
        break;
      case 'success':
        notification.setNotification({
          title: 'Авторизация успешна',
          type: 'success',
        });
        break;
    }
  }, [notification, status]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{'Welcome Back \n Login to continue'}</Text>

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
          <Text>Don't have an account? </Text>
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
  title: {textAlign: 'center', fontSize: 24, lineHeight: 40},
  field: {
    marginTop: 16,
  },
  footer: {marginHorizontal: 16},
  signUpWrapper: {
    marginTop: 16,
    flexDirection: 'row',
  },
  signUp: {
    fontWeight: '800',
  },
});

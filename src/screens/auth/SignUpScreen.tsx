import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Controller, useForm} from 'react-hook-form';
import {Field} from '../../components/Field';
import {User} from '../../icons';
import {Password} from '../../icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/StackParamList';
import {RadioButton} from '../../components/RadioButton';
import {CircleImage} from '../../components/CircleImage';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {SignUpThunk} from '../../redux/thunks/auth';
import {NotificationContext} from '../../context/NotificationProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>;

interface IFormProps {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female';
  imageUrl: string | null;
  password: string;
}

export const SignUpScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const notification = React.useContext(NotificationContext);
  const status = useAppSelector(state => state.auth.status);

  const {control, watch, setValue, handleSubmit} = useForm<IFormProps>({
    defaultValues: {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      gender: 'Male',
      imageUrl: '',
      password: '',
    },
  });

  const submit = async (data: IFormProps) => {
    await dispatch(
      SignUpThunk({
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        image: data.imageUrl ?? '',
        password: data.password,
      }),
    );
    switch (status) {
      case 'failed':
        notification.setNotification({
          title: 'Ошибка добавление пользователя',
          type: 'error',
        });
        break;
      case 'success':
        notification.setNotification({
          title: 'Учетная запись добавлена',
          type: 'success',
        });
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create account</Text>

      <CircleImage
        imageUrl={watch('imageUrl')}
        setImageUrl={url => setValue('imageUrl', url)}
      />

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

        <Controller
          control={control}
          name="firstName"
          rules={{
            required: {
              value: true,
              message: 'Required field',
            },
          }}
          render={({field: {value, onChange}, fieldState: {error}}) => (
            <Field
              containerStyle={styles.field}
              label="FirstName"
              value={value}
              onChangeText={onChange}
              icon={<User />}
              placeholder="FirstName"
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="lastName"
          rules={{
            required: {
              value: true,
              message: 'Required field',
            },
          }}
          render={({field: {value, onChange}, fieldState: {error}}) => (
            <Field
              containerStyle={styles.field}
              label="LastName"
              value={value}
              onChangeText={onChange}
              icon={<User />}
              placeholder="LastName"
              error={error?.message}
            />
          )}
        />

        <View style={styles.genderWrapper}>
          <RadioButton
            label="Male"
            containerStyle={styles.field}
            checked={watch('gender') === 'Male'}
            onPress={() => setValue('gender', 'Male')}
          />
          <RadioButton
            label="Female"
            containerStyle={styles.field}
            checked={watch('gender') === 'Female'}
            onPress={() => setValue('gender', 'Female')}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Button title="Sign up" onPress={handleSubmit(submit)} />

        <View style={styles.signInWrapper}>
          <Text>Have an account already? </Text>
          <Text
            onPress={() => navigation.navigate('SignInScreen')}
            style={styles.signIn}>
            Sign in
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
  genderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
  },
  footer: {marginHorizontal: 16},
  signInWrapper: {
    marginTop: 16,
    flexDirection: 'row',
  },
  signIn: {
    fontWeight: '800',
  },
});

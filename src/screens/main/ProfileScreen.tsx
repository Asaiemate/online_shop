import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Controller, useForm} from 'react-hook-form';
import {Logout, User} from '../../icons';
import {RadioButton, CircleImage, Field, Button} from '../../components';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {clearToken} from '../../redux/redusers/AuthSlice';

interface IFormProps {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  imageUrl: string | null;
  password: string;
}

export const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const deleteUser = () => dispatch(clearToken());

  const user = useAppSelector(state => state.auth);

  const {control, watch, setValue, handleSubmit} = useForm<IFormProps>({
    defaultValues: {
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      imageUrl: user.image,
    },
  });

  const submit = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {<Text style={styles.title}>{user.firstName || 'Hi user'}</Text>}
        {user.lastName && <Text style={styles.title}>, {user.lastName}</Text>}
        <TouchableOpacity onPress={deleteUser} style={styles.logout}>
          <Logout />
        </TouchableOpacity>
      </View>

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
            label="male"
            containerStyle={styles.field}
            checked={watch('gender') === 'male'}
            onPress={() => setValue('gender', 'male')}
          />
          <RadioButton
            label="female"
            containerStyle={styles.field}
            checked={watch('gender') === 'female'}
            onPress={() => setValue('gender', 'female')}
          />
        </View>
      </View>

      <Button
        containerStyle={styles.footer}
        text="Save"
        onPress={handleSubmit(submit)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  title: {textAlign: 'center', fontSize: 24, lineHeight: 40},
  logout: {flex: 1, alignItems: 'flex-end'},
  field: {
    marginTop: 16,
  },
  genderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
  },
  footer: {marginHorizontal: 16},
});

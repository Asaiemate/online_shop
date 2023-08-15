import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Eye} from '../icons';
import React from 'react';

interface Props extends TextInputProps {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  icon: React.ReactNode;
  password?: boolean;
  error?: string;
}

export const Field = ({
  label,
  containerStyle,
  icon,
  password,
  error,
  ...rest
}: Props) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(true);

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <Text>{label}</Text>
      <View style={styles.inputWrapper}>
        {icon}
        <TextInput
          {...rest}
          style={styles.input}
          secureTextEntry={!!password && secureTextEntry}
        />
        {password === undefined ? null : (
          <TouchableOpacity onPress={() => setSecureTextEntry(pre => !pre)}>
            <Eye close={secureTextEntry} />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginHorizontal: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 20,
  },
  input: {flex: 1},
  error: {
    color: 'red',
    marginTop: 8,
  },
});

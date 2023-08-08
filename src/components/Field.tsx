import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewProps,
} from 'react-native';
import {Eye} from '../icons/Eye';

interface Props extends TextInputProps {
  label: string;
  containerStyle?: StyleProp<ViewProps>;
  icon: React.ReactNode;
  password?: boolean;
}

export const Field = ({
  label,
  containerStyle,
  icon,
  password,
  ...rest
}: Props) => {
  return (
    <View style={[containerStyle, styles.containerStyle]}>
      <Text>{label}</Text>
      <View style={styles.input}>
        {icon}
        <TextInput {...rest} />
        {password === undefined ? null : <Eye close={password} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginHorizontal: 16,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

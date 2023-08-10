import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {RadioIcon} from '../icons';

interface Props {
  label: string;
  checked: boolean;
  onPress: (value: boolean) => void;
  containerStyle: StyleProp<ViewStyle>;
}

export const RadioButton = (props: Props) => {
  const {label, checked, onPress, containerStyle} = props;
  return (
    <TouchableOpacity
      onPress={() => onPress(!checked)}
      style={[styles.container, containerStyle]}>
      <Text>{label}</Text>
      <RadioIcon checked={checked} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    padding: 10,
    flexDirection: 'row',
  },
});

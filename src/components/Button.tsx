import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface Props {
  text: string;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export const Button = (props: Props) => {
  const {text, onPress, containerStyle} = props;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, containerStyle]}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'lightgray',
    marginHorizontal: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

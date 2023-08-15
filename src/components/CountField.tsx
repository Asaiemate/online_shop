import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface Props {
  changeCount: (number: number, index?: number) => void;
  index?: number;
  count: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export const CountField = (props: Props) => {
  const {changeCount, index, count, containerStyle} = props;
  return (
    <View style={[styles.countWrapper, containerStyle]}>
      <TouchableOpacity onPress={() => changeCount(count + 1, index)}>
        <Text style={styles.operator}>+</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.count}
        keyboardType="numeric"
        value={count.toString()}
        onChangeText={text => changeCount(+text, index)}
      />
      <TouchableOpacity onPress={() => changeCount(count - 1, index)}>
        <Text style={styles.operator}>—</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  countWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  operator: {
    fontSize: 20,
    backgroundColor: 'lightgray',
    borderRadius: 4,
    width: 40,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  count: {
    borderWidth: 1,
    height: 40,
    borderColor: 'lightgray',
    marginHorizontal: 2,
    borderRadius: 4,
    textAlign: 'right',
  },
});

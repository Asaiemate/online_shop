import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const TextWrapper = ({title, text}: {title: string; text: string}) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <View style={styles.textWrapper}>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 16,
  },
});

import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useAppSelector} from '../../redux/store';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ItemSeparatorComponent} from './ItemsList';

export const CartScreen = () => {
  const cart = useAppSelector(state => state.cart);
  return (
    <SafeAreaView>
      <FlatList
        data={cart}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: 'gray',
    marginHorizontal: 16,
  },
});

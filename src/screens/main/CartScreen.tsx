import React from 'react';
import {FlatList, StyleSheet, Text, View, Image, Button} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ItemSeparatorComponent} from './ItemsList';
import {CountField} from '../../components/CountField';
import {
  changeCount,
  clearList,
  deleteProduct,
} from '../../redux/redusers/CartSlice';

export const CartScreen = () => {
  const cart = useAppSelector(state => state.cart.cart);
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView>
      <Button title="button" onPress={() => dispatch(clearList())} />
      <FlatList
        data={cart}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={({item, index}) => (
          <View style={styles.item}>
            <Image
              source={{uri: item.images[0]}}
              width={100}
              height={100}
              style={styles.image}
            />
            <View>
              <Text>Name: {item.title}</Text>
              <Text>brand: {item.brand}</Text>
              <Text>category: {item.category}</Text>
              <CountField
                changeCount={(count, _index) => {
                  count
                    ? dispatch(changeCount({index: _index, count}))
                    : dispatch(deleteProduct({id: item.id}));
                }}
                count={item.count}
                index={index}
              />
            </View>
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  image: {
    borderRadius: 16,
    marginRight: 16,
  },
});

import React from 'react';
import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ItemSeparatorComponent} from './ProductsScreen';
import {CountField, Button} from '../../components';
import {
  changeCount,
  clearList,
  deleteProduct,
} from '../../redux/redusers/CartSlice';
import {SearchField} from '../../components/SearchField';

export const CartScreen = () => {
  const cart = useAppSelector(state => state.cart.cart);
  const dispatch = useAppDispatch();
  const [search, setSearch] = React.useState<string>('');
  const filterList = cart.filter(product => product.title.includes(search));

  return (
    <SafeAreaView style={styles.container}>
      <SearchField value={search} onChange={setSearch} back />
      <FlatList
        data={filterList}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
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
      <Button
        text="Buy"
        onPress={() => dispatch(clearList())}
        containerStyle={styles.button}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 24,
    paddingBottom: 40 + 8 + 16,
  },
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
  button: {
    marginTop: 16,
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
  },
});

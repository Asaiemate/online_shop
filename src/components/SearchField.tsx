import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {Back, Cart, Search} from '../icons';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/StackParamList';
import {useAppSelector} from '../redux/store';

interface Props {
  value: string;
  onChange: (value: string) => void;
  cart?: boolean;
  back?: boolean;
}

export const SearchField = (props: Props) => {
  const {cart, value, onChange, back} = props;
  const cartItemCount = useAppSelector(state =>
    state.cart.cart.length > 0
      ? state.cart.cart
          .map(item => item.count)
          .reduce((prev, cur) => prev + cur)
      : 0,
  );

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.searchWrapper}>
      {back ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}>
          <Back />
        </TouchableOpacity>
      ) : null}
      <View style={styles.search}>
        <Search />

        <TextInput
          style={styles.searchInput}
          value={value}
          onChangeText={onChange}
        />
      </View>

      {cart ? (
        <TouchableOpacity
          style={styles.headerCart}
          onPress={() => navigation.navigate('CartScreen')}>
          <Cart />

          <Text style={styles.cartCount}>{cartItemCount}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  headerCart: {
    padding: 8,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCount: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: 'white',
    backgroundColor: 'gray',
    fontWeight: '900',
    borderRadius: 4,
    paddingHorizontal: 2,
  },
  searchWrapper: {flexDirection: 'row'},
  back: {
    justifyContent: 'center',
    padding: 8,
    marginLeft: 16,
  },
  search: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'gray',
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    flex: 1,
  },
  searchInput: {flex: 1},
});

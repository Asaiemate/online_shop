import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../navigation/StackParamList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Cart, Filter} from '../../icons';
import ReactNativeModal from 'react-native-modal';
import {addProduct} from '../../redux/redusers/CartSlice';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {CountField} from '../../components/CountField';
import {Search} from '../../icons/Search';
import useDebounce from '../../hooks/useDebounce';

type Props = NativeStackScreenProps<RootStackParamList, 'ItemsList'>;

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  count: number;
}

export const ItemsList = (props: Props) => {
  const {navigation} = props;
  const {width: deviceWidth, height: deviceHeight} = Dimensions.get('screen');
  const imageSize = (deviceWidth - 60) / 2;
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);

  const [productList, setProductList] = React.useState<IProduct[]>([]);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [modal, setModal] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>('');

  const closeModal = () => setModal(false);

  const getProducts = async (text?: string) => {
    try {
      const response = text
        ? await fetch(`https://dummyjson.com/products/search?q=${text}`)
        : await fetch('https://dummyjson.com/products');
      const responseJSON = await response.json();
      const products: IProduct[] = responseJSON.products.map(
        (product: IProduct) => ({...product, count: 1}),
      );
      setProductList(products);
    } catch (err) {
      console.log('err', err);
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      const responseJSON = await response.json();
      setCategories(responseJSON);
    } catch (err) {
      console.log('err', err);
    }
  };

  const categoryHandle = async (category: string) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}`,
      );
      const responseJSON = await response.json();
      const products: IProduct[] = responseJSON.products.map(
        (product: IProduct) => ({...product, count: 0}),
      );
      setProductList(products);
    } catch (err) {
      console.log('err', err);
    }
    closeModal();
  };

  const goToItemScreen = (product: IProduct) => {
    navigation.navigate('ItemScreen', product);
  };

  const toCart = (product: IProduct) => {
    dispatch(addProduct(product));
  };

  const changeCount = (number: number, index: number) => {
    console.log('changeCount');
    console.log('number', number);
    console.log('index', index);
    setProductList(list => {
      let temp = [...list];
      temp[index].count = number;
      return temp;
    });
  };

  useDebounce(() => getProducts(search), 1000, [search]);

  React.useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchWrapper}>
        <View style={styles.search}>
          <Search />

          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <TouchableOpacity
          style={styles.headerCart}
          onPress={() => navigation.navigate('CartScreen')}>
          <Cart />

          <Text style={styles.cartCount}>{cart.length}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text>Catalog</Text>
        <TouchableOpacity onPress={() => setModal(true)}>
          <Filter />
        </TouchableOpacity>
      </View>

      <FlatList
        data={productList}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => goToItemScreen(item)}
            style={styles.item}>
            <Image
              source={{uri: item.images[0]}}
              style={[styles.image, {width: imageSize, height: imageSize}]}
            />
            <Text>{item.title}</Text>

            <View style={styles.textWrapper}>
              <Text>$ {item.price}</Text>
              <TouchableOpacity
                onPress={() => toCart(item)}
                style={styles.cart}>
                <Cart />
              </TouchableOpacity>
            </View>
            <CountField
              count={item.count}
              index={index}
              changeCount={(count, _index) => {
                return _index === undefined ? null : changeCount(count, _index);
              }}
            />
          </TouchableOpacity>
        )}
      />
      <ReactNativeModal
        isVisible={modal}
        statusBarTranslucent={true}
        backdropOpacity={0.5}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        onSwipeComplete={closeModal}
        style={styles.modal}
        swipeDirection={'down'}
        deviceHeight={deviceHeight}
        deviceWidth={deviceWidth}
        propagateSwipe={true}
        backdropTransitionOutTiming={0}>
        <View>
          <FlatList
            style={{height: deviceHeight * 0.9}}
            contentContainerStyle={styles.modalContainer}
            data={categories}
            ItemSeparatorComponent={ItemSeparatorComponent}
            ListHeaderComponent={
              <Text style={styles.modalTitle}>Категории товаров</Text>
            }
            renderItem={({item}) => (
              <Text
                style={styles.modalItem}
                onPress={() => categoryHandle(item)}>
                {item}
              </Text>
            )}
          />
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};
const ItemSeparatorComponent = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchWrapper: {flexDirection: 'row'},
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 16,
  },
  content: {marginHorizontal: 12},
  item: {
    borderRadius: 16,
    padding: 4,
    flex: 1,
    margin: 4,
    backgroundColor: 'white',
  },
  image: {
    borderRadius: 16,
  },
  textWrapper: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cart: {
    padding: 4,
  },

  modal: {justifyContent: 'flex-end', margin: 0},
  modalContainer: {
    backgroundColor: 'lightgray',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    minHeight: 100,
  },
  modalItem: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'gray',
  },
  modalTitle: {
    textAlign: 'center',
    lineHeight: 40,
  },
  separator: {
    height: 10,
  },
});

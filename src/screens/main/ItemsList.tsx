import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../navigation/StackParamList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Cart, Filter} from '../../icons';
import ReactNativeModal from 'react-native-modal';

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
  const [productList, setProductList] = React.useState<IProduct[]>([]);
  const {width: deviceWidth, height: deviceHeight} = Dimensions.get('screen');
  const imageSize = (deviceWidth - 60) / 2;
  const [modal, setModal] = React.useState<boolean>(false);

  const closeModal = () => setModal(false);

  const getProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const responseJSON = await response.json();
      const products: IProduct[] = responseJSON.products.map(
        (product: IProduct) => ({...product, count: 0}),
      );
      setProductList(products);
    } catch (err) {
      console.log('err', err);
    }
  };

  React.useEffect(() => {
    console.log('Meow');
    getProducts();
  }, []);

  const goToItemScreen = (product: IProduct) => {
    navigation.navigate('ItemScreen', product);
  };

  const toCart = (product: IProduct) => {
    navigation.navigate('CartScreen', product);
  };

  const changeCount = (index: number, number: number) => {
    setProductList(list => {
      let temp = [...list];
      temp[index].count = number;
      return temp;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
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
            <View style={styles.countWrapper}>
              <TouchableOpacity
                onPress={() => changeCount(index, ++item.count)}>
                <Text style={styles.operator}>+</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.count}
                keyboardType="numeric"
                value={item.count.toString()}
                onChangeText={text => changeCount(index, +text)}
              />
              <TouchableOpacity
                onPress={() => changeCount(index, --item.count)}>
                <Text style={styles.operator}>—</Text>
              </TouchableOpacity>
            </View>
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
        swipeDirection={'up'}
        deviceHeight={deviceHeight}
        deviceWidth={deviceWidth}
        propagateSwipe={true}
        backdropTransitionOutTiming={0}>
        <FlatList
          style={{backgroundColor: 'red'}}
          contentContainerStyle={[
            styles.modalContainer,
            {height: deviceHeight * 0.9},
          ]}
          data={[1, 1, 1]}
          renderItem={() => <Text>Text</Text>}
        />
      </ReactNativeModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
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
  },
  modal: {justifyContent: 'flex-end', margin: 0},
  modalContainer: {
    backgroundColor: 'lightgray',
    justifyContent: 'flex-end',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    minHeight: 100,
  },
});

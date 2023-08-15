import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {RootStackParamList} from '../../navigation/StackParamList';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppDispatch} from '../../redux/store';
import {addProduct} from '../../redux/redusers/CartSlice';
import {Cart} from '../../icons';
import {CountField, TextWrapper} from '../../components';

type Props = NativeStackScreenProps<RootStackParamList, 'ItemScreen'>;

export const ItemScreen = (props: Props) => {
  const product = props.route.params;
  const imageSize = Dimensions.get('screen').width;
  const dispatch = useAppDispatch();
  const [count, setCount] = React.useState<number>(1);

  const addToCart = () => {
    dispatch(addProduct({...product, count}));
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.modal}
          contentContainerStyle={{height: imageSize}}
          data={product.images}
          renderItem={({item}) => (
            <Image source={{uri: item}} height={imageSize} width={imageSize} />
          )}
          horizontal
        />
        <TextWrapper title="Name" text={product.title} />
        <TextWrapper title="brand" text={product.brand} />
        <TextWrapper title="category" text={product.category} />
        <TextWrapper title="description" text={product.description} />
        <TextWrapper
          title="discountPercentage"
          text={product.discountPercentage.toString()}
        />
        <TextWrapper title="price" text={product.price.toString()} />
        <TextWrapper title="rating" text={product.rating.toString()} />
        <TextWrapper title="stock" text={product.stock.toString()} />
        <TextWrapper title="thumbnail" text={product.thumbnail} />
        <CountField
          count={count}
          changeCount={_count => setCount(_count)}
          containerStyle={styles.count}
        />
        <TouchableOpacity onPress={addToCart} style={styles.cartButton}>
          <Cart />
          <Text> Add To Cart</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  cartButton: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
  },
  modal: {flexGrow: 0},
  count: {
    justifyContent: 'center',
    marginVertical: 8,
  },
});

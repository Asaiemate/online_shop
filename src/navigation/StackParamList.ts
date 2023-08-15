import {IProduct} from '../screens/main/ProductsScreen';

export type RootStackParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;

  TabNavigation: undefined;
  CartScreen: undefined;
  ItemScreen: IProduct;

  Products: undefined;
  Profile: undefined;
};

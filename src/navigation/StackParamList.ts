import {IProduct} from '../screens/main/ItemsList';

export type RootStackParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;

  TabNavigation: undefined;
  CartScreen: undefined;
  ItemScreen: IProduct;

  ItemsList: undefined;
  Profile: undefined;
};

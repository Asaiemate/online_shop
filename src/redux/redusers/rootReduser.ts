import {combineReducers} from 'redux';
import {AuthStateInterface} from '../thunks/auth/model';
import AuthSlice from './AuthSlice';
import CartSlice from './CartSlice';
import {IProduct} from '../../screens/main/ProductsScreen';

export interface RootInterface {
  auth: AuthStateInterface;
  cart: IProduct[];
}

export const reducersObj = {
  auth: AuthSlice,
  cart: CartSlice,
};

export default combineReducers(reducersObj);

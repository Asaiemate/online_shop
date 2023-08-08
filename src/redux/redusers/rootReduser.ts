import {combineReducers} from 'redux';
import {AuthStateInterface} from '../thunks/auth/model';
import AuthSlice from './AuthSlice';

export interface RootInterface {
  auth: AuthStateInterface;
}

export const reducersObj = {
  auth: AuthSlice,
};

export default combineReducers(reducersObj);

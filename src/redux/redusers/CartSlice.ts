import {createSlice} from '@reduxjs/toolkit';
import {IProduct} from '../../screens/main/ItemsList';

interface IInitialState {
  cart: IProduct[];
}

const initialState: IInitialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, {payload}) => {
      const index = state.cart.findIndex(product => product.id === payload.id);
      if (index >= 0) {
        state.cart[index].count = state.cart[index].count + payload.count;
      } else {
        state.cart.push(payload);
      }
    },
    clearList: () => initialState,
    deleteProduct: (state, {payload}) => {
      state.cart = state.cart.filter(item => item.id !== payload.id);
    },
    changeCount: (state, {payload}) => {
      if (payload.count < 0) {
        return;
      }
      state.cart[payload.index].count = payload.count;
    },
  },
});

export const {addProduct, clearList, changeCount, deleteProduct} =
  cartSlice.actions;

export default cartSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';
import {IProduct} from '../../screens/main/ItemsList';

const initialState: IProduct[] = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, {payload}) => {
      const index = state.findIndex(product => product.id === payload.id);
      if (index >= 0) {
        state[index].count = state[index].count + payload.count;
      } else {
        state.push(payload);
      }
    },
  },
});

export const {addProduct} = cartSlice.actions;

export default cartSlice.reducer;

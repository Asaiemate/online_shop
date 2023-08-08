import {createSlice} from '@reduxjs/toolkit';
import {AuthStateInterface} from '../thunks/auth/model';
import {SignInThunk, SignUpThunk} from '../thunks/auth';

export const initialState: AuthStateInterface = {
  token: null,
  status: 'success',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearToken: state => {
      state.token = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(SignInThunk.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(SignInThunk.fulfilled, (state, {payload}) => {
      state.token = payload.token;
      state.status = 'success';
    });
    builder.addCase(SignInThunk.rejected, state => {
      state.status = 'failed';
    });
    builder.addCase(SignUpThunk.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(SignUpThunk.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.status = 'success';
    });
    builder.addCase(SignUpThunk.rejected, state => {
      state.status = 'failed';
    });
    // builder.addCase(logoutThunk.fulfilled, state => {
    //   state.token = null;
    //   state.status = 'success';
    // });
  },
});

export const {clearToken} = authSlice.actions;

export default authSlice.reducer;

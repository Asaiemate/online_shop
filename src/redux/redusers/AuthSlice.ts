import {createSlice} from '@reduxjs/toolkit';
import {AuthStateInterface} from '../thunks/auth/model';
import {SignInThunk, SignUpThunk} from '../thunks/auth';

const initialState: AuthStateInterface = {
  id: 0,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  gender: '',
  image: '',
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
    setToken: state => {
      state.token = '1';
    },
  },
  extraReducers: builder => {
    builder.addCase(SignInThunk.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(SignInThunk.fulfilled, (state, {payload}) => {
      if (payload.token) {
        state.id = payload.id;
        state.username = payload.username;
        state.email = payload.email;
        state.firstName = payload.firstName;
        state.lastName = payload.lastName;
        state.gender = payload.gender;
        state.image = payload.image;
        state.token = payload.token;
        state.status = 'success';
      } else {
        state.status = 'failed';
      }
    });
    builder.addCase(SignInThunk.rejected, state => {
      state.status = 'failed';
    });
    builder.addCase(SignUpThunk.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(SignUpThunk.fulfilled, (state, {payload}) => {
      state.id = payload.id;
      state.username = payload.username;
      state.email = payload.email;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.gender = payload.gender;
      state.image = payload.image;
      state.token = 'token';
      state.status = 'success';
    });
    builder.addCase(SignUpThunk.rejected, state => {
      state.status = 'failed';
    });
  },
});

export const {clearToken, setToken} = authSlice.actions;

export default authSlice.reducer;

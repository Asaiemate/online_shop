import {createAsyncThunk} from '@reduxjs/toolkit';

interface ResponseLoginInterface {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}
interface BodyLoginPasswordInterface {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  password: string;
}

export const SignUpThunk = createAsyncThunk<
  ResponseLoginInterface,
  BodyLoginPasswordInterface
>('auth/signUp', async data => {
  const response = await fetch('https://dummyjson.com/users/add', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });
  const responseJSON = await response.json();
  return responseJSON as ResponseLoginInterface;
});

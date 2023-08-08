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
  password: string;
}

export const SignInThunk = createAsyncThunk<
  ResponseLoginInterface,
  BodyLoginPasswordInterface
>('auth/signIn', async data => {
  const response = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .catch(error => console.log('auth error', error.message));

  return response.data as ResponseLoginInterface;
});

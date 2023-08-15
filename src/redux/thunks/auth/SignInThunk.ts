import {createAsyncThunk} from '@reduxjs/toolkit';

interface ResponseLoginInterface {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
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
  console.log('data', data);
  const response = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username: data.username, password: data.password}),
  });
  const parseJSON = await response.json();
  console.log('parseJSON', JSON.stringify(parseJSON, null, 2));
  return parseJSON as ResponseLoginInterface;
});

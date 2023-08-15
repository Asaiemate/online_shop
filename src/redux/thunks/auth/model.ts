export interface AuthStateInterface {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  image: string;
  token: string | null;
  status: 'loading' | 'failed' | 'success';
}

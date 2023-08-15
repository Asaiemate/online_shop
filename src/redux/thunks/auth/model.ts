export interface AuthStateInterface {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string | null;
  status: 'loading' | 'failed' | 'success';
}

export interface AuthStateInterface {
  token: string | null;
  status: 'loading' | 'failed' | 'success';
}

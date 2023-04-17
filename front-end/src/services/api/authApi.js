import api from './api';

export async function signIn(body) {
  const response = await api.post('/auth/sign-in', body);
  return response.data;
}

import api from './api';

export async function signUp(body) {
  const response = await api.post('/user', body);
  return response.data;
}

export async function updateUser(body, token) {
  const response = await api.patch('/user', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

import api from './api';

export async function saveDashboardFavorites(body, token) {
  const response = await api.post('/dashboard/favorites', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getDashboardFavorites(token) {
  const response = await api.get('/dashboard/favorites', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function deleteDashboardFavorite(ticker, token) {
  const response = await api.delete(`/dashboard/favorites/${ticker}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

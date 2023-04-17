import api from './api';

export async function saveUserTransaction(body, token) {
  const response = await api.post('/transaction', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getAllUserTransactions(token) {
  const response = await api.get('/transaction/all', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getUserPortfolio(token) {
  const response = await api.get('/transaction/portfolio', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function deleteTransaction(transactionId, token) {
  const response = await api.delete(`/transaction/${transactionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

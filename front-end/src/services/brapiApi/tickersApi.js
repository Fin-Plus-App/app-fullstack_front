import brapiApi from './brapiApi';

export async function findTicker(params) {
  const response = await brapiApi.get(`/api/available?search=${params}`);

  return response.data.stocks;
}

export async function getTickersData(params) {
  const response = await brapiApi.get(`/api/quote/${params}?range=1d&interval=1d&fundamental=true&dividends=true`);
  return response.data.results;
}

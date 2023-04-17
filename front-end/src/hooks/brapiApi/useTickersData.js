import useAsync from '../useAsync';

import * as brapiApi from '../../services/brapiApi/tickersApi';

export default function useTickersData() {
  const {
    data: tickersData,
    loading: tickersDataLoading,
    error: tickersDataError,
    act: getTickersData,
  } = useAsync((data) => brapiApi.getTickersData(data), false);

  return {
    tickersData,
    tickersDataLoading,
    tickersDataError,
    getTickersData,
  };
}

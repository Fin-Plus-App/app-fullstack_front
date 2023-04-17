import useAsync from '../useAsync';

import * as brapiApi from '../../services/brapiApi/tickersApi';

export default function useSearchTickers() {
  const {
    data: searchTickers,
    loading: searchTickersLoading,
    error: searchTickersError,
    act: getSearchTickers,
  } = useAsync((data) => brapiApi.findTicker(data), false);

  return {
    searchTickers,
    searchTickersLoading,
    searchTickersError,
    getSearchTickers,
  };
}

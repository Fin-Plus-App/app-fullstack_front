import useAsync from '../useAsync';

import * as transactionApi from '../../services/api/transactionsApi';
import useToken from '../useToken';

export default function useUserPortfolio() {
  const token = useToken();

  const {
    data: userPortfolio,
    loading: userPortfolioLoading,
    error: userPortfolioError,
    act: getUserPortfolio,
  } = useAsync(() => transactionApi.getUserPortfolio(token));

  return {
    userPortfolio,
    userPortfolioLoading,
    userPortfolioError,
    getUserPortfolio,
  };
}

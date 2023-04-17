import useAsync from '../useAsync';

import * as transactionApi from '../../services/api/transactionsApi';
import useToken from '../useToken';

export default function useAllUserTransactions() {
  const token = useToken();

  const {
    data: allUserTransactions,
    loading: allUserTransactionsLoading,
    error: allUserTransactionsError,
    act: getAllUserTransactions,
  } = useAsync(() => transactionApi.getAllUserTransactions(token));

  return {
    allUserTransactions,
    allUserTransactionsLoading,
    allUserTransactionsError,
    getAllUserTransactions,
  };
}

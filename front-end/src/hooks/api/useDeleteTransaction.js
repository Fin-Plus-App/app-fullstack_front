import useAsync from '../useAsync';
import useToken from '../useToken';

import * as transactionApi from '../../services/api/transactionsApi';

export default function useDeleteTransaction() {
  const token = useToken();

  const {
    loading: deleteTransactionLoading,
    error: deleteTransactionError,
    act: deleteTransaction,
  } = useAsync((data) => transactionApi.deleteTransaction(data, token), false);

  return {
    deleteTransactionLoading,
    deleteTransactionError,
    deleteTransaction,
  };
}

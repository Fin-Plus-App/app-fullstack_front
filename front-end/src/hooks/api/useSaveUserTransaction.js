import useAsync from '../useAsync';
import useToken from '../useToken';

import * as transactionApi from '../../services/api/transactionsApi';

export default function useSaveUserTransaction() {
  const token = useToken();

  const {
    loading: saveUserTransactionLoading,
    error: saveUserTransactionError,
    act: saveUserTransaction,
  } = useAsync((data) => transactionApi.saveUserTransaction(data, token), false);

  return {
    saveUserTransactionLoading,
    saveUserTransactionError,
    saveUserTransaction,
  };
}

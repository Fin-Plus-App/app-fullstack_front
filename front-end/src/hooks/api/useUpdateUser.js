import useAsync from '../useAsync';
import useToken from '../useToken';

import * as userApi from '../../services/api/userApi';

export default function useUpdateUser() {
  const token = useToken();

  const {
    loading: updateUserLoading,
    error: updateUserError,
    act: updateUser,
  } = useAsync((data) => userApi.updateUser(data, token), false);

  return {
    updateUserLoading,
    updateUserError,
    updateUser,
  };
}

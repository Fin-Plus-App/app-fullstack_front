import useAsync from '../useAsync';
import useToken from '../useToken';

import * as dashboarApi from '../../services/api/dashboardApi';

export default function useDeleteDashBoardFavorite() {
  const token = useToken();

  const {
    loading: deleteDashBoardFavoriteLoading,
    error: deleteDashBoardFavoriteError,
    act: deleteDashBoardFavorite,
  } = useAsync((data) => dashboarApi.deleteDashboardFavorite(data, token), false);

  return {
    deleteDashBoardFavoriteLoading,
    deleteDashBoardFavoriteError,
    deleteDashBoardFavorite,
  };
}

import useAsync from '../useAsync';
import useToken from '../useToken';

import * as dashboarApi from '../../services/api/dashboardApi';

export default function useSaveDashBoardFavorites() {
  const token = useToken();

  const {
    loading: saveDashBoardFavoritesLoading,
    error: saveDashBoardFavoritesError,
    act: saveDashBoardFavorites,
  } = useAsync((data) => dashboarApi.saveDashboardFavorites(data, token), false);

  return {
    saveDashBoardFavoritesLoading,
    saveDashBoardFavoritesError,
    saveDashBoardFavorites,
  };
}

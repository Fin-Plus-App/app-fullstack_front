import useAsync from '../useAsync';

import * as dashboarApi from '../../services/api/dashboardApi';
import useToken from '../useToken';

export default function useDashboardFavorites() {
  const token = useToken();

  const {
    data: dashboardFavorites,
    loading: dashboardFavoritesLoading,
    error: dashboardFavoritesError,
    act: getDashboardFavorites,
  } = useAsync(() => dashboarApi.getDashboardFavorites(token));

  return {
    dashboardFavorites,
    dashboardFavoritesLoading,
    dashboardFavoritesError,
    getDashboardFavorites,
  };
}

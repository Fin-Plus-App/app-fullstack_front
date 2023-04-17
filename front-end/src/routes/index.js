import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import Portifolio from '../pages/Portfolio';
import Record from '../pages/Record';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import BuyRegister from '../pages/BuyRegister';
import SellRegister from '../pages/SellRegister';
import UserInfos from '../pages/UserInfos';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
    errorElement: <NotFound />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
    errorElement: <NotFound />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    errorElement: <NotFound />,
  },
  {
    path: '/carteira',
    element: <Portifolio />,
    errorElement: <NotFound />,
  },
  {
    path: '/compra',
    element: <BuyRegister />,
    errorElement: <NotFound />,
  },
  {
    path: '/registros',
    element: <Record />,
    errorElement: <NotFound />,
  },
  {
    path: '/usuario',
    element: <UserInfos />,
    errorElement: <NotFound />,
  },
  {
    path: '/venda',
    element: <SellRegister />,
    errorElement: <NotFound />,
  },
]);

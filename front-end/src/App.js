import { RouterProvider } from 'react-router-dom';
import GlobalStyle from './assets/styles/GlobalStyle';
import { router } from './routes';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <>
      <UserProvider>
        <GlobalStyle />
        <ToastContainer />
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
}

export default App;

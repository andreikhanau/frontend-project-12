import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/App.jsx'
import NotFound from './pages/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import LogIn from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import i18n from './i18n';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import "./styles/main.css"

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: '/login',
    element: <LogIn />,
    errorElement: <NotFound />,
  },
  {
    path: '/signup',
    element: <SignUp />,
    errorElement: <NotFound />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </StrictMode>,
)

document.title = i18n.t('app.title');

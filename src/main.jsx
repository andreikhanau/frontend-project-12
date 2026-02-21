import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/App.jsx'
import NotFound from './pages/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import LogIn from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import i18n from './i18n';

import "./styles/main.css"

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
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)

document.title = i18n.t('app.title');

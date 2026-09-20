import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import * as Sentry from '@sentry/react';
import App from './pages/App.jsx';
import NotFound from './pages/NotFound.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LogIn from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import { createQueryClient } from './api/QueryErrorHandler.js';
import { createAuthStore } from './stores/authStore.js';
import { createUIStateStore } from './stores/uiState.js';
import { StoreProvider } from './stores/StoreProvider.jsx';

const init = (socket) => {
  Sentry.init({
    dsn: import.meta.env.VITE_BUGSINK_DSN,
    environment: import.meta.env.MODE,
    release: 'frontend@1.0.0',
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 1.0,
  });

  const authStore = createAuthStore();
  const uiStateStore = createUIStateStore();
  const queryClient = createQueryClient();
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <App socket={socket} />
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
    },
  ]);

  return (
    <StrictMode>
      <StoreProvider authStore={authStore} uiStateStore={uiStateStore}>
        <MantineProvider>
          <QueryClientProvider client={queryClient}>
            <Notifications />
            <RouterProvider router={router} />
          </QueryClientProvider>
        </MantineProvider>
      </StoreProvider>
    </StrictMode>
  );
};

export default init;

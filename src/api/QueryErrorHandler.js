import {
  MutationCache,
  QueryCache,
  QueryClient,
} from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import i18n from '../locales/i18n.js';

const showNetworkError = (error) => {
  const isNetworkError = error instanceof TypeError;
  notifications.show({
    title: isNetworkError
      ? i18n.t('errors.networkError')
      : i18n.t('errors.unknownError'),
    message: isNetworkError
      ? i18n.t('errors.networkError')
      : i18n.t('errors.unknownError'),
    color: 'red',
  });
};

export const createQueryClient = () => new QueryClient({
  queryCache: new QueryCache({
    onError: showNetworkError,
  }),
  mutationCache: new MutationCache({
    onError: showNetworkError,
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnReconnect: true,
    },
  },
});
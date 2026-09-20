import { useContext } from 'react';
import { useStore } from 'zustand';
import { AuthStoreContext, UIStateStoreContext } from './storeContexts.js';

export const useAuthStore = (selector) => {
  const store = useContext(AuthStoreContext);
  if (!store) {
    throw new Error('useAuthStore must be used within StoreProvider');
  }

  return useStore(store, selector);
};

export const useUIStateStore = (selector) => {
  const store = useContext(UIStateStoreContext);
  if (!store) {
    throw new Error('useUIStateStore must be used within StoreProvider');
  }

  return useStore(store, selector);
};

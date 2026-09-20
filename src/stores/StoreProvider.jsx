import {
  AuthStoreContext,
  UIStateStoreContext,
} from './storeContexts.js';

export const StoreProvider = ({ authStore, uiStateStore, children }) => (
  <AuthStoreContext.Provider value={authStore}>
    <UIStateStoreContext.Provider value={uiStateStore}>
      {children}
    </UIStateStoreContext.Provider>
  </AuthStoreContext.Provider>
);
// This file is used to manage the authentication state of the application using Zustand, 
// a state management library for React. It defines an initial state for authentication, 
// including a token, username, and an isAuthenticated flag. 
// The store provides two main actions: login and logout. 
// The login action updates the state with the provided token and username, 
// while the logout action resets the state to its initial values. 
// The store is persisted using Zustand's persist middleware, allowing the authentication state to be saved across sessions.      
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  token: null,
  username: null,
  isAuthenticated: false,
};

export const useAuthStore = create(
  persist(
    (set) => ({
      ...initialState,
      login: ({ token, username }) => {
        set({
          token,
          username,
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({
          ...initialState,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        username: state.username,
        isAuthenticated: state.isAuthenticated,
      }), 
    }
  )
);

export const login = (payload) => useAuthStore.getState().login(payload);
export const logout = () => useAuthStore.getState().logout();

export default useAuthStore;

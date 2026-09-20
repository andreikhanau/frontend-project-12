import { create } from 'zustand';

const initialState = {
  token: null,
  username: null,
};

export const createAuthStore = () => create((set) => ({
  ...initialState,
  login: ({ token, username }) => {
    set({ token, username });
  },
  logout: () => {
    set(initialState);
  },
}));

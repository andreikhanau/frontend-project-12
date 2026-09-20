import { create } from 'zustand';

export const createUIStateStore = () => create((set) => ({
  activeChannelId: null,
  setActiveChannelId: (id) => set({ activeChannelId: id }),

  showAddModal: false,
  setShowAddModal: (state) => set({ showAddModal: state }),
}));
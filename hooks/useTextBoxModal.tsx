import { create } from 'zustand';

interface useTextBoxModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useTextBoxModal = create<useTextBoxModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
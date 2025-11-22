import { create } from "zustand";

interface AddBookModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useAddBookModalStore = create<AddBookModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
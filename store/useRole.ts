import { create } from "zustand";

interface RoleState {
  role: string | null;
  setRole: (role: string) => void;
}

export const useRole = create<RoleState>((set) => ({
  role: null,
  setRole: (role: string) => set({ role }),
}));

// store/authStore.ts
import {create} from "zustand";

type AuthStore = {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false, // по умолчанию не авторизован
  setLoggedIn: (value) => set({ isLoggedIn: value }),
}));
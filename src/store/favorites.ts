// src/store/favorites.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type FavoriteProduct = {
  id: number;
  name: string;
  imageUrl: string;
  price: string;
};

type FavoritesState = {
  favorites: FavoriteProduct[];
  addFavorite: (product: FavoriteProduct) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (product) =>
        set((state) => ({
          favorites: [...state.favorites, product],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((p) => p.id !== id),
        })),
      isFavorite: (id) => get().favorites.some((p) => p.id === id),
    }),
    {
      name: "favorites-storage",
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);
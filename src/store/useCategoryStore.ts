// src/store/useCategoryStore.ts
import { create } from "zustand";

interface Category {
  id: number;
  code: string;
  descs: { lang: string; name: string }[];
  children?: Category[];
}

interface CategoryStore {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  setCurrentChildren: (children: Category[]) => void;
  currentChildren: Category[];
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  currentChildren: [],
  setCategories: (categories) => set({ categories }),
  setCurrentChildren: (children) => set({ currentChildren: children }),
}));
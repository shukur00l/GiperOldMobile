import {create} from "zustand";

type CategoryStore = {
  selectedCategoryId: number | null;
  selectedCategory: any | null;
  setSelectedCategory: (category: any) => void;
  clearSelectedCategory: () => void;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  selectedCategoryId: null,
  selectedCategory: null,
  setSelectedCategory: (category) =>
    set({
      selectedCategoryId: category.id,
      selectedCategory: category,
    }),
  clearSelectedCategory: () =>
    set({
      selectedCategoryId: null,
      selectedCategory: null,
    }),
}));
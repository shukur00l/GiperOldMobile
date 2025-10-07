// src/components/FavoriteButton.tsx
import { Pressable } from "react-native";
import { Heart } from "lucide-react-native";
import { useFavoritesStore } from "@/src/store/favorites";
import React from "react";
import { Product } from "./home/cardspisok";

export default function FavoriteButton({ product }: { product: Product }) {
  const addFavorite = useFavoritesStore((s) => s.addFavorite);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite(product.id));

  return (
    <Pressable
      className="absolute top-0 right-0 w-8 h-8 rounded-[7px] items-center justify-center bg-white"
      onPress={() => {
        if (isFavorite) {
          removeFavorite(product.id);
        } else {
          addFavorite({
            id: product.id,
            name: product.name,
            imageUrl: product.imageUrl,
            price: (product.defaultAvailability.price),
          });
        }
      }}
    >
      <Heart
        size={26}
        color={isFavorite ? "red" : "black"}
        fill={isFavorite ? "red" : "white"}
      />
    </Pressable>
  );
}
import React, { useState } from "react";
import { View, Text, Image, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useFavoritesStore } from "@/src/store/favorites";
import { Heart } from "lucide-react-native";
import { router } from "expo-router";

export default function FavouriteScreen() {
  const [loading, setLoading] = useState(false);
  const favorites = useFavoritesStore((s) => s.favorites);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);

  if (favorites.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500 text-lg">Избранных товаров нет 😢</Text>
      </View>
    );
  }
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#5600B3" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">

      <View className="flex-row flex-wrap justify-between px-4">
        {favorites.map((product) => (
          <Pressable
            key={product.id}
            className="w-[48%] mb-5 bg-white rounded-[10px] shadow p-2"
            onPress={() => {
              setLoading(true);
              router.push(`/(tabs)/(home)/productitems/${product.id}`);
              setLoading(false);
            }}
          >
            <Image
              source={{ uri: product.imageUrl }}
              className="w-full h-[150px] rounded-[10px]"
            />

            <Pressable
              className="absolute top-2 right-2 w-8 h-8 rounded-[7px] bg-white items-center justify-center"
              onPress={() => removeFavorite(product.id)}
            >
              <Heart size={22} color="red" fill="red" />
            </Pressable>

            <Text
              numberOfLines={2}
              className="text-[14px] font-semibold mt-2"
            >
              {product.name}
            </Text>

            <Text className="text-[14px] font-bold text-[#5600B3] mt-1">
              {product.price}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
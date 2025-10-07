import { Shop } from "@/src/app/(tabs)/(katalog)/shops";
import React, { memo } from "react";
import { View, Text, Image, Pressable } from "react-native";

const ShopItem = memo(({ shop }: { shop: Shop }) => (
  <Pressable className="bg-white rounded-xl mb-4 shadow-sm flex-row p-4 items-center">
    <Image
      source={{ uri: shop.imageUrl }}
      className="w-16 h-16 rounded-lg bg-gray-100"
      resizeMode="cover"
    />
    <View className="flex-1 ml-4">
      <Text className="text-lg font-bold text-gray-800">
        {shop.descriptions[0]?.name}
      </Text>
      <Text className="text-sm text-gray-500 mt-1">
        {shop.descriptions[0]?.description}
      </Text>
      {shop.descriptions[0]?.address && (
        <Text className="text-xs text-gray-400 mt-1">
          {shop.descriptions[0]?.address}
        </Text>
      )}
    </View>
  </Pressable>
));

export default ShopItem;
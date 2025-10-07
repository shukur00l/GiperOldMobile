import React, { memo } from "react";
import { View, Image } from "react-native";

interface BrandItemProps {
  imageUrl: string;
}

const BrandItem = memo(({ imageUrl }: BrandItemProps) => {
  return (
    <View className="flex-1 items-center m-2 w-20 h-20">
      <Image
        source={{ uri: imageUrl }}
        className="w-full h-full rounded-md bg-gray-100"
        resizeMode="cover"
      />
    </View>
  );
});

export default BrandItem;
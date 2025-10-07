import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { GetProductApi } from "@/src/api/product";

type ProductDetailType = {
  id: number;
  name: string;
  imageUrl: string;
  d?: string;
  defaultAvailability?: {
    price: string;
    specialPrice?: string;
    discountPercent?: number;
  };
};

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<ProductDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (id) {
    //   GetProductApi(id).then(( res:any) => {
    //     setProduct(res.data);
    //     setIsLoading(false);
    //   }).catch(() => setIsLoading(false));
    }
  }, [id]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#BABDED" />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Product not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ title: product.name }} />
      <ScrollView className="p-4">
        <Image 
          source={{ uri: product.imageUrl }} 
          className="w-full h-64 rounded-lg mb-4" 
        />
        <Text className="text-xl font-bold mb-2">{product.name}</Text>
        {product.defaultAvailability?.specialPrice ? (
          <Text className="text-lg text-red-500 mb-2">
            {product.defaultAvailability.specialPrice} TMT ({product.defaultAvailability.discountPercent}% off)
          </Text>
        ) : (
          <Text className="text-lg mb-2">{product.defaultAvailability?.price} TMT</Text>
        )}
        <Text className="text-gray-700">{product.d ? `Rating: ${product.d}` : ""}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
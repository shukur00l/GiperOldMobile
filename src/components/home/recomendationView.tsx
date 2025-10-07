import { GetRekomondaishenApi } from "@/src/api/rekomondaishen";
import { router } from "expo-router";
import { ShoppingCart } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from "react-native";

type Product = {
  id: number;
  name: string;
  imageUrl: string;
  defaultAvailability: {
    price: string;
    specialPrice?: string | null;
    id: number;
  };
};

type RecommendationViewProps = {
  productId: number;
  categoryCode: string;
  categoryParentCode: string;
  manufacturerCode: string;
  manufacturerId: number;
  categoryId: number;
};

export default function RecommendationView({ 
    productId, 
    categoryCode,
    categoryParentCode,
    manufacturerCode,
    manufacturerId,
    categoryId
}: RecommendationViewProps) {
  const [rekomondaishen, setRekomondaishen] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      GetRekomondaishenApi(productId, categoryCode, categoryParentCode, manufacturerCode, manufacturerId, categoryId)
        .then((res: any) => {
          setRekomondaishen(res?.products || []);;
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Error fetching rekomondaishen:", error);
          setIsLoading(false);
        });
    }
  }, [productId]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center h-24">
        <ActivityIndicator size="large" color="#BABDED" />
      </View>
    );
  }

  if (!rekomondaishen || rekomondaishen.length === 0) {
    return <Text className="text-gray-500">Rekomondasiýa ýok</Text>;
  }

  function AddBasket(id: any) {
    throw new Error("Function not implemented.");
  }

  return (
      <View className="mt-5">
      <Text className="text-lg font-bold mb-3 mx-2">Rekomendasiýa</Text>
    <View className="flex-row flex-wrap justify-between px-2">
        {rekomondaishen.map((item) => (
          <View key={item.id}  className="rounded-xl p-3 w-[48%] shadow mb-4" >
            
            <Pressable
                key={item.id}
                className=""
                onPress={() => router.push(`/productitems/${item.id}`)}
            >
                <Image
                    source={{
                        uri:
                            item.imageUrl ||
                            "https://via.placeholder.com/100x100?text=No+Image",
                    }}
                    className="w-full h-36 rounded-lg"
                    resizeMode="cover"
                />
                <Text
                    className="text-xs text-center mt-2"
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {item.name}
                </Text>

                {item.defaultAvailability?.price && (
                    <Text className="text-center text-sm font-semibold mt-1">
                        {item.defaultAvailability.price} TMT
                    </Text>
                )}
            </Pressable>
               {/* <Pressable className='absolute bottom-16 right-0 bg-[#5600B3] w-8 h-8 rounded-[5px] items-center justify-center outline-8 outline-white'
          onPress={() => {
           AddBasket(item.defaultAvailability.id)
          }}
          >
        <ShoppingCart size={20} color='white' />
      </Pressable> */}
            </View>
        ))}
      </View>
    </View>
  );
}
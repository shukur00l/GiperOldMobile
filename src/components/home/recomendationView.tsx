import { GetRekomondaishenApi } from "@/src/api/rekomondaishen";
import { router } from "expo-router";
import { ShoppingCart } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from "react-native";
import FavoriteButton from "../FavoriteButton";
import { Product } from "./cardspisok";

// type Product = {
//   id: number;
//   name: string;
//   imageUrl: string;
//   newProduct : boolean;
//   defaultAvailability: {
//     price: string;
//     specialPrice?: string | null;
//     id: number;
//     discountPercent: string
//   };
// };

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
          <View key={item.id}  className="rounded-xl p-3 w-[48%] mb-4" >
            
           <Pressable  className=" w-[165px] h-[195px] ml-5 rounded-[5px] m-4"
              onPress={() => router.push(`/(tabs)/(home)/productitems/${item.id}`)}
              >
      
                <Image
                  source={{ uri: item.imageUrl }}
                  className="w-[165px] h-[128px] rounded-[5px]"
                />

                  {item.newProduct && (
                    <View className="absolute top-0 left-0 bg-green-500   px-1 rounded-rl-[5px]">
                      <Text className="text-white text-[10px] font-bold">Täze</Text>
                    </View>
                  )}

                   <FavoriteButton product={item} />

          <Pressable className='absolute bottom-16 right-0 bg-[#5600B3] w-8 h-8 rounded-[5px] items-center justify-center outline-8 outline-white'
          onPress={() => {
           AddBasket(item.defaultAvailability.id)
          }}
          >
        <ShoppingCart size={20} color='white' />
      </Pressable>

                <View className="flex flex-row mt-5">

                   {item.defaultAvailability.specialPrice && (
                    <View className="flex flex-row items-end">
                  <Text className="text-[14px] text-[#FF0000] font-bold ">
                    {item.defaultAvailability.specialPrice}
                  </Text>
                  <Text className="ml-2 text-[10px] text-[#A8A8A8] font-bold line-through ">
                    {item.defaultAvailability.price}
                  </Text>
                  <Text className=" text-[10px] text-[#FF8C00] font-bold">
                    -{item.defaultAvailability.discountPercent}%
                  </Text>
                  </View>
                )}


                {!item.defaultAvailability.specialPrice && (
                  <Text className="text-[14px] text-[#5600B3] font-bold ">
                    {item.defaultAvailability.price}
                  </Text>
                )}
               


                </View>
               
                 <Text numberOfLines={1} className="text-[14px] mt-[5px] h-10 font-bold">
                  {item.name}
                </Text>
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
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Modal, Pressable, Text, View } from "react-native";
import BannerCarousel from "./carousel";
import { router } from "expo-router";
import { AddBasketApi } from "@/src/api/addBasket";
import { useQueryClient } from '@tanstack/react-query';
import { useFavoritesStore } from "@/src/store/favorites";
import create from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FavoriteButton from "../FavoriteButton";

type Category = {
  id: number;
  categoryCode: string | null;
  filterParams: string | null;
  withImage: boolean;
  description: {
    name: string;
    nameTm: string;
    nameRu: string;
  };
};

type Banner = {
  productRelationshipId: number;
  description: {
    name: string;
    description: string | null;
    lang: string;
  };
  image: {
    imageUrl: string;
    siteImageUrl: string;
  };
  categoryCode: string | null;
  filterParams: string;
};

export type Product = {
  id: number;
  promoExist: boolean;
  simplePromo: boolean;
  newProduct?: boolean;
  defaultAvailability: {
    id: number;
    price: string;
    specialPrice: string | null;
    productShipeable: boolean;
    discountPercent?: number;
  };
  name: string;
  imageUrl: string;
  d: string;
};

type CategoryWithItems = Category & {
  type: "banner" | "product";
  items: Banner[] | Product[];
};


const MainScreen: React.FC = () => {
  const [data, setData] = useState<CategoryWithItems[]>([]);
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectBasket, setSelectBasket] = useState<boolean>(false);

   

  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // 1. Загружаем список категорий
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL2}products/group`);
        const categories: Category[] = await res.json();

        // 2. Для каждой категории делаем запрос по её ID
        const results: CategoryWithItems[] = await Promise.all(
          categories.map(async (cat) => {
            let items: Banner[] | Product[] = [];

            if (cat.withImage) {
              const r = await fetch(`${process.env.EXPO_PUBLIC_API_URL2}products/group/banners/${cat.id}`);
              items = await r.json();
            } else {
              const r = await fetch(`${process.env.EXPO_PUBLIC_API_URL2}products/group/short/${cat.id}?offset=0&max=4`);
              items = await r.json();
            }

            return {
              ...cat,
              items,
              type: cat.withImage ? "banner" : "product",
            };
          })
        );

        setData(results);
      } catch (e) {
        console.error("Ошибка загрузки:", e);
      }
    };

    fetchCategories();
  }, []);

  const AddBasket = async (id: number) => {
    try {
    await AddBasketApi(id);
    queryClient.invalidateQueries({ queryKey: ['basket'] });
    } catch (e) {
      console.error("Ошибка добавления в корзину:", e);
    }
  };



const renderItem = ({ item }: { item: CategoryWithItems }) => {
  if (item.type === "banner") {
    return (
      <View className="mb-5">
        <Text className="mx-5 font-bold text-[18px] mt-5">{item.description.name}</Text>
        <BannerCarousel data={item.items as Banner[]} />  
      </View>
    );
  }

    if (item.type === "product") {
      return (
        <View className="flex mb-10 h-auto justify-center items-center">
          <Text className="w-full text-left pl-5 font-bold text-[18px]">{item.description.name}</Text>
          <FlatList
            numColumns={2}
            data={item.items as Product[]}
            keyExtractor={(p) => p.id.toString()}
           renderItem={({ item: product }: { item: Product }) => (
              <Pressable  className=" w-[165px] h-[195px] ml-5 rounded-[5px] m-4"
              onPress={() => router.push(`/(tabs)/(home)/productitems/${product.id}`)}
              >
      
                <Image
                  source={{ uri: product.imageUrl }}
                  className="w-[165px] h-[128px] rounded-[5px]"
                />

                  {product.newProduct && (
                    <View className="absolute top-0 left-0 bg-green-500   px-1 rounded-rl-[5px]">
                      <Text className="text-white text-[10px] font-bold">Täze</Text>
                    </View>
                  )}

                   <FavoriteButton product={product} />

          <Pressable className='absolute bottom-16 right-0 bg-[#5600B3] w-8 h-8 rounded-[5px] items-center justify-center outline-8 outline-white'
          onPress={() => {
           AddBasket(product.defaultAvailability.id)
          }}
          >
        <ShoppingCart size={20} color='white' />
      </Pressable>

                <View className="flex flex-row mt-5">

                   {product.defaultAvailability.specialPrice && (
                    <View className="flex flex-row items-end">
                  <Text className="text-[14px] text-[#FF0000] font-bold ">
                    {product.defaultAvailability.specialPrice}
                  </Text>
                  <Text className="ml-2 text-[10px] text-[#A8A8A8] font-bold line-through ">
                    {product.defaultAvailability.price}
                  </Text>
                  <Text className=" text-[10px] text-[#FF8C00] font-bold">
                    -{product.defaultAvailability.discountPercent}%
                  </Text>
                  </View>
                )}


                {!product.defaultAvailability.specialPrice && (
                  <Text className="text-[14px] text-[#5600B3] font-bold ">
                    {product.defaultAvailability.price}
                  </Text>
                )}
               


                </View>
               
                 <Text numberOfLines={1} className="text-[14px] mt-[5px] h-10 font-bold">
                  {product.name}
                </Text>
              </Pressable>
            )}
          />

           <Modal visible={visible} animationType="none" transparent={true}>
        <View className="bg-[#000000] bg-opacity-[0.5] h-full w-full items-center justify-center">
          <View className="bg-white p-5  w-full h-full pt-14">
       <Pressable
                  className="w-full h-[50px] flex flex-row items-center"
                  onPress={() => {
                    setVisible(false);
                    setSelectedProduct(null);
                  }}
                >
            <ArrowLeft />
            <Text className="text-[18px] font-bold ml-5">Yza</Text>
            </Pressable>
           
          </View>
        </View>
      </Modal>

      
          <Pressable className="w-[370px] h-12 bg-[#5600B3] mt-8 rounded-[10px] mx-5 flex items-center justify-center"
          onPress={() => router.push(`/(tabs)/(home)/categoryitems/${item.id}`)}
          >
            <Text className="text-white text-[14px]">
              Hemmesini Görkez
            </Text>
          </Pressable>  
        </View>
      );
    }

    return null;
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default MainScreen;
function fetchBasket() {
  throw new Error("Function not implemented.");
}


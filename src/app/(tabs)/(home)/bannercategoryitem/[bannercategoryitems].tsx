import { AddBasketApi } from '@/src/api/addBasket';
import { router, useLocalSearchParams } from 'expo-router';
import { ShoppingCart } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Product = {
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

export default function BannerCategoryScreen() {
  const { bannercategoryitems } = useLocalSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');

useEffect(() => {
  const fetchBannerCategory = async () => {
    try {
      setLoading(true);
      const productsRes = await fetch(`${process.env.EXPO_PUBLIC_API_URL2}products?${bannercategoryitems}`);
      const productsData = await productsRes.json();

      // Если приходит объект, а не массив
        setProducts(productsData.products || []);

    } catch (error) {
      console.error('Ошибка при загрузке данных категории:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchBannerCategory();
}, [bannercategoryitems]);


  const renderProductItem = ({ item }: { item: Product }) => (
    <Pressable className="w-[165px] h-[195px] ml-5 rounded-[5px] m-4"
    onPress={() => router.push(`/(tabs)/(home)/productitems/${item.id}`)}
    >
      <Image
        source={{ uri: item.imageUrl }}
        className="w-[165px] h-[128px] rounded-[5px]"
      />

      {item.newProduct && (
        <View className="absolute top-0 left-0 bg-green-500 px-1 rounded-rl-[5px]">
          <Text className="text-white text-[10px] font-bold">Täze</Text>
        </View>
      )}

        <Pressable className='absolute bottom-16 right-0 bg-[#5600B3] w-8 h-8 rounded-[5px] items-center justify-center outline-8 outline-white'
        onPress={() => AddBasketApi(item.defaultAvailability.id)}
        >
        <ShoppingCart size={20} color='white' />
      </Pressable>

      <View className="flex flex-row mt-5">
        {item.defaultAvailability.specialPrice ? (
          <View className="flex flex-row items-end">
            <Text className="text-[14px] text-[#FF0000] font-bold">
              {item.defaultAvailability.specialPrice}
            </Text>
            <Text className="ml-2 text-[10px] text-[#A8A8A8] font-bold line-through">
              {item.defaultAvailability.price}
            </Text>
            <Text className="text-[10px] text-[#FF8C00] font-bold">
              -{item.defaultAvailability.discountPercent}%
            </Text>
          </View>
        ) : (
          <Text className="text-[14px] font-bold">
            {item.defaultAvailability.price}
          </Text>
        )}
      </View>
      <Text className="text-[12px] text-[#000000] mt-1" numberOfLines={1}>
        {item.name}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-2 mt-10">

        <View className='flex flex-row items-center'>
             <Pressable className="w-[40px] h-[40px] rounded-[5px] bg-[#F5F5F5] items-center justify-center"
             onPress={() => router.back()}
             >
          <Text className="text-[20px] font-bold text-[#5600B3]">←</Text>
        </Pressable>
        <Text className="text-[20px] font-bold p-4">{categoryName}</Text>
        </View>
     
        <View className='items-center'>
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#5600B3" />
          </View>
        ) : (
          <FlatList
            data={products}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
        </View>
      </View>
    </SafeAreaView>
  );
}
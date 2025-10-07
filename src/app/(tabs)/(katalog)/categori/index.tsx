import { View, Text, ScrollView, ActivityIndicator, Image, FlatList, Pressable } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetCategoryKatalogApi } from '@/src/api/getcategory';
import { router } from 'expo-router';
import { useCategoryStore } from '@/src/store/categorystore';

type Category = {
  id: number;
  name: string;
  webImg: string;
  code: string;
  depth: number;
  descs: {
    lang: string;
    name: string;
  }[];
  children: Category[];
};

export const useCategoryQuery = () => {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: GetCategoryKatalogApi,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

const Index = () => {
  const { 
    data: categories, 
    isLoading, 
    isError, 
    error 
  } = useCategoryQuery();

  const setSelectedCategory = useCategoryStore((state) => state.setSelectedCategory);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
        <Text className="mt-2 text-gray-600">Загрузка категорий...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Ошибка: {error?.message}</Text>
      </View>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Нет категорий для отображения</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: typeof categories[0] }) => (
    <Pressable
      className="flex-1 m-2 bg-white rounded-lg overflow-hidden shadow flex-grow justify-center items-center"
     onPress={() => {router.push(`/(tabs)/(katalog)/categori/subcategory`)}}
    >
      <Image
        source={{ uri: item.webImg }}
        className="w-32 h-32"
        resizeMode="cover"
      />
      <Text className="p-2 text-center font-semibold text-sm">
        {item.descs.find(desc => desc.lang === 'tk')?.name || item.code}
      </Text>
    </Pressable>
  );

  return (
    <FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={{ padding: 8 }}
    />
  );
};

export default Index;
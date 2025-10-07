import { GetBasketApi } from '@/src/api/getBasket';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ActivityIndicator, RefreshControl, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { router, useFocusEffect } from 'expo-router';
import React,{ useCallback } from 'react';
import create from "zustand";
import { useDeliveryStore } from '@/src/store/useDeliveryStore';

// =========================================================
// 1. ИНТЕРФЕЙСЫ (Оставляем, как есть, но выносим отдельно)
// =========================================================

export interface BasketResponse {
  code: string;
  subTotal: string;
  shipping: string;
  total: string;
  discount: string;
  bal: string | null;
  warningText: string;
  merchantItems: MerchantItem[];
  delivery: Delivery;
  shippingType: string;
  shippingTypes: ShippingType[];
  deliveryTimesToday: DeliveryTime[];
  deliveryTimesTomorrow: DeliveryTime[];
  paymentType: string;
}

export interface MerchantItem {
  responseTitle: string;
  paymentTypes: PaymentType[];
  store: Store;
  shipping: string;
  subTotal: string;
  groupedLineItems: GroupedLineItem[];
}

export interface PaymentType {
  name: string; // "MONEYORDER" | "CREDITCARD" | "ONLINEPAYMENT"
  text: string;
}

export interface Store {
  id: number;
  name: string;
  code: string;
  storeLogo: string;
  shippingDesc: string | null;
}

export interface GroupedLineItem {
  type: string;
  correction: boolean;
  lineItems: LineItem[];
}

export interface LineItem {
  id: number;
  quantity: number;
  itemPrice: string;
  subTotal: string;
  product: Product;
  availability: Availability;
  paymentType: string;
}

export interface Product {
  id: number;
  description: {
    name: string;
    description: string | null;
  };
  image: {
    imageUrl: string;
    externalUrl: string | null;
  };
}

export interface Availability {
  id: number;
  description: {
    name: string | null;
    description: string | null;
  };
}

export interface Delivery {
  name: string | null;
  region: string | null;
  address: string | null;
  telephone: string | null;
}

export interface ShippingType {
  name: string;
  text: string;
  desc: string;
}

export interface DeliveryTime {
  id: number;
  lastTime: string;
  startTime: string;
  endTime: string;
  sortOrder: number;
}


// =========================================================
// 2. ХУК ДЛЯ ЗАГРУЗКИ КОРЗИНЫ
// =========================================================

export const useBasketQuery = () => {
  return useQuery<BasketResponse, Error>({
    queryKey: ['basket'], // Уникальный ключ для кеширования и инвалидации
    queryFn: GetBasketApi, // Функция, которая делает запрос
    staleTime: 1000 * 60 * 1, // Кеш считается свежим 5 минут
    retry: 2, // Повторить попытку 2 раза в случае ошибки
  });
};

// =========================================================
// 3. КОМПОНЕНТ ЭКРАНА
// =========================================================

export default function BasketScreen() {
  // Заменяем useState/useEffect на useQuery
  const { 
    data: basket, 
    isLoading, 
    isError, 
    error,
    refetch, 
    isFetching 
  } = useBasketQuery(); 

      const setDeliveryTimesToday = useDeliveryStore(
    (state) => state.setDeliveryTimesToday
  );
  const setDeliveryTimesTomorrow = useDeliveryStore(
    (state) => state.setDeliveryTimesTomorrow
  );
   const setCode = useDeliveryStore(
    (state) => state.setCode
  );



   useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );
  
  // --- Состояния Загрузки и Ошибки ---

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text className="mt-4 text-gray-500">Загрузка корзины...</Text>
      </View>
    );
  }

  if (isError) {
    // В React Native/Expo ошибка может быть объектом. Выводим её для дебага.
    console.error("Basket Query Error:", error); 
    return (
      <View style={styles.centerContainer}>
        <Text className="text-red-500">Ошибка загрузки корзины: </Text>
        <Text className="text-red-500 text-sm">{error.message}</Text>
      </View>
    );
  }
   const refreshControl = (
    <RefreshControl
      // Указывает, нужно ли показывать индикатор обновления
      refreshing={isFetching} 
      // Функция, которая вызывается при "потягивании"
      onRefresh={refetch} 
      // Цвет индикатора (Android)
      tintColor="#4F46E5" 
      // Цвет фона (Android)
      progressBackgroundColor="#FFFFFF" 
    />
  );

  if (!basket || basket.merchantItems.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text className="text-lg text-gray-700">🛒 Корзина пуста</Text>
        <TouchableOpacity 
           className="mt-5 bg-blue-500 p-3 rounded-md items-center"
           onPress={() => router.push('/(tabs)/(home)')}
        >
             <Text className="text-white font-bold">Начать покупки</Text>
        </TouchableOpacity>
      </View>
    );
  }


    const handleGoToCheckout = () => {
    const deliveryTimesToday = basket.deliveryTimesToday;
    const deliveryTimesTomorrow = basket.deliveryTimesTomorrow;
    const code = basket.code;
    // Сохраняем данные в Zustand store
    setDeliveryTimesToday(deliveryTimesToday);
    setDeliveryTimesTomorrow(deliveryTimesTomorrow);
    setCode(code);

    router.push("/chekout");
  };

  

  // --- Основной рендеринг ---
  return (
    <SafeAreaView edges={['bottom']} className="flex-1 bg-gray-100">
      <ScrollView className="flex-1" refreshControl={refreshControl}>
        {basket.merchantItems.map((merchantItem, index) => (
          <View key={index} className="bg-white m-2 p-4 rounded-lg shadow-md">
            
            {/* Блок магазина */}
            <View className="flex-row items-center mb-3">
              <Image
                // 🔥 Убедитесь, что этот URL использует HTTPS, иначе Android может заблокировать
                source={{ uri: `https://gipertm.com/merchantStore/image?code=${merchantItem.store.storeLogo}` }}
                style={styles.logoImage} // Используем фиксированные стили
              />
               <Text className="text-lg font-bold ml-2">{merchantItem.store.name}</Text>
            </View>
           
            {/* Товары */}
            {merchantItem.groupedLineItems.map((group, groupIndex) => (
              <View key={groupIndex}>
                {group.lineItems.map((item) => (
                  <View key={item.id} className="flex-row my-2 border-t border-gray-100 pt-2">
                    <Image
                      // 🔥 Убедитесь, что item.product.image.imageUrl использует HTTPS
                      source={{ uri: item.product.image.imageUrl }}
                      style={styles.productImage} // Используем фиксированные стили
                    />
                    <View className="flex-1 ml-4 justify-center">
                      <Text className="font-semibold">{item.product.description.name}</Text>
                      <Text className="text-gray-600">Количество: {item.quantity}</Text>
                      <Text className="font-bold mt-1 text-base">{item.itemPrice}</Text>
                    </View>

                    <View className='h-full gap-2 bg-gray-200 w-5 items-center'>
                      <Pressable>
                        <Text>+</Text>
                        </Pressable>
                      <Text>1</Text>
                      <Pressable><Text>+</Text></Pressable>
                    </View>
                    
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      
      {/* Блок итогов */}
      <View className='bg-yellow-500'>
        
          {basket.shippingTypes.map((item) => (
            <Text className='text-xs' key={item.text}>{item.desc}</Text>
          ))}

      </View>
      <View className="p-4 bg-white border-t border-gray-200 shadow-lg">
        <View className="flex-row justify-between mb-2">
          <Text className="text-xs text-gray-700">Сумма</Text>
          <Text className="text-xs text-gray-800">{basket.subTotal}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-xs text-gray-700">Доставка</Text>
          <Text className="text-xs text-gray-800">{basket.shipping}</Text>
        </View>
        <View className="flex-row justify-between mb-4 border-t border-gray-100 pt-2">
          <Text className="font-bold text-xl">Итого</Text>
          <Text className="font-bold text-xl text-blue-600">{basket.total}</Text>
        </View>
        <TouchableOpacity
          className="bg-blue-600 p-4 rounded-md items-center shadow-md"
          onPress={handleGoToCheckout} // Лучше на страницу оформления заказа
        >
          <Text className="text-white text-lg font-bold">Sargydy tassyklamak</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// =========================================================
// 4. СТИЛИ (Для надежности Image)
// =========================================================

const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
    },
    logoImage: {
        width: 48, // w-12
        height: 48, // h-12
        borderRadius: 6, // rounded-md
    },
    productImage: {
        width: 80, // w-20
        height: 80, // h-20
        borderRadius: 6, // rounded-md
    },
});
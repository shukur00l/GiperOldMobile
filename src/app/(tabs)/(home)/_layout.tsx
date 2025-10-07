import { SearchApi } from "@/src/api/search";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router, Stack } from 'expo-router';
import { CircleX, Search } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, Modal, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

type Product = {
  id: number;
  name: string;
  imageUrl: string;
  d: string;
  promoExist: boolean;
  simplePromo?: boolean;
  defaultAvailability?: {
    id: number;
    price: string;
    specialPrice: string | null;
    productShipeable: boolean;
    discountPercent?: number;
  };
};

export default function HomeLayout() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);
  const [searchText, setSearchText] = useState('');
 const [fullData, setFullData] = useState<any>(null);

useEffect(() => {
  if (searchText) {
    setIsLoading(true);
    setError(null);
    
    // Add console log to debug the API response
    SearchApi(searchText).then((response) => {
      
      if (response && response.products) {
        // Direct products array in response - this is the correct format based on your data
        setData(response.products);
        setFullData(response);
      } else if (response && response.data && response.data.products) {
        // Alternative format
        console.log('Setting products from response.data.products');
        setData(response.data.products);
        setFullData(response);
      } else {
        console.log('No products found in response');
        setError('No results found');
        setData([]);
      }
      setIsLoading(false);
    }).catch(err => {
      console.log('Search error:', err);
      setError('Error fetching results');
      setIsLoading(false);
    });
  } else {
    setData([]);
    setIsLoading(false);
  }
}, [searchText]);

  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      // Clear search when modal is closed
      setSearchText('');
      setData([]);
    }
  }, [modalVisible]);

  const onHandleTextChange = (text: string) => {
    setSearchText(text);
  }

const renderSearchItem = ({ item }: { item: Product }) => {
  return (
  <Pressable
  className="p-3 border-b border-gray-200"
  onPress={() => {
    setModalVisible(false); 
    router.push(`/productitems/${item.id}`);
  }}
>
      <View className="flex-row items-center">
        {item.imageUrl && (
          <Image 
            source={{ uri: item.imageUrl.trim() }} 
            className="w-16 h-16 rounded-md mr-3" 
            defaultSource={require('../../../../assets/images/splash-icon.png')}
          />
        )}
        <View className="flex-1">
          <Text className="font-medium text-base">
            {item.name}
          </Text>
          <Text className="text-gray-600 mt-1">
            {item.defaultAvailability?.price || (item.d ? item.d + " TMT" : "")}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const queryClient = new QueryClient();
  return (
        <QueryClientProvider client={queryClient}>
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
         
        },
      
        headerTransparent: true,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      >
      <Stack.Screen name="index" 
          options={{ 
          title: '',
          headerRight : () => <Pressable className='w-[40px] h-[40px] rounded-full items-center justify-center'
           onPress={() => router.push('/(tabs)/(zfavourite)')}
           >
           <Image source={require('../../../../assets/images/Union.png')} /></Pressable>,

          headerLeft: () => <Image source={require('../../../../assets/images/Layer2.png')} />,

             headerTitle: () => (
             <>
      
      <Pressable
        onPress={() => setModalVisible(true)}
        className="flex-row items-center border-[1px] border-[#BABDED] rounded-md px-3 ml-5 w-[300px] h-10"
      >
        <Search color="#BABDED" />
        <Text style={{ marginLeft: 8, color: "#BABDED", fontSize: 12 }}>
          Gözle
        </Text>
      </Pressable>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)} // для Android кнопки "назад"
      >
        <SafeAreaView className="flex-1 bg-white px-5 mt-10">
        <View  className='mt-5  h-full'>
            <Pressable
            onPress={() => setModalVisible(false)}
            className="p-4 bg-gray-200 rounded-full w-12 h-12 items-center justify-center"
          >
            <CircleX />
          </Pressable>
          <TextInput
            ref={inputRef}
            autoFocus={true}
            placeholder="Gözle"
            placeholderTextColor="#BABDED"
            className="border border-[#BABDED] rounded-md px-3 h-16 text-base mt-4"
            onChangeText={(text) => onHandleTextChange(text)}
            value={searchText}
          />

           <View className="flex-1 mt-4">
              {isLoading ? (
                <View className="items-center justify-center py-10">
                  <ActivityIndicator size="large" color="#BABDED" />
                  <Text className="mt-2 text-gray-500">Gözlenýär...</Text>
                </View>
              ) : error ? (
                <View className="items-center justify-center py-10">
                  <Text className="text-red-500">{error}</Text>
                </View>
              ) : data.length > 0 ? (
                <FlatList
                  data={data}
                  renderItem={renderSearchItem}
                  keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 20 }}
                />
              ) : searchText ? (
                <View className="items-center justify-center py-10">
                  <Text className="text-gray-500">Hiç zat tapylmady</Text>
                </View>
              ) : null}
            </View>

        </View>
        </SafeAreaView>
      </Modal>
    </>
          ),
          }}/>
      <Stack.Screen name="categoryitems/[categoryid]" options={{
        headerShown: false,
        headerTransparent: true,
      }}/>
    </Stack>
    </QueryClientProvider>
  );
}

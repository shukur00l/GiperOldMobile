import { AddBasketApi } from "@/src/api/addBasket";
import { ProductitemsApi } from "@/src/api/getproductid";
import { GetRekomondaishenApi } from "@/src/api/rekomondaishen";
import RecommendationView from "@/src/components/home/recomendationView";
import { prodcuts } from "@/src/types/home.pagetype";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


type Banner = {
  productRelationshipId: number;
  image: {
    imageUrl: string;
    siteImageUrl: string;
  };
};

// Обновленный тип, соответствующий реальным данным API
type ProductDetailType = {
  id: number;
  description: {
    name: string;
    description: string | null;
  };
  images: string[];
    categories?: Array<{
    code: string;
    id: number;
    parents?: Array<{ code: string }>;
  }>;
  category: {
    code: string; // cCode
    id: number;   // cId
       parentCode?: string;
  };
  manufacturer: {
    id: number;   // bId
    code: string; // bCode
  };
  defaultAvailability: {
    price: string;
    specialPrice: string | null;
    quantity: number;
    productShipeable: boolean;
    store: {
      name: string;
      code: string;
    };
    id: number;

  description: {
    name: string;
    description: string | null;
  };
  images: string[];
  defaultAvailability: {
    price: string;
    specialPrice: string | null;
    quantity: number;
    productShipeable: boolean;
    store: {
      name: string;
      code: string;
    };
    id : number;
  };
  availabilities: Array<{
    id: number;
    price: string;
    specialPrice: string | null;
    quantity: number;
    productShipeable: boolean;
  }>;
};
}

export default function ProductDetail() {
  const params = useLocalSearchParams();
  const id = params.productitems;
  const [product, setProduct] = useState<ProductDetailType | null>(null);
  const [rekomondaishen, setRekomondaishen] = useState<ProductDetailType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  const [loadingRekom, setLoadingRekom] = useState(false);
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      ProductitemsApi(id as string)
        .then((res: any) => {
          setProduct(res);
          setIsLoading(false);
        }).catch((error) => {
        console.log("Error fetching product:", error);
        setIsLoading(false);
      });
    }
  }, [id]);


    const formatImagesForCarousel = (images: string[]): Banner[] => {
    return images.map((imageUrl, index) => ({
      productRelationshipId: index,
      image: {
        imageUrl: imageUrl,
        siteImageUrl: imageUrl
      }
    }));
  };

    const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

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

    const carouselData = formatImagesForCarousel(product.images);

const mainCategory =
  product.category || (product.categories && product.categories[0]);
const categoryCode = mainCategory?.code ?? "";
const categoryId = mainCategory?.id ?? 0;

const parentCode =
  "parentCode" in (mainCategory ?? {})
    ? (mainCategory as any)?.parentCode ?? ""
    : (mainCategory as any)?.parents?.[0]?.code ?? "";


  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ title: product.description.name }} />
         <ScrollView className="pt-10">
      <Pressable className="pl-5 pt-10"
            onPress={() => router.back()}
            >
         <ArrowLeft />
          </Pressable>
        {product.images && product.images.length > 0 ? (
        <View className="pt-5 w-auto items-center relative">
            <FlatList
              data={carouselData}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              renderItem={({ item }) => (
                <View style={{ width: screenWidth }}>
                  <View className="items-center">
                    <Image 
                      source={{ uri: item.image.imageUrl }} 
                      className="w-64 h-64 rounded-lg" 
                    />
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.productRelationshipId.toString()}
            />
          </View>
          
        ) : (
          <Image 
            source={{ uri: "https://via.placeholder.com/400x200?text=No+Image" }} 
            className="w-full h-64 rounded-lg" 
          />
        )}
        
        <View className="px-5 mt-5 pb-40">
        <Text className="text-xl font-bold mb-2">{product.description.name}</Text>

        <Text>{product.description.description}</Text>

        <View className="flex flex-row mt-5 items-start w-full justify-between">

          <View className="flex flex-row">
           <Image 
        source={{ uri: `https://gipertm.com/merchantStore/image?code=${product.defaultAvailability.store.code}` }} 
        className="w-16 h-16 rounded-lg" 
      />
      <View>
        {product.defaultAvailability?.specialPrice ? (
            <View className="flex flex-row items-center ml-5">
            <Text className="text-lg text-red-500 mb-2">
              {product.defaultAvailability.specialPrice}
            </Text>
            <Text className="text-xs text-gray-500 line-through ml-3">
              {product.defaultAvailability.price}
            </Text>
            </View>
          ) : (
            <Text className="text-lg mb-2 pl-5">{product.defaultAvailability?.price}</Text>
          )
        }
        <Text className="text-base font-bold ml-5">{product.defaultAvailability.store.name}</Text>
     </View>
</View>
     <Pressable className="w-40 h-16 bg-[#FF8C00] rounded-lg items-center justify-center right-0"
        onPress={() => AddBasketApi(product.defaultAvailability.id)}
     >
       <Text className="text-white font-bold">Sebede goş</Text>
     </Pressable>
      </View>

     <View className="mt-10">
          {mainCategory ? (
  <RecommendationView
    productId={product.id}
    categoryCode={categoryCode}
    categoryParentCode={parentCode}
    manufacturerCode={product.manufacturer.code}
    manufacturerId={product.manufacturer.id}
    categoryId={categoryId}
  />
) : (
  <Text className="text-gray-500">Kategoriýa maglumatlary ýok</Text>
)}
          </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}
import { ArrowLeft, ShoppingCart } from "lucide-react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Image, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import BannerCarousel from "./carousel";
import { router } from "expo-router";
import { AddBasketApi } from "@/src/api/addBasket";
import { useQueryClient } from '@tanstack/react-query';
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

// Memoized product item component
const ProductItem = React.memo(({ 
  product, 
  onAddToBasket 
}: { 
  product: Product; 
  onAddToBasket: (id: number) => void;
}) => {
  const handleAddToBasket = useCallback(() => {
    onAddToBasket(product.defaultAvailability.id);
  }, [product.defaultAvailability.id, onAddToBasket]);

  const handleNavigateToProduct = useCallback(() => {
    router.push(`/(tabs)/(home)/productitems/${product.id}`);
  }, [product.id]);

  return (
    <Pressable className="w-[165px] h-[195px] ml-5 rounded-[5px] m-4"
      onPress={handleNavigateToProduct}
    >
      <Image
        source={{ uri: product.imageUrl }}
        className="w-[165px] h-[128px] rounded-[5px]"
      />

      {product.newProduct && (
        <View className="absolute top-0 left-0 bg-green-500 px-1 rounded-rl-[5px]">
          <Text className="text-white text-[10px] font-bold">Täze</Text>
        </View>
      )}

      <FavoriteButton product={product} />

      <Pressable 
        className='absolute bottom-16 right-0 bg-[#5600B3] w-8 h-8 rounded-[5px] items-center justify-center outline-8 outline-white'
        onPress={handleAddToBasket}
      >
        <ShoppingCart size={20} color='white' />
      </Pressable>

      <View className="flex flex-row mt-5">
        {product.defaultAvailability.specialPrice ? (
          <View className="flex flex-row items-end">
            <Text className="text-[14px] text-[#FF0000] font-bold">
              {product.defaultAvailability.specialPrice}
            </Text>
            <Text className="ml-2 text-[10px] text-[#A8A8A8] font-bold line-through">
              {product.defaultAvailability.price}
            </Text>
            <Text className="text-[10px] text-[#FF8C00] font-bold">
              -{product.defaultAvailability.discountPercent}%
            </Text>
          </View>
        ) : (
          <Text className="text-[14px] text-[#5600B3] font-bold">
            {product.defaultAvailability.price}
          </Text>
        )}
      </View>
      
      <Text numberOfLines={1} className="text-[14px] mt-[5px] h-10 font-bold">
        {product.name}
      </Text>
    </Pressable>
  );
});

// Memoized banner item component
const BannerItem = React.memo(({ item }: { item: CategoryWithItems }) => (
  <View className="mb-5">
    <Text className="mx-5 font-bold text-[18px] mt-5">{item.description.name}</Text>
    <BannerCarousel data={item.items as Banner[]} />  
  </View>
));

// Memoized product category component
const ProductCategory = React.memo(({ 
  item, 
  onAddToBasket 
}: { 
  item: CategoryWithItems; 
  onAddToBasket: (id: number) => void;
}) => {
  const handleNavigateToCategory = useCallback(() => {
    router.push(`/(tabs)/(home)/categoryitems/${item.id}`);
  }, [item.id]);

  const renderProductItem = useCallback(({ item: product }: { item: Product }) => (
    <ProductItem product={product} onAddToBasket={onAddToBasket} />
  ), [onAddToBasket]);

  const keyExtractor = useCallback((p: Product) => p.id.toString(), []);

  return (
    <View className="flex mb-10 h-auto justify-center items-center">
      <Text className="w-full text-left pl-5 font-bold text-[18px]">{item.description.name}</Text>
      <FlatList
        horizontal={true}
        data={item.items as Product[]}
        keyExtractor={keyExtractor}
        renderItem={renderProductItem}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
      />
      
      <TouchableOpacity 
        className="w-full h-12  mt-8 px-5"
        onPress={handleNavigateToCategory}
      >
        <View className="w-full h-full bg-[#5600B3] rounded-[10px] flex items-center justify-center">
        <Text className="text-white text-[14px]">
          Hemmesini Görkez
        </Text>
        </View>
      </TouchableOpacity>  
    </View>
  );
});

const MainScreen: React.FC = () => {
  const [data, setData] = useState<CategoryWithItems[]>([]);
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
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
              const r = await fetch(`${process.env.EXPO_PUBLIC_API_URL2}products/group/short/${cat.id}?offset=0&max=5`);
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

  const addBasket = useCallback(async (id: number) => {
    try {
      await AddBasketApi(id);
      queryClient.invalidateQueries({ queryKey: ['basket'] });
    } catch (e) {
      console.error("Ошибка добавления в корзину:", e);
    }
  }, [queryClient]);

  const closeModal = useCallback(() => {
    setVisible(false);
    setSelectedProduct(null);
  }, []);

  const renderItem = useCallback(({ item }: { item: CategoryWithItems }) => {
    if (item.type === "banner") {
      return <BannerItem item={item} />;
    }

    if (item.type === "product") {
      return <ProductCategory item={item} onAddToBasket={addBasket} />;
    }

    return null;
  }, [addBasket]);

  const keyExtractor = useCallback((item: CategoryWithItems) => item.id.toString(), []);

  const modalContent = useMemo(() => (
    <Modal visible={visible} animationType="none" transparent={true}>
      <View className="bg-[#000000] bg-opacity-[0.5] h-full w-full items-center justify-center">
        <View className="bg-white p-5 w-full h-full pt-14">
          <Pressable
            className="w-full h-[50px] flex flex-row items-center"
            onPress={closeModal}
          >
            <ArrowLeft />
            <Text className="text-[18px] font-bold ml-5">Yza</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  ), [visible, closeModal]);

  return (
    <>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
        removeClippedSubviews={true}
      />
      {modalContent}
    </>
  );
};

export default React.memo(MainScreen);
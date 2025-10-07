import { StoresApi } from "@/src/api/store";
import ShopItem from "@/src/components/katalog/shops";
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface ShopDescription {
  id: number;
  name: string;
  description: string;
  address: string;
  lang: string;
}

export interface Shop {
  id: number;
  code: string;
  imageUrl: string;
  descriptions: ShopDescription[];
}

export default function ShopsScreen() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [offset, setOffset] = useState(0);
  const [max] = useState(20);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchShops = useCallback(async () => {
    if (loading || !hasMore) return;
    try {
      setLoading(true);
      const response = (await StoresApi(offset, max)) as Shop[];

      if (response.length === 0) {
        setHasMore(false);
      } else {
        setShops((prev) => {
  const newShops = response.filter(
    (shop) => !prev.some((prevShop) => prevShop.id === shop.id)
  );
  return [...prev, ...newShops];
});
        setOffset((prev) => prev + max);
      }
    } catch (error) {
      console.error("Ошибка загрузки магазинов:", error);
    } finally {
      setLoading(false);
    }
  }, [offset, max, loading, hasMore]);

  useEffect(() => {
    fetchShops();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={shops}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ShopItem shop={item} />}
        onEndReached={fetchShops}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="small" className="my-4" />
          ) : null
        }
      />
    </SafeAreaView>
  );
}
import { BrendsApi } from '@/src/api/brends';
import BrandItem from '@/src/components/katalog/brends';
import { useEffect, useState, useCallback } from 'react';
import { View, Image, FlatList, ActivityIndicator } from 'react-native';

export interface BrandDescription {
  id: number;
  name: string;
  description: string | null;
  lang: string;
}

export interface Brand {
  id: number;
  code: string;
  image: string;
  imageUrl: string;
  sortOrder: number;
  descriptions: BrandDescription[];
}

export interface BrandApiResponse {
  data: Brand[];
}

export default function BrendsScreen() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [offset, setOffset] = useState(0);
  const [max] = useState(50);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = useCallback(async () => {
    if (loading || !hasMore) return;
    try {
      setLoading(true);
      const response = (await BrendsApi(offset, max)) as BrandApiResponse;

      if (response.data.length === 0) {
        setHasMore(false); // больше нет данных
      } else {
       setBrands((prev) => {
  const newBrands = response.data.filter(
    (brand) => !prev.some((b) => b.id === brand.id)
  );
  return [...prev, ...newBrands];
});
        setOffset((prev) => prev + max);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [offset, max, loading, hasMore]);

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={brands}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
        contentContainerClassName="p-2"
        columnWrapperClassName="justify-between"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <BrandItem imageUrl={item.imageUrl} />}
        onEndReached={fetchBrands}         // ⬅️ когда дошли до низа
        onEndReachedThreshold={0.5} 
        removeClippedSubviews={true}       // подгрузка за 50% до конца
        ListFooterComponent={loading ? (   // индикатор загрузки
          <ActivityIndicator size="small" className="my-4" />
        ) : null}
      />
    </View>
  );
}
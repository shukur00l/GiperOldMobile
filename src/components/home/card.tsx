// import { View, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { Card } from '@rneui/themed';
// import { getSpuList } from '@/src/api/postSpulist';
// import { DataSpuList, SpuList } from '@/src/types/spulist';
// import { CategoryItem, Categorytype, DashboardItemType, prodcuts } from '@/src/types/home.pagetype';
// import { GetCategoryApi } from '@/src/api/featuredProductsUrl';
// import { GetBannerApi } from '@/src/api/bannersUrl';
// import { GetProductApi } from '@/src/api/mainProductsUrl';

// const { width } = Dimensions.get('window');
// const CARD_WIDTH = (width - 80) / 2; 

// const Cardcomponent = () => {
  
//  const [category, setCategory] = useState<Categorytype[]>([]);
//  const [data , setData] = useState<prodcuts[]>([]);

//  const GetCategory = async () => {
//     try{
//       const response = await GetCategoryApi();
//       setCategory(response);
//     }catch(error){
//       console.log(error);
//     }
//   };



//  const fetchAllBannersForCategories = async (
//     categories: CategoryItem[]
//   ): Promise<void> => {

//     for (let i = 0; i < categories.length; i++) {
//       const itemID: number = categories[i].id;
//       const withImgae: boolean = categories[i].withImage;
//       const filterParams: string = categories[i].filterParams
//       const name: string = categories[i].description.name;
//       if (withImgae) {
//         const bannerPromises = GetBannerApi(itemID, filterParams);
//           bannerPromises.then((bannerData) => {
//           setData((prevData) => [...prevData, { type: 'banner', ...bannerData }]);
//         });
//       } else {
//         const ProductPromises = GetProductApi(itemID, filterParams);
//         ProductPromises.then((productData) => {
//                setData((prevData) => [...prevData, { type: 'product', ...productData }]);
//         });
//       }
//     }
  
// }

//   useEffect(() => {
//      GetCategory();
//   }, []);

//     useEffect(() => {
//     if (category.length > 0) {
//       fetchAllBannersForCategories(category);
//     }
//   }, [category]); 




//   return (
//     <View style={{ flex: 1, padding: 10 }}>
//       <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
//         Dashboard Items (Parallel Load)
//       </Text>
//       <FlatList
//         data={data}
//         // Используем комбинацию type и id для уникального ключа, если id может дублироваться
//         keyExtractor={(item, index) => `${item.type}-${item.id}-${index}`}
//         renderItem={({ item, index }) => (
//           <View style={styles.cardContainer}>
//             <Text style={styles.indexText}>{index + 1}.</Text>
//             <Text style={styles.typeText}>
//               Тип: <Text style={{ fontWeight: 'bold' }}>{item.type.toUpperCase()}</Text>
//             </Text>
//             <Text>ID: {item.id}</Text>
//             <Text>Имя: {item.name}</Text>
//             <Text>URL изображения: {item.imageUrl.substring(0, 30)}...</Text>
//           </View>
//         )}
//       />
//        {data.length === 0 && <Text>Загрузка данных...</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     cardContainer: {
//         marginBottom: 10, 
//         padding: 10, 
//         backgroundColor: '#f9f9f9', 
//         borderRadius: 8, 
//         borderLeftWidth: 5,
//         borderLeftColor: '#3498db',
//     },
//     typeText: {
//         fontSize: 14,
//         color: '#2c3e50',
//     },
//     indexText: {
//         fontSize: 16,
//         fontWeight: '900',
//         color: '#e74c3c',
//         marginBottom: 5,
//     }
// });
// export default Cardcomponent;

import { View, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Card } from '@rneui/themed';
// You can remove unused imports like getSpuList, DataSpuList, SpuList if they aren't used
import { CategoryItem, Categorytype, prodcuts, banners } from '@/src/types/home.pagetype';
import { GetCategoryApi } from '@/src/api/featuredProductsUrl';
import { GetBannerApi } from '@/src/api/bannersUrl';
import { GetProductApi } from '@/src/api/mainProductsUrl';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 80) / 2; 

// --- FIX: Define the common type that includes the 'type' field ---
// This will be the type for the items stored in the 'data' state.

interface ProductDisplayItem {
    type: 'product';
    id: number;
    name: string;
    imageUrl: string;
    // Add other relevant prodcuts fields here if you need them in the display
}

interface BannerDisplayItem {
    type: 'banner';
    id: number; // productRelationshipId is used as the ID for banners
    name: string;
    imageUrl: string;
    // Add other relevant banners fields here
}

type DisplayItem = ProductDisplayItem | BannerDisplayItem;
// -----------------------------------------------------------------

const Cardcomponent = () => {
  
 const [category, setCategory] = useState<Categorytype[]>([]);
 // FIX: Use the new DisplayItem type for the state
 const [data , setData] = useState<DisplayItem[]>([]);

 const GetCategory = async () => {
    try{
      const response = await GetCategoryApi();
      setCategory(response);
    }catch(error){
      console.error('Error fetching categories:', error);
    }
  };


 const fetchAllBannersForCategories = async (
    categories: CategoryItem[]
  ): Promise<void> => {

    // 1. Create an array of Promises
    const promises = categories.map((categoryItem) => {
      const { id: itemID, withImage, filterParams } = categoryItem;
      
      if (withImage) {
        // Fetch Banner
        return GetBannerApi(itemID, filterParams).then((bannerData: banners) => ({
          // Map banner data to the common DisplayItem structure
          type: 'banner' as const,
          id: bannerData.productRelationshipId, // Use the correct ID field for banners
          name: bannerData.description.name,
          imageUrl: bannerData.image.imageUrl,
        } as BannerDisplayItem)); // Assert the final structure
      } else {
        // Fetch Product
        return GetProductApi(itemID, filterParams).then((productData: prodcuts) => ({
          // Map product data to the common DisplayItem structure
          type: 'product' as const,
          id: productData.id, // Use the correct ID field for products
          name: productData.name,
          imageUrl: productData.imageUrl,
        } as ProductDisplayItem)); // Assert the final structure
      }
    });

    try {
        // 2. Wait for all Promises to resolve in parallel
        const results = await Promise.all(promises);
        
        // 3. Update state once
        setData(results);

    } catch (error) {
        console.error("Error fetching data in parallel:", error);
    }
}

  useEffect(() => {
     GetCategory();
  }, []);

  useEffect(() => {
    if (category.length > 0) {
      setData([]); // Clear data before new fetch
      fetchAllBannersForCategories(category);
    }
  }, [category]); 


  return (
  <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        Dashboard Items (Parallel Load)
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.type}-${item.id}-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.cardContainer}>
            <Text style={styles.indexText}>{index + 1}.</Text>
            <Text style={styles.typeText}>
              Тип: <Text style={{ fontWeight: 'bold' }}>{item.type.toUpperCase()}</Text>
            </Text>
            <Text>ID: {item.id}</Text>
            <Text>Имя: {item.name}</Text>
            <Text>URL изображения: {item.imageUrl.substring(0, 30)}...</Text>
          </View>
        )}
      />
       {data.length === 0 && <Text>Загрузка данных...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginBottom: 10, 
        padding: 10, 
        backgroundColor: '#f9f9f9', 
        borderRadius: 8, 
        borderLeftWidth: 5,
        borderLeftColor: '#3498db',
    },
    typeText: {
        fontSize: 14,
        color: '#2c3e50',
    },
    indexText: {
        fontSize: 16,
        fontWeight: '900',
        color: '#e74c3c',
        marginBottom: 5,
    }
});

export default Cardcomponent;
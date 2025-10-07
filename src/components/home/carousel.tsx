import { router } from "expo-router";
import React from "react";
import { View, Dimensions, Image, Pressable } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

type Banner = {
  productRelationshipId: number;
  image: {
    imageUrl: string;
    siteImageUrl: string;
  };
  filterParams: string;
};


type Props = {
  data: Banner[];
};

const BannerCarousel: React.FC<Props> = ({ data }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Carousel
        loop
        width={width}
        height={220}
        autoPlay
        autoPlayInterval={3000}
        data={data}
        scrollAnimationDuration={1000}
        mode="parallax"
        renderItem={({ item }) => (
         <Pressable onPress={() => router.push(`/(tabs)/(home)/bannercategoryitem/${item.filterParams}`)}>
          <Image
            source={{ uri: item.image.imageUrl }}
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
          />
          </Pressable>
        )}
      />
    </View>
  );
};

export default BannerCarousel;
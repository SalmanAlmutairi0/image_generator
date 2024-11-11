import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import ImageItem from "@/components/imageItem";
import { useAuth } from "@clerk/clerk-expo";
import { bookmarkedImage } from "../api/bookmarks/[user_id]+api";

export default function Bookmarks() {
  const { userId } = useAuth();

  const fetchImages = async () => {
    const response = await fetch(
      `http://localhost:8081/api/bookmarks/${userId}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data: images, isLoading } = useQuery<bookmarkedImage[]>({
    queryKey: ["bookmarks"],
    queryFn: fetchImages,
  });

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: Colors.primary }}
    >
      <Text className="text-2xl font-bold text-white text-center border-b py-2 border-zinc-900">
        Bookmarks
      </Text>
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : null}

      {!isLoading && images && images.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-white text-2xl">No images found</Text>
        </View>
      ) : null}

      {images && images.length > 0 ? (
        <FlatList
          data={images}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          className="flex-1 mt-4 mb-10"
          renderItem={({ item }) => (
            <ImageItem image_url={item.image_url} image_id={item.image_id} bookmarked={true} />
          )}
          keyExtractor={(item) => item.image_id.toString()}
        />
      ) : null}
    </SafeAreaView>
  );
}

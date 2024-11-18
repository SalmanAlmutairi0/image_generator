import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import ImageItem from "@/components/imageItem";
import { useAuth } from "@clerk/clerk-expo";
import { bookmarkedImage } from "../api/bookmarks/[user_id]+api";
import AuthModal from "@/components/authModal";
import Loading from "@/components/loading";

export default function Bookmarks() {
  const { userId } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const refetchImages = async () => {
      if (!userId) {
        setShowAuthModal(() => true);
        return null;
      }
      
      await refetch();
    }
    refetchImages()
  },[loading])
  const fetchImages = async () => {
    if (!userId) {
      setShowAuthModal(() => true);
      return null;
    }

    const response = await fetch(
      `http://localhost:8081/api/bookmarks/${userId}`
    );
    // if (!response.ok) {
    //   throw new Error("Network response was not ok");
    // }
    return response.json();
  };

  const {
    data: images,
    isLoading,
    refetch,
  } = useQuery<bookmarkedImage[]>({
    queryKey: ["bookmarks"],
    queryFn: fetchImages,
  });

  const onRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: Colors.primary }}
    >
      <Text className="text-2xl font-bold text-white text-center border-b py-2 border-zinc-900">
        Bookmarks
      </Text>

      {/* {!userId ? (
        <View className="flex-1 items-center justify-center">
          <AuthModal
            showAuthModal={showAuthModal}
            setShowAuthModal={setShowAuthModal}
            closeable={false}
          />
        </View>
      ) : null} */}
      <AuthModal
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
        closeable={false}
      />

      {isLoading || (loading && userId) ? (
        <Loading />
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
            <ImageItem
              key={item.image_id.toString()}
              image_url={item.image_url}
              image_id={item.image_id}
              bookmarked={true}
              setLoading={setLoading}
              loading={loading}
            />
          )}
          keyExtractor={(item) => item.image_id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
              colors={["#bdde05", "#a6be04", "#8ea003"]}
              progressBackgroundColor="#333"
            />
          }
        />
      ) : null}
    </SafeAreaView>
  );
}

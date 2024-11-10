import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import CreateModal from "@/components/createModal";
import AuthModal from "@/components/authModal";
import { useAuth } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";
import { Feather } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { ImageData } from "../api/images/index+api";
import ImageItem from "@/components/imageItem";

export default function Home() {
  const { isSignedIn } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateModal = () => {
    if (!isSignedIn) {
      setShowAuthModal(true);
    } else {
      setShowCreateModal(true);
    }
  };

  const fetchImages = async () => {
    const response = await fetch("http://localhost:8081/api/images");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data: images, isLoading } = useQuery<ImageData[]>({
    queryKey: ["images"],
    queryFn: fetchImages,
  });

  return (
    <SafeAreaView
      className="flex-1 w-full h-full"
      style={{ backgroundColor: Colors.primary }}
    >
      <View className="flex-row justify-between items-center px-4 ">
        <Text
          className="text-3xl font-bold text-white "
          style={{ fontFamily: "RalewayMedium" }}
        >
          Cocode
        </Text>

        <TouchableOpacity
          className="flex-row items-center rounded-full p-2 "
          style={{ backgroundColor: Colors.lightGreen }}
          onPress={handleCreateModal}
        >
          <Feather name="plus" size={30} color="black" />
        </TouchableOpacity>
      </View>

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
          renderItem={({ item }) => <ImageItem image_url={item.image_url} />}
          keyExtractor={(item) => item.image_id.toString()}
        />
      ) : null}

      {/* Modals */}
      <AuthModal
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
      />
      <CreateModal
        showCreateModal={showCreateModal}
        setShowCreateModal={setShowCreateModal}
      />
    </SafeAreaView>
  );
}

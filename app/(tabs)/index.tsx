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

  const {
    data: images,
    isLoading,
    error,
  } = useQuery<ImageData[]>({
    queryKey: ["images"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8081/api/images");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return (
    <SafeAreaView
      className="flex-1  w-full h-full"
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

      {images && images.length > 0 ? (
        <FlatList
          data={images}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          className="flex-1 mt-4"
          renderItem={({ item }) => (
            <View className=" relative p-2 w-[50%] mb-4 ">
              <Image
                source={{ uri: item.image_url }}
                className="w-full h-56 rounded-3xl"
                style={{ resizeMode: "cover" }}
                />

              <TouchableOpacity className="absolute top-4 right-4 bg-[rgba(255,255,255,0.5)]   p-2 rounded-full">
                <Feather name="bookmark" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.image_id.toString()}
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-white text-xl">No images available</Text>
        </View>
      )}

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

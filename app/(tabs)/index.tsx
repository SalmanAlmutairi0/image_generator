import { View, Text, TouchableOpacity, Button } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { Modal } from "react-native";
import CreateModal from "@/components/createModal";
import AuthModal from "@/components/authModal";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";

export default function Home() {
  const { isSignedIn } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateModal = () => {
    if (!isSignedIn) {
      setShowAuthModal(true);
    }else{
      setShowCreateModal(true);
    }

  };

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

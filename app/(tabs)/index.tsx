import { View, Text, TouchableOpacity, Button } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { Modal } from "react-native";
import CreateModal from "@/components/createModal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
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
          onPress={() => setShowModal((prev) => !prev)}
        >
          <Feather name="plus" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <CreateModal showModal={showModal} setShowModal={setShowModal} />

    </SafeAreaView>
  );
}

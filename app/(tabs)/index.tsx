import { View, Text, TouchableOpacity, Button } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { Modal } from "react-native";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  return (
    <SafeAreaView
      className="flex-1 px-4 "
      style={{ backgroundColor: Colors.primary }}
    >
      <View className="flex-row justify-between items-center ">
        <Text
          className="text-3xl font-bold text-white "
          style={{ fontFamily: "RalewayMedium" }}
        >
          Cocode
        </Text>

        <TouchableOpacity
          className="flex-row items-center rounded-full relative z-50 p-2 "
          style={{ backgroundColor: Colors.lightGreen }}
          onPress={() => setShowModal((prev) => !prev)}
        >
          <Feather name="plus" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <Modal animationType="fade" transparent={true} visible={showModal}>
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center absolute top-1 right-5 rounded-full "
          style={{ backgroundColor: Colors.lightGreen }}
          onPress={() => setShowModal((prev) => !prev)}
        >
          <Feather name="x" size={30} color="black" />
        </TouchableOpacity>


        <View className=" h-3/5 absolute bottom-0 w-full  bg-neutral-900 rounded-t-[30px] py-4 px-5"></View>
      </Modal>
    </SafeAreaView>
  );
}

import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

export default function LandingScreen() {
  return (
    <ImageBackground
      source={require("../assets/images/astronaut.jpg")}
      className="w-full h-full "
    >
      <LinearGradient
        colors={["transparent", "rgba(0, 0, 0, 0.9)", "rgba(0, 0, 0, 1)"]}
        start={{ x: 0, y: 0.6 }}
        end={{ x: 0, y: 0.9 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "100%",
        }}
      />

      <SafeAreaView className="flex-1 items-center justify-between mt-6 ">
        <Text
          className="text-3xl font-bold text-white mt-6"
          style={{ fontFamily: "RalewaySemiBold" }}
        >
          Cocode
        </Text>

        <View className="p-4 items-center justify-center w-full ">
          <Text
            className="text-white text-4xl mb-4 text-center text-bold "
            style={{ fontFamily: "RalewaySemiBold" }}
          >
            Generate Anything What's in your mind right now.
          </Text>

          <Text className="text-gray-500 text-lg text-center">
            An AI that developed to help you Generate what's in your mind right.
          </Text>

          <TouchableOpacity
            className="w-full items-center justify-center mt-4 rounded-2xl py-3"
            style={{
              backgroundColor: Colors.lightGreen,
            }}
            onPress={() => router.replace("./(tabs)/")}
          >
            <Text
              className="text-black text-xl"
              style={{
                fontFamily: "RalewaySemiBold",
              }}
            >
              Let's Go!
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { SignedIn} from "@clerk/clerk-expo";

export default function ImageItem({ image_url }: { image_url: string }) {
  return (
    <View className=" relative p-2 w-[50%] mb-4 ">
      <Image
        source={{ uri: image_url }}
        className="w-full h-56 rounded-3xl"
        style={{ resizeMode: "cover" }}
      />
      <SignedIn>
        <TouchableOpacity className="absolute top-4 right-4 bg-[rgba(255,255,255,0.5)]   p-2 rounded-full">
          <Feather name="bookmark" size={24} color="white" />
        </TouchableOpacity>
      </SignedIn>
    </View>
  );
}

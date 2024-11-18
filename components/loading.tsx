import { View, ActivityIndicator } from "react-native";
import React from "react";

export default function Loading() {
  return (
    <View
      className="flex-1 items-center justify-center absolute top-0 left-0 right-0 bottom-0 z-20"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}

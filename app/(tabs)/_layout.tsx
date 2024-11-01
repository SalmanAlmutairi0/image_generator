import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#fff",
        tabBarActiveBackgroundColor: Colors.lightGreen,

        tabBarStyle: {
          height: 60,
          width: "85%",
          borderRadius: 25,
          position: "absolute",
          bottom: 20,
          left: "6%",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
        },
     
        
        tabBarItemStyle: {
          borderRadius: 25,
          marginHorizontal: 3,
          marginVertical: 3,
        },

        tabBarLabelStyle: {
          display: "none",
        },

      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: "Discover",
          tabBarIcon: ({ color, focused }) => (
            <View className="flex-row items-center gap-1 ">
              <Feather name="home" size={focused ? 20 : 24} color={color} />
              {focused && (
                <Text
                  style={{
                    color: color,
                    fontFamily: "RalewaySemiBold",
                    fontSize: 12,
                  }}
                >
                  Discover
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          headerShown: false,
          tabBarLabel: "Bookmarks",
          tabBarIcon: ({ color, focused }) => (
            <View className="flex-row items-center gap-1">
              <Feather name="bookmark" size={focused ? 20 : 24} color={color} />
              {focused && (
                <Text
                  style={{
                    color: color,
                    fontFamily: "RalewaySemiBold",
                    fontSize: 12,
                  }}
                >
                  Bookmarks
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View className="flex-row items-center gap-1">
              <Feather name="user" size={focused ? 20 : 24} color={color} />
              {focused && (
                <Text
                  style={{
                    color: color,
                    fontFamily: "RalewaySemiBold",
                    fontSize: 12,
                  }}
                >
                  Profile
                </Text>
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

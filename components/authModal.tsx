import { View, Text, Modal, Button, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { Feather } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { Link } from "expo-router";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { Colors } from "@/constants/Colors";

type Props = {
  showAuthModal: boolean;
  setShowAuthModal:
    | React.Dispatch<React.SetStateAction<boolean>>
    | (() => void);
  closeable?: boolean;
};
export default function AuthModal({
  showAuthModal,
  setShowAuthModal,
  closeable = true,
}: Props) {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleAuth = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("./(tabs)/", { scheme: "myapp" }),
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        setShowAuthModal(false);
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <Modal animationType="slide" transparent visible={showAuthModal}>
      <View className=" mt-auto bg-[#191919] w-full rounded-t-3xl p-4 shadow-2xl shadow-white">
        
        {closeable && (
          <View className="flex-row justify-end w-full">
            <Feather
              name="x"
              size={24}
              color="white"
              onPress={() => setShowAuthModal(false)}
            />
          </View>
        )}

        <View className="items-center justify-center gap-4 mb-7">
          <Text className="text-white text-2xl">
            Sign in with your favorite provider
          </Text>
          <TouchableOpacity
            className="w-full items-center justify-center mt-4 rounded-2xl py-3"
            style={{
              backgroundColor: Colors.lightGreen,
            }}
            onPress={handleAuth}
          >
            <Text
              className="text-black text-xl"
              style={{
                fontFamily: "RalewaySemiBold",
              }}
            >
              Sign in with Google
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

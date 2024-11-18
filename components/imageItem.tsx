import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { SignedIn, useAuth } from "@clerk/clerk-expo";

export default function ImageItem({
  image_url,
  image_id,
  bookmarked = false,
  setLoading,
  loading,
}: {
  image_url: string;
  image_id: number;
  bookmarked?: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}) {
  const { userId } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);

  const handleBookmark = async () => {
    setIsBookmarked((prev) => !prev);
    setLoading(() => true);
    try {
      const res = await fetch("http://localhost:8081/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_id: image_id,
          user_id: userId,
        }),
      });

      // if (!res.ok) {
      //   throw new Error("Network response was not ok");
      // }
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(() => false);
    }
  };


  return (
    <View className=" relative p-2 w-[50%] mb-4 ">
      <Image
        source={{ uri: image_url }}
        className="w-full h-56 rounded-3xl"
        style={{ resizeMode: "cover" }}
      />
      <SignedIn>
        <TouchableOpacity
          className="absolute top-4 right-4 bg-[rgba(255,255,255,0.5)]   p-2 rounded-full"
          onPress={handleBookmark}
          disabled={loading}
          style={{ display: loading ? "none" : "flex" }}
        >
          <Feather
            name={isBookmarked ? "check" : "bookmark"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </SignedIn>
    </View>
  );
}

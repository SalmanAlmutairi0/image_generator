import {
  View,
  Text,
  Modal,
  Button,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import FormGroup from "./formGroup";
import { Images } from "@/constants/Images";

type Props = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateModal({ showModal, setShowModal }: Props) {
  const [selectedImage, setSelectedImage] = useState(-1);
  const [selectedcolor, setSelectedColor] = useState('');

  const imageColors = [
    { name: "Crimson", hex: "#DC143C" },
    { name: "Deep Sky Blue", hex: "#00BFFF" },
    { name: "Lime Green", hex: "#32CD32" },
    { name: "Goldenrod", hex: "#DAA520" },
    { name: "Medium Violet Red", hex: "#C71585" },
    { name: "Coral", hex: "#FF7F50" },
    { name: "Steel Blue", hex: "#4682B4" },
    { name: "Tomato", hex: "#FF6347" },
    { name: "Medium Sea Green", hex: "#3CB371" },
    { name: "Orchid", hex: "#DA70D6" },
    { name: "Slate Blue", hex: "#6A5ACD" },
    { name: "Turquoise", hex: "#40E0D0" },
    { name: "Misty Rose", hex: "#FFE4E1" },
    { name: "Light Coral", hex: "#F08080" },
    { name: "Papaya Whip", hex: "#FFEFD5" },
    { name: "Peach Puff", hex: "#FFDAB9" },
    { name: "Light Goldenrod Yellow", hex: "#FAFAD2" },
    { name: "Lavender", hex: "#E6E6FA" },
    { name: "Rosy Brown", hex: "#BC8F8F" },
    { name: "Powder Blue", hex: "#B0E0E6" },
  ];

  const handleSlectedImage = (index: number) => {
    setSelectedImage(index);
  };

  const handleSlectedColor = (color: string) => {
    setSelectedColor(color);
  };
  return (
    <Modal animationType="slide" transparent visible={showModal}>
      <View className=" mt-auto bg-[#191919] w-full rounded-t-3xl p-4">
        <View className="flex-row justify-end w-full">
          <Feather
            name="x"
            size={24}
            color="white"
            onPress={() => setShowModal(() => false)}
          />
        </View>

        {/* image Form */}
        <View className=" w-full gap-4">
          <FormGroup lable="Prompt">
            <TextInput
              className="border border-gray-300 rounded-md p-2 text-white min-w-full"
              style={{ backgroundColor: Colors.primary }}
              placeholder="Describe the image"
              placeholderTextColor="#AAAAAA"
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
          </FormGroup>

          <FormGroup lable="image style">
            <FlatList
              className="max-h-36"
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View className="w-2" />}
              data={Images}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  className="items-center gap-1 "
                  key={index}
                  onPress={() => handleSlectedImage(index)}
                >
                  <Image
                    source={item.imagePath}
                    className={
                      `w-28 h-28 rounded-md` +
                      (selectedImage === index ? " border-4 border-white" : "")
                    }
                  />
                  <Text className="text-white text-lg">{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </FormGroup>

          <FormGroup lable="Color">
            <FlatList
              className="max-h-28"
              showsHorizontalScrollIndicator={false}
              horizontal
              data={imageColors}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  className="items-center gap-1 "
                  key={index}
                  onPress={() => handleSlectedColor(item.hex)}
                >
                  <View
                    className={`w-16 h-16 rounded-md` + (
                      selectedcolor === item.hex
                        ? " border-4 border-white"
                        : ""
                    )}
                    style={{ backgroundColor: item.hex }}
                  />
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View className="w-2" />}
            />
          </FormGroup>

          <TouchableOpacity
            className="w-full items-center justify-center mt-4 rounded-2xl py-3"
            style={{
              backgroundColor: Colors.lightGreen,
            }}
          >
            <Text
              className="text-black text-xl"
              style={{
                fontFamily: "RalewaySemiBold",
              }}
            >
              generate
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

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
import { Colors, imageColors } from "@/constants/Colors";
import FormGroup from "./formGroup";
import { Images } from "@/constants/Images";

type Props = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateModal({ showModal, setShowModal }: Props) {
  const [selectedImage, setSelectedImage] = useState(-1);
  const [selectedcolor, setSelectedColor] = useState('');

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

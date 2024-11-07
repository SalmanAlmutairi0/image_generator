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
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { SignIn, SignUp } from "@clerk/clerk-react";

type Props = {
  showCreateModal: boolean;
  setShowCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateModal({ showCreateModal, setShowCreateModal }: Props) {
  const [selectedImage, setSelectedImage] = useState<String>("");
  const [selectedcolor, setSelectedColor] = useState<String>("");
  const [prompt, setPrompt] = useState<String>("");
  const [formError, setFormError] = useState({
    prompt: "",
    selectedImage: "",
  });

  const handleSlectedImage = (styleName: string) => {
    setSelectedImage(() => styleName);
  };

  const handleSlectedColor = (color: string) => {
    setSelectedColor(() => color);
  };

  const validateForm = () => {
    const errors = {
      prompt: prompt ? "" : "Please enter a prompt",
      selectedImage: selectedImage ? "" : "Please select an image",
    };

    setFormError(errors);

    return !errors.prompt && !errors.selectedImage;
  };
  const handleSubmit = () => {
    const isValid = validateForm();

    if (!isValid) {
      console.log("form is not valid");
      return;
    }

    console.log("prompt: " + prompt);
    console.log("selected style: " + selectedImage);
    console.log("selected color: " + selectedcolor);
  };

  return (
    <Modal animationType="slide" transparent visible={showCreateModal}>
      <View className=" mt-auto bg-[#191919] w-full rounded-t-3xl p-4 shadow-2xl shadow-white">
        <View className="flex-row justify-end w-full">
          <Feather
            name="x"
            size={24}
            color="white"
            onPress={() => setShowCreateModal(() => false)}
          />
        </View>

        {/* image Form */}
        <View className=" w-full gap-4 mb-7">
          <FormGroup lable="Prompt">
            <TextInput
              className={`border  rounded-md p-2 text-white min-w-full ${
                formError.prompt ? "border-red-500" : "border-gray-300"
              }`}
              style={{ backgroundColor: Colors.primary }}
              placeholder="Enter a Simple Prompt"
              placeholderTextColor="#AAAAAA"
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              onChangeText={(prompt) => setPrompt(prompt)}
            />
          </FormGroup>

          <FormGroup lable="image style">
            <FlatList
              className={`rounded-md p-2 ${formError.selectedImage ? "border border-red-500" : ""} `}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View className="w-2" />}
              data={Images}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  className="items-center gap-1 "
                  key={index}
                  onPress={() => handleSlectedImage(item.name)}
                >
                  <Image
                    source={item.imagePath}
                    className={
                      `w-28 h-28 rounded-md` +
                      (selectedImage === item.name
                        ? " border-4 border-white"
                        : "")
                    }
                  />
                  <Text className="text-white text-lg">{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </FormGroup>

          <FormGroup lable="Color">
            <FlatList
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
                    className={
                      `w-16 h-16 rounded-md` +
                      (selectedcolor === item.hex
                        ? " border-4 border-white"
                        : "")
                    }
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
            onPress={handleSubmit}
          >
            <Text
              className="text-black text-xl"
              style={{
                fontFamily: "RalewaySemiBold",
              }}
            >
              Generate
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

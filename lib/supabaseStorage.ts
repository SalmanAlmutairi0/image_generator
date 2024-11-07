import { supabase } from "@/lib/supabase";

export const uploadImageToStorage = async (
  imageURL: string,
  user_id: string
) => {
  try {
    const imageResponse = await fetch(imageURL!);
    const imageArrayBuffer = await imageResponse.arrayBuffer();

    const imageBuffer = Buffer.from(imageArrayBuffer);

    console.log(imageBuffer);

    const fileName = `images/${Date.now()}.png`;
    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, imageBuffer, { contentType: "image/png" });

    if (error) {
      throw new Error("Error uploading image", error);
    }

    return data.path;
  } catch (error) {
    console.error(error);
  }
};

import { generateImage } from "@/lib/generateImage";
import { supabase } from "@/lib/supabase";
import { uploadImageToStorage } from "@/lib/supabaseStorage";

export async function POST(request: Request) {
  try {
    const { user_id, prompt, imageStyle, imageColor } = await request.json();

    if (!user_id) {
      return Response.json({ error: "You must be logged in" }, { status: 401 });
    }

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (!imageStyle) {
      return Response.json({ error: "Style is required" }, { status: 400 });
    }

    const imageURL = await generateImage(prompt, imageStyle, imageColor);
    if (!imageURL) {
      return Response.json(
        { error: "Something went wrong while generating image" },
        { status: 500 }
      );
    }

    const imagePath = await uploadImageToStorage(imageURL, user_id);

    const { data, error } = await supabase.from("images").insert({
      user_id: Number(user_id),
      prompt: prompt,
      style: imageStyle,
      image_url: imagePath,
      image_color: imageColor,
    }).select();

    if (error) {
      console.error("Error inserting image into database:", error);
      return Response.json(
        { error: "Error inserting image into database" },
        { status: 500 }
      );
    }

    return Response.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

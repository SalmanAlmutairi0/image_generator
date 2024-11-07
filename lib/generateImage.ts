import { promptBuilder } from "@/utils/prompt";
import OpenAI from "openai";

export const generateImage = async (
  basicPrompt: string,
  imageStyle: string,
  imageColor: string
) => {
  const openai = new OpenAI({
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY!,
  });

  const prompt = promptBuilder(basicPrompt, imageStyle, imageColor);

  try {
    const response = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "url",
      model: "dall-e-3",
    });

    const imageUrl = response.data[0].url;

    if (!imageUrl) {
      throw new Error("something went wrong while generating image");
    }

    return imageUrl;
  } catch (error) {
    console.error(error);
  }
};

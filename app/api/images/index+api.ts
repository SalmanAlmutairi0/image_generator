import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { data, error } = await supabase.from("images").select("*");

    if (error) {
      throw new Error(error.message);
    }

    const images = data.map((image) => ({
      image_id: image.id,
      user_id: image.user_id,
      image_url: supabase.storage.from("images").getPublicUrl(image.image_url),
    }));

    return Response.json({ images }, { status: 200 });
  } catch (e) {
    return Response.json(
      { error: `Something went wrong while fetching images ${e}` },
      { status: 500 }
    );
  }
}

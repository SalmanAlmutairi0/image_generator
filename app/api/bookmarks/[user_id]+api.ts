import { supabase } from "@/lib/supabase";

export type bookmarkedImage = {
    image_id: number;
    image_url: string;
}
export async function GET(request: Request, { user_id }: { user_id: string }) {
  if (!user_id)
    return Response.json({ error: "You must be logged in" }, { status: 401 });

  try {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("id,images(image_url)")
      .eq("user_id", user_id);

    if (error) {
      throw new Error(error.message);
    }

    if (data.length === 0) {
      return Response.json({ error: "No bookmarks found" }, { status: 404 });
    }

    const images: bookmarkedImage[] = data.map(
      (image) =>{
        return {
          image_id: image.id,
          image_url:
            supabase.storage.from("images").getPublicUrl(image.images.image_url)?.data
              ?.publicUrl ?? null,
        };
      }
        
    );
    

    return Response.json(images, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: `Something went wrong while fetching images ${error}` },
      { status: 500 }
    );
  }
}

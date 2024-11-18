import { supabase } from "@/lib/supabase";

const checkIfBookmarked = async (image_id: number, user_id: string) => {
  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("image_id", image_id)
    .eq("user_id", user_id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const deleteBookmark = async (image_id: number, user_id: string) => {
  const { data, error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("image_id", image_id)
    .eq("user_id", user_id)
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const insertBookmark = async (image_id: number, user_id: string) => {
  const { data: imageData, error: imageError } = await supabase
    .from("bookmarks")
    .insert({ image_id: image_id, user_id: user_id });

  if (imageError || !imageData) {
    throw new Error("Image does not exist.");
  }

  return imageData;
};

export async function POST(request: Request) {
  const { user_id, image_id }: { user_id: string; image_id: number } =
    await request.json();

    console.log(user_id, image_id);

  try {
    const existingBookmark = await checkIfBookmarked(image_id, user_id);

    let data = null;
    if (existingBookmark.length > 0) {
      data = await deleteBookmark(image_id, user_id);
    } else {
      data = await insertBookmark(image_id, user_id);
    }

    return Response.json({ data }, { status: 200 });
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: `Something went wrong ${e}` },
      { status: 500 }
    );
  }
}

import { supabase } from "@/utils/supaBaseClient";

export async function getTeacherById(id: string) {
  const { data, error } = await supabase
    .from("class_teachers")
    .select("*")
    .eq("class_id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  if (!data) {
    return null;
  }

  return data;
}

export async function getTeacherPersonalData(id: string) {
  const { data, error } = await supabase
    .from("users")
    .select("fullname, email, id, image")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  if (!data) {
    return null;
  }

  return data;
}

import { supabase } from "@/utils/supaBaseClient";

export async function getClassById(id: string) {
  const { data, error } = await supabase
    .from("classes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  if (data && data.length === 0) {
    return null;
  }

  return data;
}

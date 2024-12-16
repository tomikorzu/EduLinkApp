import { supabase } from "@/utils/supaBaseClient";

export async function getTasks(id: string) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("class_id", id);

  if (error) {
    console.error(error);
    return null;
  }

  if (data && data.length === 0) {
    return null;
  }

  return data;
}

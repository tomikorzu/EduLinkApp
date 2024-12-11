import { supabase } from "@/utils/supaBaseClient";

export async function createCourse(
  name: string,
  code: string,
  description: string,
  creator_id: number,
  visibility: string
) {
  const { data, error } = await supabase
    .from("courses")
    .insert([{ name, description, creator_id, code, visibility }]);

  if (error) {
    throw error;
  }
  return data;
}

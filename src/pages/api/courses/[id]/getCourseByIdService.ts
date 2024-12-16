import { supabase } from "@/utils/supaBaseClient";

export async function getClasses(id: string) {
  const { data, error } = await supabase
    .from("classes")
    .select("*")
    .eq("course_id", id);

  if (error) {
    console.error(error);
    return null;
  }

  if (data && data.length === 0) {
    return null;
  }

  return data;
}

export async function getCourseById(id: string) {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  console.log(data);

  if (error) {
    console.error(error);
    return null;
  }

  if (!data) {
    return null;
  }

  return data;
}

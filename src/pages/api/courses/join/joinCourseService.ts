import { supabase } from "@/utils/supaBaseClient";

export async function joinCourse(courseName: string, courseCode: string) {
  const { data, error } = await supabase
    .from("courses")
    .select("name, code")
    .eq("name", courseName)
    .single();
  if (error || !data) {
    return "Course not found";
  }

  if (courseCode === data.code) {
    return true;
  } else {
    return "Course code is incorrect";
  }
}

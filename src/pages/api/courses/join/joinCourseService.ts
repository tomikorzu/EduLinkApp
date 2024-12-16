import { supabase } from "@/utils/supaBaseClient";

export async function joinCourse(
  courseName: string,
  courseCode: string,
  user: object
) {
  const { data, error } = await supabase
    .from("courses")
    .select("name, code")
    .eq("name", courseName)
    .single();
  if (error || !data) {
    return "Course not found";
  }

  if (courseCode === data.code) {
    const isUserJoined = await joinUserToCourse(user);
    if (isUserJoined) {
      return true;
    }
  } else {
    return "Course code is incorrect";
  }
}

export async function joinUserToCourse(user: object) {
  const { data, error } = await supabase.from("users_courses").insert(user);
  if (error) {
    return error;
  }
  return data;
}

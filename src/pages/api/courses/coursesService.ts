import { supabase } from "@/utils/supaBaseClient/";

export async function getCourses(isTokenValid: boolean) {
  const { data, error } = await supabase.from("courses").select("*");
  if (error) {
    throw error;
  }

  if (!isTokenValid) {
    const courses = data.map((course) => {
      if (course.visibility !== "private") {
        return course;
      } else {
        return null;
      }
    });
    if (courses) {
      return courses.filter((course) => course !== null);
    } else {
      return false;
    }
  } else {
    return data;
  }
}

export async function createCourse(courseName: string, courseCode: string) {
  const { data, error } = await supabase
    .from("courses")
    .insert([{ courseName, courseCode }]);
  if (error) {
    throw error;
  }
  return data;
}

export async function joinCourse(courseName: string, courseCode: string) {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("courseCode", courseCode);
  if (error) {
    throw error;
  }
  return data;
}

export async function getCourse(courseId: string) {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", courseId);
  if (error) {
    throw error;
  }
  return data;
}

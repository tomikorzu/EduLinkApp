import { supabase } from "@/utils/supaBaseClient";

export async function createTask(
  id: string,
  title: string,
  description: string,
  dueDate: string,
  teacher_id: string
) {
  const date = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        class_id: id,
        teacher_id,
        name: title,
        description,
        due_date: dueDate,
        created_at: date,
      },
    ])
    .select("*");

  if (error) {
    console.error(error);
    return null;
  }
  return data;
}

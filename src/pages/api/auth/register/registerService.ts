import { supabase } from "@/utils/supaBaseClient";

export async function verifyIsEmailInUse(email: string) {
  const { data, error } = await supabase
    .from("users")
    .select("email")
    .eq("email", email);

  if (error) {
    console.error(error, "Error verifying email");
    throw new Error("Error verifying email");
  }
  if (data.length > 0) {
    return true;
  }
}

export async function registerUser(
  fullname: string,
  email: string,
  password: string
) {
  const { data, error } = await supabase
    .from("users")
    .insert([{ fullname, email, password }])
    .select("id, email, role, fullname");

  if (error) {
    console.error(error, "Error registering user");
    throw new Error("Error registering user");
  }

  return data;
}
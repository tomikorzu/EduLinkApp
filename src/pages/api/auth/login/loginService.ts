import { supabase } from "@/utils/supaBaseClient";
import bcrypt from "bcrypt";

export async function verifyEmailExist(email: string) {
  const { data, error } = await supabase
    .from("users")
    .select("email")
    .eq("email", email)
    .single();

  if (error) {
    console.log(error);
    throw new Error("The email does not exist");
  }
  if (data) {
    return true;
  } else {
    return false;
  }
}

export async function verifyPasswordOfEmail(password: string, email: string) {
  const { data, error } = await supabase
    .from("users")
    .select("password")
    .eq("email", email)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Email or password are incorrect");
  }

  const isPasswordMatch = await bcrypt.compare(password, data.password);

  if (!isPasswordMatch) {
    throw new Error("Email or password are incorrect");
  }

  return true;
}

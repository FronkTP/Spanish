import { supabase } from "../../db/supabaseServerClient.js";

function createHttpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

export async function getCurrentUser( userId ) {
  if (!userId) throw createHttpError(500, "Missing user id");

  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", userId)
    .limit(1)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw createHttpError(404, "User not found");
    }
    throw createHttpError(500, error.message);
  }

  return data;
}

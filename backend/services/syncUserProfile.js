import { supabase } from "../db/supabaseServerClient.js";

function createHttpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

export async function syncUserProfileForUser({
  userId,
  email = null,
  fullName = null,
  avatarUrl = null,
}) {
  if (!userId) throw createHttpError(500, "Missing user id");

  const { error } = await supabase.from("users").upsert(
    {
      id: userId,
      email,
      full_name: fullName,
      avatar_url: avatarUrl,
    },
    { onConflict: "id" },
  );

  if (error) throw error;

  return { message: "User profile synced" };
}

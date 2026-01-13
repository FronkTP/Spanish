import { supabase } from "../db/supabase.js";

function createHttpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

export async function updateWordStatusForUser({
  userId,
  wordId,
  status,
  lastSeen = new Date(),
}) {
  if (!userId) throw createHttpError(500, "Missing user id");

  const { data: wordDetail, error: wordDetailErr } = await supabase
    .from("words")
    .select("id")
    .eq("id", wordId);

  if (wordDetailErr) throw wordDetailErr;
  if (!wordDetail || wordDetail.length === 0) {
    throw createHttpError(404, "Word not found");
  }

  const { error: wordStatusErr } = await supabase.from("user_words").upsert({
    user_id: userId,
    word_id: wordId,
    status,
    last_seen: lastSeen.toISOString(),
  });

  if (wordStatusErr) throw wordStatusErr;

  return { message: "Word status updated" };
}

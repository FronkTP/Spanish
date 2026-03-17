import { supabase } from "../../db/supabase.js";

export async function recordPracticeAttempt(
  userId,
  wordId,
  practiceMode,
  outcome,
) {
  const { data: userWord, error: fetchErr } = await supabase
    .from("user_words")
    .select("status")
    .eq("user_id", userId)
    .eq("word_id", wordId)
    .single();

  if (fetchErr) throw fetchErr;

  let newStatus = userWord.status;

  if (outcome === "correct") {
    newStatus = "known";
  } else if (outcome === "incorrect" && userWord.status === "known") {
    newStatus = "learning";
  }

  const { error: updateErr } = await supabase
    .from("user_words")
    .update({
      status: newStatus,
      last_seen: new Date(),
    })
    .eq("user_id", userId)
    .eq("word_id", wordId);

  if (updateErr) throw updateErr;

  return { message: "Attempt logged" };
}

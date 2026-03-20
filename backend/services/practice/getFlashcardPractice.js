import { supabase } from "../../db/supabaseServerClient.js";

export async function getFlashcardPractice(userId) {
  const { data: flashcardWord, error: flashcardWordErr } = await supabase
    .from("user_words")
    .select(
      `
        status, 
        last_seen,
        words!inner (
          *
        )
    `,
    )
    .eq("user_id", userId)
    .order("last_seen", { ascending: true })
    .limit(1);

  if (flashcardWordErr) throw flashcardWordErr;

  if (flashcardWord.length === 0) {
    return {
      status: "empty",
      message: "Learn some words first.",
      practice: null,
    };
  }

  const returnObj = {
    status: "ok",
    practice: {
      wordMetadata: flashcardWord[0].words,
    },
  };

  return returnObj;
}

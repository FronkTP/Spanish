import { supabase } from "../db/supabaseServerClient.js";

export async function getProgressSummaryForUser(userId) {
  const { count: userKnownWordsCount, error: userKnownWordsCountErr } =
    await supabase
      .from("user_words")
      .select("status", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("status", "known");

  if (userKnownWordsCountErr) throw userKnownWordsCountErr;

  const j = {
    streak: null,
    wordKnown: userKnownWordsCount,
    xp: null,
    achievement: [
      {
        title: "Vocab King",
        iconTitle: "RectangleStackIcon",
      },
      {
        title: "7-Day Streak",
        iconTitle: "CalendarDateRangeIcon",
      },
    ],
  };
  return j;
}

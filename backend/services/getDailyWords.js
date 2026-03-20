import { supabase } from "../db/supabaseServerClient.js";

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function toIsoDateString(date) {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

export async function getDailyWordsForUser(userId, date = new Date()) {
  if (!userId) {
    throw new Error("Missing userId");
  }

  const todayDate = toIsoDateString(date);

  const { data: userDailyWordIds, error: userDailyWordIdsErr } = await supabase
    .from("daily_words")
    .select("word_ids")
    .eq("user_id", userId)
    .eq("date", todayDate);

  if (userDailyWordIdsErr) throw userDailyWordIdsErr;

  const existingDailyIds = userDailyWordIds?.[0]?.word_ids ?? null;

  const { data: allWords, error: allWordsErr } = await supabase
    .from("words")
    .select(
      `
        *,
        user_words (
            status
        )
    `
    )
    .eq("user_words.user_id", userId)
    .neq("english", "{}");

  if (allWordsErr) throw allWordsErr;

  const normalizedWords = (allWords ?? []).map((word) => ({
    ...word,
    status: word.user_words?.[0]?.status ?? "new",
  }));

  const allIds = normalizedWords.map((w) => w.id);
  const knownIds = normalizedWords
    .filter((w) => w.status === "known")
    .map((w) => w.id);
  const notKnownIds = normalizedWords
    .filter((w) => w.status !== "known")
    .map((w) => w.id);

  let selectedIds = [];

  if (!existingDailyIds) {
    const selectedKnown = shuffleArray([...knownIds]).slice(0, 1);
    const selectedUnknown = shuffleArray(
      notKnownIds.filter((id) => !selectedKnown.includes(id))
    ).slice(0, 4);

    selectedIds = [...selectedKnown, ...selectedUnknown];
  } else {
    selectedIds = [...existingDailyIds];
  }

  if (selectedIds.length < 5) {
    const remaining = 5 - selectedIds.length;
    const fillerIds = shuffleArray(
      allIds.filter((id) => !selectedIds.includes(id))
    ).slice(0, remaining);
    selectedIds = [...selectedIds, ...fillerIds];
  }

  const byId = new Map(normalizedWords.map((w) => [w.id, w]));
  let dailyWords = selectedIds.map((id) => byId.get(id)).filter(Boolean);

  if (!dailyWords.length) {
    return [];
  }

  if (!existingDailyIds) {
    const { error: userDailyWordsErr } = await supabase
      .from("daily_words")
      .insert({
        user_id: userId,
        word_ids: selectedIds,
        date: todayDate,
        created_at: new Date().toISOString(),
      });

    if (userDailyWordsErr) throw userDailyWordsErr;
  }

  dailyWords = shuffleArray(dailyWords);
  return dailyWords;
}

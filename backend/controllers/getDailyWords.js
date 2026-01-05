import { supabase } from "../db/supabase.js";

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function getDailyWords(req, res) {
  try {
    const userId = process.env.TEST_USER;
    const todayDate = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
    let dailyWords = [];
    let selectedIds = [];

    const { data: userDailyWordIds, error: userDailyWordIdsErr } =
      await supabase
        .from("daily_words")
        .select("word_ids")
        .eq("user_id", userId)
        .eq("date", todayDate);
    const existingDailyIds = userDailyWordIds?.[0]?.word_ids ?? null;

    if (userDailyWordIdsErr) throw userDailyWordIdsErr;

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

    const normalizedWords = allWords.map((w) => ({
      ...w,
      status: w.user_words?.[0]?.status ?? "new",
    }));

    const allIds = normalizedWords.map((u) => u.id);
    const knownIds = normalizedWords
      .filter((u) => u.status === "known")
      .map((u) => u.id);
    const notKnownIds = normalizedWords
      .filter((u) => u.status !== "known")
      .map((u) => u.id);

    // check if today word ids already exists
    if (!existingDailyIds) {
      const selectedKnown = shuffleArray(knownIds).slice(0, 1);
      const selectedUnknown = shuffleArray(
        notKnownIds.filter((id) => !selectedKnown.includes(id))
      ).slice(0, 4);

      selectedIds = [...selectedKnown, ...selectedUnknown];
    } else {
      selectedIds = existingDailyIds;
    }

    if (selectedIds.length < 5) {
      const remaining = 5 - selectedIds.length;

      const fillerIds = shuffleArray(
        allIds.filter((id) => !selectedIds.includes(id))
      ).slice(0, remaining);

      selectedIds = [...selectedIds, ...fillerIds];
    }

    dailyWords = selectedIds
      .map((id) => normalizedWords.find((w) => w.id === id))
      .filter(Boolean);

    if (!dailyWords.length) {
      return res.status(404).json({ error: "No words available" });
    }

    if (!existingDailyIds) {
      const { data: userDailyWords, error: userDailyWordsErr } = await supabase
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

    res.json(dailyWords);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch", details: err.message });
  }
}

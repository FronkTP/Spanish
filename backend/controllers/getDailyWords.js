import { supabase } from "../db/supabase.js";

function pickRandom(arr, count) {
  return arr
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function getDailyWords(req, res) {
  try {
    const { data: userWords, error: userWordsErr } = await supabase
      .from("user_words")
      .select("word_id, status")
      .eq("user_id", process.env.TEST_USER);

    if (userWordsErr) throw userWordsErr;

    const knownIds = userWords
      .filter((u) => u.status === "known")
      .map((u) => u.word_id);
    const notKnownIds = userWords
      .filter((u) => u.status !== "known")
      .map((u) => u.word_id);

    const selectedKnown = pickRandom(knownIds, 1);
    const selectedUnknown = pickRandom(
      notKnownIds.filter((id) => !selectedKnown.includes(id)),
      4
    );

    let selectedIds = [...selectedKnown, ...selectedUnknown];
    const statusById = new Map(
      userWords.map((u) => [u.word_id, u.status || null])
    );

    let dailyWords = [];

    if (selectedIds.length) {
      const { data: selectedWords, error: selectedErr } = await supabase
        .from("words")
        .select("*")
        .neq("english", "[]")
        .in("id", selectedIds);

      if (selectedErr) throw selectedErr;

      dailyWords = selectedIds
        .map((id) => selectedWords.find((w) => w.id === id))
        .filter(Boolean)
        .map((w) => ({ ...w, status: statusById.get(w.id) || null }));
    }

    if (dailyWords.length < 5) {
      const remaining = 5 - dailyWords.length;
      const excluded = selectedIds;

      let fillerQuery = supabase
        .from("words")
        .select("*")
        .limit(100)
        .neq("english", "[]");
      if (excluded.length) {
        fillerQuery = fillerQuery.not("id", "in", `(${excluded.join(",")})`);
      }

      const { data: fillerCandidates, error: fillerErr } = await fillerQuery;
      if (fillerErr) throw fillerErr;

      const filler = pickRandom(fillerCandidates || [], remaining).map((w) => ({
        ...w,
        status: statusById.get(w.id) || null,
      }));

      dailyWords = [...dailyWords, ...filler];
      selectedIds = [...selectedIds, ...filler.map((w) => w.id)];
    }

    if (!dailyWords.length) {
      return res.status(404).json({ error: "No words available" });
    }

    dailyWords = shuffleArray(dailyWords);

    res.json(dailyWords);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch", details: err.message });
  }
}

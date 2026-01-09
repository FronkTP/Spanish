import { supabase } from "../db/supabase.js";

export async function updateWordStatus(req, res) {
  try {
    const wordId = Number(req.params.word_id);
    if (isNaN(wordId) || wordId <= 0) {
      res.status(400).json({ error: "Invalid word id" });
      return;
    }

    const status = req.body.status;
    if (!["known", "learning", "new"].includes(status)) {
      res.status(400).json({ error: "Invalid status value" });
      return;
    }

    const { data: wordDetail, error: wordDetailErr } = await supabase
      .from("words")
      .select("id")
      .eq("id", wordId);
    if (wordDetailErr) throw wordDetailErr;
    if (wordDetail.length == 0) {
      res.status(404).json({ error: "Word not found" });
      return;
    }

    const { data: wordStatus, error: wordStatusErr } = await supabase
      .from("user_words")
      .upsert({
        user_id: process.env.TEST_USER,
        word_id: wordId,
        status,
        last_seen: new Date().toISOString(),
      });
    if (wordStatusErr) throw wordStatusErr;

    res.json({ message: "Word status updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch", details: err.message });
  }
}

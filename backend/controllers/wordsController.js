import { getDailyWordsForUser } from "../services/getDailyWords.js";

export async function wordsController(req, res) {
  try {
    const userId = process.env.TEST_USER;
    const dailyWords = await getDailyWordsForUser(userId);

    if (!dailyWords.length) {
      res.status(404).json({ error: "No words available" });
      return;
    }

    res.json(dailyWords);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch", details: err.message });
  }
}

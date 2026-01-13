import { updateWordStatusForUser } from "../services/updateWordStatus.js";

export async function statusController(req, res) {
  try {
    const userId = process.env.TEST_USER;

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

    const result = await updateWordStatusForUser({
      userId,
      wordId,
      status,
      lastSeen: new Date(),
    });

    res.json(result);
  } catch (err) {
    const status = typeof err?.status === "number" ? err.status : 500;
    res.status(status).json({ error: "Failed to fetch", details: err.message });
  }
}

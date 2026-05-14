import { getProgressSummaryForUser } from "../services/getProgressSummary.js";

export async function progressController(req, res) {
  try {
    const userId = req.userId;

    const progressSummary = await getProgressSummaryForUser(userId);

    res.json(progressSummary);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch", details: error.message });
  }
}

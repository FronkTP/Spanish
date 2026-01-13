import { getProgressSummaryForUser } from "../services/getProgressSummary.js";

export async function progressController(req, res) {
  try {
    const userId = process.env.TEST_USER;

    const progressSummary = await getProgressSummaryForUser(userId);

    res.json(progressSummary);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch", details: error.message });
  }
}

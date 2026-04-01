import { getTextAnalyzer } from "../services/getTextAnalyzer.js";

export async function analyzeTextController(req, res) {
  try {
    const { text } = req.body;

    const textAnalyzer = await getTextAnalyzer(text);

    res.json(textAnalyzer);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch", details: error.message });
  }
}

import { getListeningPractice as getListeningPracticeService } from "../services/practice/getListeningPractice.js";
import { recordPracticeAttempt as recordPracticeAttemptService } from "../services/practice/recordPracticeAttempt.js";

export async function getListeningPractice(req, res) {
  try {
    const userId = process.env.TEST_USER;
    const data = await getListeningPracticeService(userId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function recordPracticeAttempt(req, res) {
  try {
    const userId = process.env.TEST_USER;
    const { wordId, practiceMode, outcome } = req.body;
    const data = await recordPracticeAttemptService(
      userId,
      wordId,
      practiceMode,
      outcome,
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

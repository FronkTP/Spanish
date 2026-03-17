import { getListeningPractice as getListeningPracticeService } from "../services/practice/getListeningPractice.js";
import { getFlashcardPractice as getFlashcardPracticeService } from "../services/practice/getFlashcardPractice.js";
import { getTypingPractice as getTypingPracticeService } from "../services/practice/getTypingPractice.js";
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

export async function getFlashcardPractice(req, res) {
  try {
    const userId = process.env.TEST_USER;
    const data = await getFlashcardPracticeService(userId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getTypingPractice(req, res) {
  try {
    const userId = process.env.TEST_USER;
    const data = await getTypingPracticeService(userId);
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

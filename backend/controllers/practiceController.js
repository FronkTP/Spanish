import { getListeningPractice as getListeningPracticeService } from "../services/practice/getListeningPractice.js";

export async function getListeningPractice(req, res) {
  try {
    const userId = process.env.TEST_USER;
    const data = await getListeningPracticeService(userId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

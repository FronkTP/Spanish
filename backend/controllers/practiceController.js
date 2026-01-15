import { getAudioPractice as getAudioPracticeService } from "../services/practice/getAudioPractice.js";

export async function getAudioPractice(req, res) {
  try {
    const userId = process.env.TEST_USER;
    const data = await getAudioPracticeService(userId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

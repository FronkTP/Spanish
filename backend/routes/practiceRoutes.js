import express from "express";
import {
  getListeningPractice,
  getFlashcardPractice,
  getTypingPractice,
  recordPracticeAttempt,
} from "../controllers/practiceController.js";

export const practiceRouter = express.Router();

practiceRouter.get("/listening", getListeningPractice);
practiceRouter.get("/flashcard", getFlashcardPractice);
practiceRouter.get("/typing", getTypingPractice);
practiceRouter.post("/attempt", recordPracticeAttempt);

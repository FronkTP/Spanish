import express from "express";
import {
  getListeningPractice,
  getFlashcardPractice,
  recordPracticeAttempt,
} from "../controllers/practiceController.js";

export const practiceRouter = express.Router();

practiceRouter.get("/listening", getListeningPractice);
practiceRouter.get("/flashcard", getFlashcardPractice);
practiceRouter.post("/attempt", recordPracticeAttempt);

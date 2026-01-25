import express from "express";
import {
  getListeningPractice,
  recordPracticeAttempt,
} from "../controllers/practiceController.js";

export const practiceRouter = express.Router();

practiceRouter.get("/listening", getListeningPractice);
practiceRouter.post("/attempt", recordPracticeAttempt);

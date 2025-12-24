import express from "express";
import { getDailyWords } from "../controllers/getDailyWords.js";

export const apiRouter = express.Router();

apiRouter.get("/words/daily", getDailyWords);
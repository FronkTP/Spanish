import express from "express";
import { getDailyWords } from "../controllers/getDailyWords.js";
import { updateWordStatus } from "../controllers/updateWordStatus.js";

export const apiRouter = express.Router();

apiRouter.get("/words/daily", getDailyWords);
apiRouter.post("/words/:word_id/status", updateWordStatus);

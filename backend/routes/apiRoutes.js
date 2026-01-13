import express from "express";
import { wordsController } from "../controllers/wordsController.js";
import { statusController } from "../controllers/statusController.js";
import { progressController } from "../controllers/progressController.js";

export const apiRouter = express.Router();

apiRouter.get("/words/daily", wordsController);
apiRouter.post("/words/:word_id/status", statusController);
apiRouter.get("/progress", progressController);

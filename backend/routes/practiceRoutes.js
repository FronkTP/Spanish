import express from "express";
import { getListeningPractice } from "../controllers/practiceController.js";

export const practiceRouter = express.Router();

practiceRouter.get("/listening", getListeningPractice);

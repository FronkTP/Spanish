import express from "express";
import { getAudioPractice } from "../controllers/practiceController.js";

export const practiceRouter = express.Router();

practiceRouter.get("/audio", getAudioPractice);

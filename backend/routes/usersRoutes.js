import express from "express";
import { getCurrentUserController, syncUserController} from "../controllers/usersController.js";

export const usersRouter = express.Router();

usersRouter.get("/me", getCurrentUserController);
usersRouter.post("/sync", syncUserController);

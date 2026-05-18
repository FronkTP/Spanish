import express from "express";
import { wordsController } from "../controllers/wordsController.js";
import { statusController } from "../controllers/statusController.js";
import { progressController } from "../controllers/progressController.js";
import { analyzeTextController } from "../controllers/analyzeTextController.js";
import { syncUserController } from "../controllers/userController.js";
import { extractUserId } from "../middleware/authMiddleware.js";
import { practiceRouter } from "./practiceRoutes.js";

export const apiRouter = express.Router();

apiRouter.get("/guest-user", (req, res) => {
  res.json({
    user: {
      id: process.env.TEST_USER_ID_1,
      email: process.env.TEST_USER_EMAIL,
      user_metadata: {
        full_name: process.env.TEST_USER_FULL_NAME,
        avatar_url: process.env.TEST_USER_AVATAR_URL,
      },
    },
  });
});

apiRouter.use(extractUserId);

apiRouter.get("/words/daily", wordsController);
apiRouter.post("/words/:word_id/status", statusController);
apiRouter.get("/progress", progressController);
apiRouter.post("/analyze", analyzeTextController);
apiRouter.post("/users/sync", syncUserController);

apiRouter.use("/practice", practiceRouter);

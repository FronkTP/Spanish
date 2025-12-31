import "dotenv/config";
import express from "express";
import cors from "cors";
import { apiRouter } from "./routes/apiRoutes.js";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found. Please check the API documentation.",
  });
});

app.listen(PORT, () => console.log(`server connected on port ${PORT}`));

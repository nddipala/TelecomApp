import express from "express";
import cors from "cors";
import morgan from "morgan";

import deviceRoutes from "./routes/deviceRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 4002;
const SERVICE_NAME = "device-service";

// --- Core middleware ---------------------------------------------------------
app.use(express.json());
const corsOrigin = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : "*";
app.use(cors({ origin: corsOrigin }));
app.use(morgan("[device-service] :method :url :status - :response-time ms"));

// --- Health check ------------------------------------------------------------
app.get("/health", (req, res) => {
  res.json({ service: SERVICE_NAME, status: "ok", uptime: process.uptime() });
});

// --- Domain routes -----------------------------------------------------------
app.use("/", deviceRoutes);

// --- Error handling ----------------------------------------------------------
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[${SERVICE_NAME}] listening on port ${PORT}`);
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/authRoutes.js";
import incidentRoutes from "./routes/incidentRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/incidents", incidentRoutes);

app.get("/", (req, res) => res.json({ message: "Incident Tracker API" }));

export const prisma = new PrismaClient();
export default app;

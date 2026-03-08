import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authroutes.js";
import taskRoutes from "./routes/taskroutes.js";
import authMiddleware from "./middlewares/auth.js";
import isAdmin from "./middlewares/isAdmin.js";
import errorHandler from "./middlewares/errorHandler.js";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", authMiddleware, taskRoutes);
app.use("/api/v1/admin", authMiddleware, isAdmin, adminRoutes);

app.use(errorHandler);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log("Server Started !!"));
    })
    .catch((err) => console.error("MongoDB error: ", err));
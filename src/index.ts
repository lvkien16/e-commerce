import express from "express";
import connectDatabase from "./configs/db";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./utils/error";
import routes from "./routes/index";

// Connect to database
connectDatabase();

// Initialize express
const app = express();

// Use cookie parser
app.use(cookieParser());

// Middleware
app.use(express.json());

// Routes
app.use("/api", routes);

// Error handling middleware
app.use(errorMiddleware);

// Listen to port
app.listen(3001, () => {
  console.log("Server is running on port 5000");
});

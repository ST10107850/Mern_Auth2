import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/userRoutes.js";
import productRoute from "./routes/productRoute.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use('/api/products', productRoute);

if (process.env.NODE_ENV === "production") {
  const _dirname = path.resolve();
  app.use(express.static(path.join(_dirname, "frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Server is ready"));
}

// Error-handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  connectDB();
  console.log(`Server started on port ${port}`);
});

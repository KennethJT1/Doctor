import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectedDB } from "./config";

dotenv.config();

import userRouter from "./routes/user";

const app: Express = express();

connectedDB();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

app.use("/", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Doctor + Booking server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

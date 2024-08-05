import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectedDB } from "./config";
import cors from "cors";

dotenv.config();

import userRouter from "./routes/user";
import doctorRouter from "./routes/doctor";
import adminRouter from "./routes/admin";

const app: Express = express();

connectedDB();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/", userRouter);
app.use("/doctor", doctorRouter);
app.use("/admin", adminRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Doctor + Booking server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

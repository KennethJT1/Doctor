import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectedDB } from "./config";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();

import userRouter from "./routes/user";
import doctorRouter from "./routes/doctor";
import adminRouter from "./routes/admin";

const app: Express = express();

connectedDB();

const port = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Doctor API with Swagger",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Doctor-Booking",
        url: "http://localhost:4811",
        email: "gmail.com",
      },
    },
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    servers: [
      {
        url: "http://localhost:4811",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

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

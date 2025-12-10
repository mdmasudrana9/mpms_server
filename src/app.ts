import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import config from "./app/config";
import router from "./app/routes";
import cookieParser from "cookie-parser";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app = express();
app.use(express.json());
//parser
app.use(cookieParser());
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(cors({ origin: "https://mpms-khaki.vercel.app", credentials: true }));
app.use(cors());

// middlewares
app.use(helmet());

if (config.nodeEnv === "development") app.use(morgan("dev"));

// base route
app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Middleware usage
app.use(globalErrorHandler as any);
app.use(notFound as any);

// unknown route handling
app.all("*", (req, res) => {
  res.status(400).json({
    success: false,
    message: `Route ${req.originalUrl} cannot found`,
    error: {
      code: 404,
      description: "Please provide an valid Route",
    },
  });
});

export default app;

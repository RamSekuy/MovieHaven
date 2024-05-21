/** @format */
import { PORT } from "./config/config";
import express, { Application, NextFunction, Request, Response } from "express";
import ticketRouter from "./routers/ticket.router";
import userRouter from "./routers/user.router";
import staffRouter from "./routers/staff.router";
import cors from "cors";
import movieRouter from "./routers/movie.router";

export class App {
  private app: Application;
  constructor() {
    this.app = express();

    this.configure();
    this.routes();
    this.errorHandler();
  }

  private routes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("welcome to api with prisma API");
    });

    this.app.use("/ticket", ticketRouter.getRouter());
    this.app.use("/user", userRouter.getRouter());
    this.app.use("/staff", staffRouter.getRouter());
    this.app.use("/movie", movieRouter.getRouter());
  }
  private errorHandler() {
    this.app.use(
      (error: unknown, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof Error)
          res.status(500).send({
            message: error.message,
          });
      }
    );
  }
  private configure() {
    this.app.use(express.json());
    this.app.use(express.urlencoded());
    this.app.use(cors());
  }
  public start() {
    this.app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  }
}
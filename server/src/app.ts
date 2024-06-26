/** @format */
import { PORT, corsOption } from "./config/config";
import express, { Application, NextFunction, Request, Response } from "express";
import ticketRouter from "./routers/ticket.router";
import userRouter from "./routers/user.router";
import staffRouter from "./routers/staff.router";
import cors from "cors";
import movieRouter from "./routers/movie.router";
import transactionRouter from "./routers/transaction.router";
import branchRouter from "./routers/branch.router";
import ratingRouter from "./routers/rating.router";

export class App {
  public app: Application;
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
    this.app.use("/transaction", transactionRouter.getRouter());
    this.app.use("/branch", branchRouter.getRouter());
    this.app.use("/rating", ratingRouter.getRouter());
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
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors(corsOption));
  }
  public start() {
    this.app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  }
}

import { App } from "./app";

const app = new App();
app.start();

module.exports = app.app;

// import express, { Request, Response } from "express";
// const app = express();

// app.get("/", (req: Request, res: Response) => res.send("Express on yo"));

// app.listen(8000, () => console.log("Server ready on port 3000."));

// module.exports = app;

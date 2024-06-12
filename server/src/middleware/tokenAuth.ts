import { NextFunction, Request, Response } from "express";
import { SECRET_KEY } from "../config/config";
import { verify } from "jsonwebtoken";

export function tokenAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  verify(
    token.split(" ")[1],
    SECRET_KEY,
    (err: Error | null, decodedToken: any) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Invalid token" });
      }
      console.log(decodedToken, "test");

      if (decodedToken.type == "user") req.user = decodedToken;
      if (decodedToken.type == "admin") req.staff = decodedToken;
      next();
    }
  );
}

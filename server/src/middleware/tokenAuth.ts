import { NextFunction, Request, Response } from "express";
import { SECRET_KEY } from "../config/config";
import { verify } from "jsonwebtoken";

export function tokenAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  verify(
    token.split(" ")[1],
    SECRET_KEY,
    (err: Error | null, decodedToken: any) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }

      if (typeof decodedToken.points) req.user = decodedToken;
      if (typeof decodedToken.isActive) req.staff = decodedToken;
      next();
    }
  );
}

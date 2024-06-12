import { Response } from "express";

export function accessCheck(
  res: Response,
  reqUserId: number,
  dataUserId: number
) {
  if (reqUserId !== dataUserId) {
    res.status(401).send("User Doesn't have access");
    return false;
  } else return true;
}

/** @format */

import { NextFunction, Request, Response } from "express";
import staffService from "../service/staff.service";

export class StaffController {
  async addStaff(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await staffService.addStaff(req);
      res.status(201).send({
        message: "success add Staff",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  async staffLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await staffService.staffLogin(req);
      res
        .cookie("rauth", data.rauth, { maxAge: 3600 * 1000 })
        .cookie("aauth", data.aauth, { maxAge: 60 * 20 * 1000 })
        .send({
          message: "success login Staff",
          data: data.staffData,
        });
    } catch (error) {
      next(error);
    }
  }
}

export default new StaffController();

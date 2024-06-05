import { NextFunction, Request, Response } from "express";
import BranchService from "../service/branch.service";

export class BranchController {
  async getAllBranch(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await BranchService.getAllBranch(req);
      res.send({
        message: "fetch Branch",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getBranchById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await BranchService.getBranchById(req);
      res.send({
        message: "fetch Branch",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async addBranch(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await BranchService.addBranch(req);
      res.send({
        message: "add Branch success",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteBranch(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await BranchService.deleteBranch(req);
      res.send({
        message: "update Branch success",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async addStudio(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await BranchService.addStudio(req);
      res.send({
        message: "add Studio success",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteStudio(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await BranchService.deleteStudio(req);
      res.send({
        message: "update Studio success",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new BranchController();

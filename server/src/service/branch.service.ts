/** @format */
import { Request } from "express";
import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";

export class BranchService {
  async getAll(req: Request) {
    return await prisma.branch.findMany();
  }

  async addBranch(req: Request) {
    const { branchPassword, location } = req.body;
    const data: Prisma.BranchCreateInput = {
      location,
      password: branchPassword,
    };
    return await prisma.branch.create({ data });
  }
}

export default new BranchService();

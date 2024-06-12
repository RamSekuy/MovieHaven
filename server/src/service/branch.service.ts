/** @format */
import { Request } from "express";
import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";
import { generateSeats } from "../utils/generateSeats";

export class BranchService {
  async getAllBranch(req: Request) {
    return await prisma.branch.findMany();
  }

  async getBranchById(req: Request) {
    const { branchId } = req.params;

    return await prisma.branch.findUnique({
      include: { studios: true },
      where: { id: Number(branchId) },
    });
  }

  async addBranch(req: Request) {
    const { branchPassword, location } = req.body;
    const data: Prisma.BranchCreateInput = {
      location,
      password: branchPassword,
    };
    return await prisma.branch.create({ data });
  }
  async deleteBranch(req: Request) {
    const { idBranch } = req.params;
    console.log(req.params);

    await prisma.branch.delete({ where: { id: Number(idBranch) } });
  }

  async addStudio(req: Request) {
    const { studioName, branchId } = req.body;

    const data: Prisma.StudioCreateInput = {
      studioName,
      branch: { connect: { id: Number(branchId) } },
      seats: { createMany: { data: generateSeats() } },
    };
    return await prisma.studio.create({ data });
  }

  async deleteStudio(req: Request) {
    const { idStudio } = req.params;
    return await prisma.studio.delete({ where: { id: Number(idStudio) } });
  }
}

export default new BranchService();

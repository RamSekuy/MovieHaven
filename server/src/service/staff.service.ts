/** @format */
import { Request } from "express";
import { prisma } from "../lib/prisma";
import { formatRequestBody } from "../utils/formatRequestBody";
import { compare } from "bcrypt";
import { Prisma } from "@prisma/client";

export class StaffSevice {
  async addStaff(req: Request) {
    const { name, email, address, password } = await formatRequestBody(
      req,
      true
    );
    const data: Prisma.StaffCreateInput = { name, email, address, password };
    await prisma.staff.create({ data });
  }

  async getAllStaff() {}

  async staffLogin(req: Request) {
    const body = await formatRequestBody(req);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const endOfDay = new Date(currentDate);
    endOfDay.setHours(23, 59, 59, 999);
    try {
      const data = await prisma.staff.findUnique({
        where: {
          email: body.email,
          staffSchedules: {
            some: {
              date: {
                gte: currentDate,
                lte: endOfDay,
              },
              branch: { password: { equals: body.branchPassword } },
            },
          },
        },
        include: {
          staffSchedules: {
            include: { branch: true },
          },
        },
      });

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new StaffSevice();

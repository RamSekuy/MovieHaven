/** @format */
import { Request } from "express";
import { prisma } from "../lib/prisma";
import { formatRequestBody } from "../utils/formatRequestBody";
import { compare } from "bcrypt";

export class StaffSevice {
  async addStaff(req: Request) {
    const data = await formatRequestBody(req, true);
    await prisma.staff.create({ data });
  }

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

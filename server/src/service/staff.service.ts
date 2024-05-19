/** @format */
import { Request } from "express";
import { prisma } from "../lib/prisma";
import { trimRequestBody } from "../utils/trimRequestBody";

export class StaffSevice {
  async addStaff(req: Request) {
    const data = trimRequestBody(req);
    await prisma.staff.create({ data });
  }

  async staffLogin(req: Request) {
    const body = trimRequestBody(req);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const endOfDay = new Date(currentDate);
    endOfDay.setHours(23, 59, 59, 999);

    try {
      const data = await prisma.staff.findMany({
        where: {
          email: { equals: String(body.email) },
          staffSchedules: {
            some: {
              date: {
                gte: currentDate,
                lte: endOfDay,
              },
              branch: { password: { equals: body.password } },
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

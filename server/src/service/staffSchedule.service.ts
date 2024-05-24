import { Prisma, Shift } from "@prisma/client";
import { Request } from "express";
import { prisma } from "../lib/prisma";

export class StaffSevice {
  async getSchedule(req: Request) {
    const { date } = req.body;
    if (date) {
      const searchDate = new Date(date);
      if (!searchDate) throw new Error("invalid date");

      return await prisma.staffSchedule.findMany({
        where: { date: date },
        include: { branch: true, staff: true },
      });
    }
    return await prisma.staffSchedule.findMany({
      include: { branch: true, staff: true },
    });
  }

  async addStaffSchedule(req: Request) {
    const { shift, date, branchId, staffId } = req.body;
    if (!Object.values(Shift).includes(shift as Shift))
      throw new Error("please input valid shift");

    const data: Prisma.StaffScheduleCreateInput = {
      date: new Date(date),
      shift,
      branch: { connect: { id: branchId } },
      staff: { connect: { id: staffId } },
    };
    await prisma.staffSchedule.create({ data });
  }

  async editSchedule(req: Request) {
    const id = Number(req.params.id);
    const data: Prisma.StaffScheduleUpdateInput = req.body;
    return await prisma.staffSchedule.update({ where: { id }, data });
  }

  async deleteSchedule(req: Request) {
    const id = Number(req.params.id);
    return await prisma.staffSchedule.delete({ where: { id } });
  }
}

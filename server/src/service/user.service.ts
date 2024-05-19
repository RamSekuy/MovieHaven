/** @format */
import { Request } from "express";
import { prisma } from "../lib/prisma";
import { trimRequestBody } from "../utils/trimRequestBody";
import { generateReferal } from "../utils/generateReferal";

export class UserService {
  async register(req: Request) {
    const data = trimRequestBody(req);
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 3);

    let result;
    try {
      await prisma.$transaction(async (prisma) => {
        const res1 = await prisma.user.create({ data });
        const res2 = await prisma.user.update({
          where: { id: res1.id },
          data: { referalCode: generateReferal(res1.id) },
          select: {
            email: true,
            referalCode: true,
            username: true,
            points: true,
            pointExpire: true,
          },
        });

        if (res1.referalTo) {
          const res3 = await prisma.user.findFirst({
            where: { referalCode: { equals: res1.referalTo } },
          });

          if (res3) {
            // Berikan poin kepada pengguna yang merujuk
            await prisma.user.update({
              where: { id: res3.id },
              data: {
                points: {
                  increment: 5000,
                },
                pointExpire: currentDate,
              },
            });
          }
          result = res2;
        }
      });
    } catch (error) {
      throw error;
    }
    return result;
  }

  async login(req: Request) {
    const body = trimRequestBody(req);
    const data = await prisma.user.findMany({
      select: {
        username: true,
        email: true,
        points: true,
        pointExpire: true,
        referalCode: true,
      },
      where: {
        email: { equals: String(body.email) },
        password: { equals: String(body.password) },
      },
    });
    return data;
  }

  async referralUser(req: Request) {
    const { referalCode } = req.params;
    return await prisma.user.findMany({ where: { referalTo: referalCode } });
  }
}

export default new UserService();

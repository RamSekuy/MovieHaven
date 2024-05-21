/** @format */
import { Request } from "express";
import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";
import { formatRequestBody } from "../utils/formatRequestBody";
import { generateReferal } from "../utils/generateReferal";
import { compare } from "bcrypt";

export class UserService {
  async register(req: Request) {
    const data = await formatRequestBody(req, true);
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 3);

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
        }
        return res2;
      });
    } catch (error) {
      throw error;
    }
  }

  async login(req: Request) {
    const body = await formatRequestBody(req);
    const data = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (data == null) throw new Error("Invalid email");

    if (!(await compare(body.password, data.password)))
      throw new Error("Invalid passwod");
    const result: { password?: string } = { ...data };
    delete result.password;
    return result;
  }

  async referralUser(req: Request) {
    const { referalCode } = req.params;
    return await prisma.user.findMany({ where: { referalTo: referalCode } });
  }
}

export default new UserService();
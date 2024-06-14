/** @format */
import { Request } from "express";
import { prisma } from "../lib/prisma";
import { formatRequestBody } from "../utils/formatRequestBody";
import { generateReferal } from "../utils/generateReferal";
import { compare } from "bcrypt";
import { generateToken } from "../lib/jwt";
import { Prisma, Staff, User } from "@prisma/client";
import { transporter } from "../lib/nodemailer";
import { FORGOT_URL, VERIFY_URL } from "../config/config";

export class UserService {
  async register(req: Request) {
    const { username, email, password, referalTo } = await formatRequestBody(
      req,
      true
    );

    const data: Prisma.UserCreateManyInput = {
      username,
      email,
      password,
      referalTo,
    };
    let createdUser: { [x: string]: any } = {};
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
      createdUser = res1;
    });

    if (!createdUser?.id) {
      throw new Error("Fail create user");
    }
    const token = generateToken(
      { id: createdUser.id, referalTo: createdUser?.referalTo },
      { expiresIn: "1h" },
      "EMAIL_VERIFY_KEY"
    );
    const a = await transporter.sendMail({
      to: email, // list of receivers
      subject: "Register to Movie Haven", // Subject line
      text: "verify your account", // plain text body
      html: `<b>${VERIFY_URL + "/" + token}</b>`, // html body
    });
    return a;
  }

  async login(req: Request) {
    const body = await formatRequestBody(req);
    const data = await prisma.user.findFirst({
      where: {
        email: body.email,
        isVerify: true,
      },
    });
    if (data == null) throw new Error("Invalid email");
    if (!(await compare(body.password, data.password)))
      throw new Error("Invalid passwod");
    const result = { id: data.id, type: "user" };
    const userData = { ...data, password: undefined };
    const aauthToken = generateToken(userData, { expiresIn: "1h" });
    return {
      rauth: generateToken(result, { expiresIn: "1h" }),
      aauthToken,
      userData,
    };
  }

  async emailVerify(req: Request) {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 3);

    await prisma.$transaction(async (prisma) => {
      const res1 = await prisma.user.findUnique({
        where: { id: req.user.id, isVerify: false },
      });

      if (!res1) {
        throw new Error("already verified");
      }
      await prisma.user.update({
        where: { id: res1.id },
        data: { isVerify: true },
      });

      if (req.user.referalTo) {
        const referalUser = await prisma.user.findUnique({
          where: { referalCode: req.user.referalTo },
        });
        if (referalUser?.id) {
          await prisma.user.update({
            where: { id: referalUser.id },
            data: {
              points: { increment: 5000 },
              pointExpire: currentDate,
            },
          });
        }
      }
    });
  }

  async referralUser(req: Request) {
    const { referalCode } = req.params;
    return await prisma.user.findMany({ where: { referalTo: referalCode } });
  }

  async validate(req: Request) {
    let tokenData: { [any: string]: any } | undefined;
    if (req.user != undefined) {
      tokenData = (await prisma.user.findFirst({
        where: { id: Number(req.user.id) },
      })) as User;
      tokenData.type = "user";
    } else if (req.staff != undefined) {
      tokenData = (await prisma.staff.findFirst({
        where: { id: Number(req.staff.id) },
      })) as Staff;
      tokenData.type = "staff";
    }
    return tokenData == null
      ? null
      : generateToken(
          {
            ...tokenData,
            password: undefined,
          },
          { expiresIn: "1h" }
        );
  }
  async forgot(req: Request) {
    const { email, password } = await formatRequestBody(req, true);
    const data = await prisma.user.findUnique({ where: { email } });
    if (!data) {
      throw new Error("invalid email");
    }
    const token = generateToken(
      { email: data.email, password },
      { expiresIn: "1h" },
      "FORGET_PASSWORD"
    );
    const a = await transporter.sendMail({
      to: email, // list of receivers
      subject: "Password Recovery Movie Haven", // Subject line
      text: "recover your password", // plain text body
      html: `<b>${FORGOT_URL + "/" + token}</b>`, // html body
    });
    return a;
  }
  async recoveryPassword(req: Request) {
    await prisma.user.update({
      where: { email: req.user.email },
      data: { password: req.user.password },
    });
  }
}

export default new UserService();

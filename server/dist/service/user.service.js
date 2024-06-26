"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_1 = require("../lib/prisma");
const formatRequestBody_1 = require("../utils/formatRequestBody");
const generateReferal_1 = require("../utils/generateReferal");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("../lib/jwt");
const nodemailer_1 = require("../lib/nodemailer");
const config_1 = require("../config/config");
class UserService {
    register(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, referalTo } = yield (0, formatRequestBody_1.formatRequestBody)(req, true);
            const data = {
                username,
                email,
                password,
                referalTo,
            };
            let createdUser = {};
            yield prisma_1.prisma.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const res1 = yield prisma.user.create({ data });
                const res2 = yield prisma.user.update({
                    where: { id: res1.id },
                    data: { referalCode: (0, generateReferal_1.generateReferal)(res1.id) },
                    select: {
                        email: true,
                        referalCode: true,
                        username: true,
                        points: true,
                        pointExpire: true,
                    },
                });
                createdUser = res1;
            }));
            if (!(createdUser === null || createdUser === void 0 ? void 0 : createdUser.id)) {
                throw new Error("Fail create user");
            }
            const token = (0, jwt_1.generateToken)({ id: createdUser.id, referalTo: createdUser === null || createdUser === void 0 ? void 0 : createdUser.referalTo }, { expiresIn: "1h" }, "EMAIL_VERIFY_KEY");
            const a = yield nodemailer_1.transporter.sendMail({
                to: email, // list of receivers
                subject: "Register to Movie Haven", // Subject line
                text: "verify your account", // plain text body
                html: `<b>${config_1.VERIFY_URL + "/" + token}</b>`, // html body
            });
            return a;
        });
    }
    login(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield (0, formatRequestBody_1.formatRequestBody)(req);
            const data = yield prisma_1.prisma.user.findFirst({
                where: {
                    email: body.email,
                    isVerify: true,
                },
            });
            if (data == null)
                throw new Error("Invalid email");
            if (!(yield (0, bcrypt_1.compare)(body.password, data.password)))
                throw new Error("Invalid passwod");
            const result = { id: data.id, type: "user" };
            const userData = Object.assign(Object.assign({}, data), { password: undefined });
            const aauthToken = (0, jwt_1.generateToken)(userData, { expiresIn: "1h" });
            return {
                rauth: (0, jwt_1.generateToken)(result, { expiresIn: "1h" }),
                aauthToken,
                userData,
            };
        });
    }
    emailVerify(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentDate = new Date();
            currentDate.setMonth(currentDate.getMonth() + 3);
            yield prisma_1.prisma.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const res1 = yield prisma.user.findUnique({
                    where: { id: req.user.id, isVerify: false },
                });
                if (!res1) {
                    throw new Error("already verified");
                }
                yield prisma.user.update({
                    where: { id: res1.id },
                    data: { isVerify: true },
                });
                if (req.user.referalTo) {
                    const referalUser = yield prisma.user.findUnique({
                        where: { referalCode: req.user.referalTo },
                    });
                    if (referalUser === null || referalUser === void 0 ? void 0 : referalUser.id) {
                        yield prisma.user.update({
                            where: { id: referalUser.id },
                            data: {
                                points: { increment: 5000 },
                                pointExpire: currentDate,
                            },
                        });
                    }
                }
            }));
        });
    }
    referralUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { referalCode } = req.params;
            return yield prisma_1.prisma.user.findMany({ where: { referalTo: referalCode } });
        });
    }
    validate(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let tokenData;
            if (req.user != undefined) {
                tokenData = (yield prisma_1.prisma.user.findFirst({
                    where: { id: Number(req.user.id) },
                }));
                tokenData.type = "user";
            }
            else if (req.staff != undefined) {
                tokenData = (yield prisma_1.prisma.staff.findFirst({
                    where: { id: Number(req.staff.id) },
                }));
                tokenData.type = "staff";
            }
            return tokenData == null
                ? null
                : (0, jwt_1.generateToken)(Object.assign(Object.assign({}, tokenData), { password: undefined }), { expiresIn: "1h" });
        });
    }
    forgot(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = yield (0, formatRequestBody_1.formatRequestBody)(req, true);
            const data = yield prisma_1.prisma.user.findUnique({ where: { email } });
            if (!data) {
                throw new Error("invalid email");
            }
            const token = (0, jwt_1.generateToken)({ email: data.email, password }, { expiresIn: "1h" }, "FORGET_PASSWORD");
            const a = yield nodemailer_1.transporter.sendMail({
                to: email, // list of receivers
                subject: "Password Recovery Movie Haven", // Subject line
                text: "recover your password", // plain text body
                html: `<b>${config_1.FORGOT_URL + "/" + token}</b>`, // html body
            });
            return a;
        });
    }
    recoveryPassword(req) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.prisma.user.update({
                where: { email: req.user.email },
                data: { password: req.user.password },
            });
        });
    }
}
exports.UserService = UserService;
exports.default = new UserService();

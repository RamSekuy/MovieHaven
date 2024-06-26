"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config/config");
exports.transporter = nodemailer_1.default.createTransport({
    service: "gmail", // Use `true` for port 465, `false` for all other ports
    auth: {
        user: config_1.EMAIL,
        pass: config_1.EMAILPASSWORD,
    },
});

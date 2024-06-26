"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOption = exports.FORGOT_URL = exports.VERIFY_URL = exports.FORGET_PASSWORD = exports.EMAIL_VERIFY_KEY = exports.EMAIL = exports.EMAILPASSWORD = exports.SECRET_KEY = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.PORT || 8000;
exports.SECRET_KEY = process.env.SECRET_KEY || "something";
exports.EMAILPASSWORD = process.env.EMAILPASSWORD;
exports.EMAIL = process.env.EMAIL;
exports.EMAIL_VERIFY_KEY = process.env.EMAIL_VERIFY_KEY || "-";
exports.FORGET_PASSWORD = process.env.FORGET_PASSWORD || "lupa bos";
exports.VERIFY_URL = process.env.VERIFY_URL;
exports.FORGOT_URL = process.env.FORGOT_URL;
exports.corsOption = {
    origin: "*",
    credentials: true,
};

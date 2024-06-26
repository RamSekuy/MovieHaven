"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config/config");
const key = {
    SECRET_KEY: config_1.SECRET_KEY,
    EMAIL_VERIFY_KEY: config_1.EMAIL_VERIFY_KEY,
    FORGET_PASSWORD: config_1.FORGET_PASSWORD,
};
const generateToken = (data, option = {}, selectKey = "SECRET_KEY") => {
    try {
        return (0, jsonwebtoken_1.sign)(data, key[selectKey], option);
    }
    catch (err) {
        throw err;
    }
};
exports.generateToken = generateToken;

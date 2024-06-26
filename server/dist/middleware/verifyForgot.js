"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyForgot = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config/config");
function verifyForgot(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    (0, jsonwebtoken_1.verify)(token.split(" ")[1], config_1.FORGET_PASSWORD, (err, decodedToken) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = decodedToken;
    });
    next();
}
exports.verifyForgot = verifyForgot;

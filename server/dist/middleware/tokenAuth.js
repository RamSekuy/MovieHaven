"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenAuth = void 0;
const config_1 = require("../config/config");
const jsonwebtoken_1 = require("jsonwebtoken");
function tokenAuth(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    (0, jsonwebtoken_1.verify)(token.split(" ")[1], config_1.SECRET_KEY, (err, decodedToken) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        if (decodedToken.type == "user")
            req.user = decodedToken;
        if (decodedToken.type == "admin")
            req.staff = decodedToken;
        next();
    });
}
exports.tokenAuth = tokenAuth;

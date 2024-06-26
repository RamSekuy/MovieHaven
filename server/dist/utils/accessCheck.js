"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessCheck = void 0;
function accessCheck(res, reqUserId, dataUserId) {
    if (reqUserId !== dataUserId) {
        res.status(401).send("User Doesn't have access");
        return false;
    }
    else
        return true;
}
exports.accessCheck = accessCheck;

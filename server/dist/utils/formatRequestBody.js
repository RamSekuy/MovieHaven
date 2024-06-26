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
exports.formatRequestBody = void 0;
const bcrypt_1 = require("bcrypt");
function formatRequestBody(req_1) {
    return __awaiter(this, arguments, void 0, function* (req, hashPassword = false) {
        Object.entries(req.body).forEach((e, i) => {
            const key = e[0];
            const value = e[1];
            req.body[key] = value.trim();
        });
        const { email, password } = req.body;
        if (email) {
            req.body.email = email.toLowerCase();
        }
        //Encrypt
        if (hashPassword) {
            const salt = yield (0, bcrypt_1.genSalt)(10);
            req.body.password = yield (0, bcrypt_1.hash)(password, salt);
        }
        return req.body;
    });
}
exports.formatRequestBody = formatRequestBody;

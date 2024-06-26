"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityRouter = void 0;
const express_1 = require("express");
class EntityRouter {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    getRouter() {
        return this.router;
    }
}
exports.EntityRouter = EntityRouter;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReferal = void 0;
function generateReferal(id) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return yyyy + mm + dd + id;
}
exports.generateReferal = generateReferal;

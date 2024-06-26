"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSeats = void 0;
function generateSeats() {
    const array = [];
    for (let letterCode = 'A'.charCodeAt(0); letterCode <= 'K'.charCodeAt(0); letterCode++) {
        for (let number = 1; number <= 10; number++) {
            array.push({ row: String.fromCharCode(letterCode), number: number });
        }
    }
    return array;
}
exports.generateSeats = generateSeats;

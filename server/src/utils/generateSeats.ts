import { Prisma } from "@prisma/client";

export function generateSeats(){
    const array: Prisma.SeatCreateManyStudioInput[] = [];

    for (let letterCode = 'A'.charCodeAt(0); letterCode <= 'K'.charCodeAt(0); letterCode++) {
        for (let number = 1; number <= 10; number++) {
            array.push({ row: String.fromCharCode(letterCode), number: number });
        }
    }

    return array;
}
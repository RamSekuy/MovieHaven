import { Prisma } from "@prisma/client";

export type IUserCookie = Omit<Prisma.UserFieldRefs, "password">;
export type IStaffCookie = Omit<Prisma.StaffFieldRefs, "password">;

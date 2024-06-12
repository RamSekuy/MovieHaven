import { Prisma, User } from "@prisma/client";

export type IUserCookie = Omit<User, "password">;
export type IStaffCookie = Omit<Prisma.StaffFieldRefs, "password">;

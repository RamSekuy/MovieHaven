import { prisma } from "../lib/prisma";

export async function userExpire(userId: number) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user?.pointExpire) {
    const now = new Date();
    if (user.pointExpire <= now) {
      return await prisma.user.update({
        where: { id: userId },
        data: { points: 0 },
      });
    }
    return user;
  }
}

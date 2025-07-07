import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { prisma } from '@/lib/db';

export async function getUserFromSession() {
  const session = await getServerSession(authConfig);

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  return user;
}

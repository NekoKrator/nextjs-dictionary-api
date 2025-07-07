import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/db';

export async function GET() {
  const session = await getServerSession(authConfig);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const words = await prisma.word.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json(words)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authConfig);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const { word, translation, example } = await request.json();

  const newWord = await prisma.word.create({
    data: {
      word,
      translation,
      example,
      userId: user.id
    }
  });

  return NextResponse.json(newWord, { status: 201 });
}

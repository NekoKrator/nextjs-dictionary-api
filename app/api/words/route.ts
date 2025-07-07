import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/db';
import { getUserFromSession } from '@/lib/session'

export async function GET() {
  const user = await getUserFromSession()

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
  const user = await getUserFromSession()

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

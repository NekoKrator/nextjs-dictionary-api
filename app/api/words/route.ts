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

  try {
    const data = await request.json();

    if (!data.word || !data.translation) {
      return NextResponse.json({ error: 'Word and translation are required' }, { status: 400 });
    }

    const newWord = await prisma.word.create({
      data: {
        word: data.word,
        transcription: data.transcription || null,
        translation: data.translation,
        partOfSpeech: data.partOfSpeech ? data.partOfSpeech.toUpperCase() : null,
        forms: data.forms || null,
        example: data.example || null,
        synonyms: data.synonyms || null,
        tags: data.tags || null,
        notes: data.notes || null,
        userId: user.id,
      },
    });

    return NextResponse.json(newWord, { status: 201 });
  } catch (error) {
    console.error('Failed to add word:', error);
    return NextResponse.json({ error: 'Failed to add word' }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest) {
  const user = await getUserFromSession()

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  const word = await prisma.word.findUnique({
    where: { id: Number(id) }
  })

  if (!word || word.userId !== user.id) {
    return NextResponse.json({ error: 'Word not found or unauthorized' }, { status: 404 });
  }

  await prisma.word.delete({
    where: { id: Number(id) }
  })

  return NextResponse.json({ message: 'Word deleted' }, { status: 200 })
}
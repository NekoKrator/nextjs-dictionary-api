import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/db';
import { getUserFromSession } from '@/lib/session'
import { ApiError } from '@/lib/api-error';

async function userCheck() {
  const user = await getUserFromSession();
  if (!user) {
    throw new ApiError('User not found', 404);
  }
  return user;
}

export async function GET() {
  try {
    const user = await userCheck();

    const words = await prisma.word.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(words);
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await userCheck();
    const data = await request.json();

    if (!data.word || !data.translation) {
      throw new ApiError('Word and translation are required', 400);
    }

    const newWord = await prisma.word.create({
      data: {
        word: data.word,
        translation: data.translation,
        transcription: data.transcription || null,
        audioUrl: data.audioUrl || null,
        partOfSpeech: data.partOfSpeech ? data.partOfSpeech.toUpperCase() : null,
        definition: data.definition || null,
        example: data.example || null,
        synonyms: data.synonyms || [],
        userNote: data.userNote || null,
        status: data.status || 'NEW',
        userId: user.id,
      }
    });

    return NextResponse.json(newWord, { status: 201 });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error('Failed to add word:', error);
    return NextResponse.json({ error: 'Failed to add word' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await userCheck();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      throw new ApiError('Missing ID', 400);
    }

    const word = await prisma.word.findUnique({ where: { id: Number(id) } });

    if (!word || word.userId !== user.id) {
      throw new ApiError('Word not found or unauthorized', 404);
    }

    await prisma.word.delete({ where: { id: Number(id) } });

    return NextResponse.json({ message: 'Word deleted' }, { status: 200 });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: 'Failed to delete word' }, { status: 500 });
  }
}
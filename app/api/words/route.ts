import { NextRequest, NextResponse } from "next/server";
import { getUserFromSession } from '@/lib/session';
import { getWords, createWord, deleteWord } from './controller';

async function getUserOrThrow() {
  const user = await getUserFromSession();
  if (!user) throw new Error('User not found');
  return user;
}

export async function GET() {
  try {
    const user = await getUserOrThrow();
    const words = await getWords(user.id);
    return NextResponse.json(words);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserOrThrow();
    const data = await request.json();

    if (!data.word || !data.translation) {
      return NextResponse.json({ error: 'Word and translation are required' }, { status: 400 });
    }

    const newWord = await createWord(user.id, data);
    return NextResponse.json(newWord, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getUserOrThrow();
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    await deleteWord(user.id, id);
    return NextResponse.json({ message: 'Word deleted' });
  } catch (error) {
    return handleError(error);
  }
}

function handleError(error: unknown) {
  if (error instanceof Error) {
    if (error.message === 'User not found') {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    if (error.message === 'Word not found or unauthorized') {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
  console.error('Unknown error:', error);
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
}

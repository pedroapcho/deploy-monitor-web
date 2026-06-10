import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { password } = await req.json();
  const expected = process.env.MONITOR_PASSWORD || 'demo123';

  if (password !== expected) {
    return NextResponse.json({ ok: false, error: 'Password incorrecto' }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}

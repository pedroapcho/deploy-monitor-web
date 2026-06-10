import { NextResponse } from 'next/server';
import { getRepoStatus } from '@/lib/github';

export async function GET() {
  try {
    const github = await getRepoStatus();

    return NextResponse.json({
      ok: true,
      openai: Boolean(process.env.OPENAI_API_KEY),
      github,
      vercel: Boolean(process.env.VERCEL_DEPLOY_HOOK_URL),
      previewUrl: process.env.NEXT_PUBLIC_PREVIEW_URL || ''
    });
  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      error: error.message || 'Error leyendo estado'
    }, { status: 500 });
  }
}

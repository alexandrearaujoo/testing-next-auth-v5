import { NextResponse } from 'next/server';

export async function GET() {
  console.log('CRON JOB');

  return NextResponse.json({ ok: 'true' });
}

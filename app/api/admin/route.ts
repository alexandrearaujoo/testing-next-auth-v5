import { NextResponse } from 'next/server';

import { getCurrentUserRole } from '@/lib/auth';
import { UserRole } from '@prisma/client';

export async function GET() {
  const { currentUserRole } = await getCurrentUserRole();

  if (currentUserRole !== UserRole.ADMIN)
    return new NextResponse(null, { status: 403 });

  return new NextResponse(null, { status: 200 });
}

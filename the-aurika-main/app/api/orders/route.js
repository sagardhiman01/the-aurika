import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

export async function GET(request) {
  try {
    const user = await requireAuth(request);

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                slug: true,
                images: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    if (error.message === 'Authentication required') {
      return NextResponse.json({ error: 'Please login' }, { status: 401 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

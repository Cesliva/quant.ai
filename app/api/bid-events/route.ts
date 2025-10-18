import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');
    
    const events = await prisma.bidEvent.findMany({
      where: projectId ? { projectId } : undefined,
      orderBy: { startsAt: 'asc' }
    });
    
    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error fetching bid events:', error);
    return NextResponse.json({ error: 'Failed to fetch bid events' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ev = await prisma.bidEvent.create({ data: body });
    return NextResponse.json(ev, { status: 201 });
  } catch (error) {
    console.error('Error creating bid event:', error);
    return NextResponse.json({ error: 'Failed to create bid event' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Event ID required' }, { status: 400 });
    }
    
    await prisma.bidEvent.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting bid event:', error);
    return NextResponse.json({ error: 'Failed to delete bid event' }, { status: 500 });
  }
}


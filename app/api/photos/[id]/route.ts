import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import { deleteImage } from '@/lib/storage';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const db = await getDb();
        const photo = await db.get('SELECT * FROM photos WHERE id = ?', [id]);

        if (!photo) {
            return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
        }

        return NextResponse.json(photo);
    } catch (error) {
        console.error('Error fetching photo:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const db = await getDb();

        // Get filename first
        const photo = await db.get('SELECT filename FROM photos WHERE id = ?', [id]);

        if (!photo) {
            return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
        }

        // Delete file
        await deleteImage(photo.filename);

        // Delete record
        await db.run('DELETE FROM photos WHERE id = ?', [id]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting photo:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

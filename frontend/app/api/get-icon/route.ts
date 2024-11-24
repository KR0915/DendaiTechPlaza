import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function GET(request: NextRequest) {
    const iconName = request.nextUrl.searchParams.get('id');

    if (!iconName) {
        return NextResponse.json({ error: 'Icon name is required' }, { status: 400 });
    }

    const iconPath = path.join(process.cwd(), 'public', 'user', 'icons', `${iconName}.webp`);

    try {
        const fileBuffer = await fs.readFile(iconPath);

        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': 'image/webp',
                'Cache-Control': 'public, max-age=60, stale-while-revalidate=300'
            }
        });
    } catch (error) {
        console.error('Error reading file:', error);
        return NextResponse.json({ error: 'Icon not found' }, { status: 404 });
    }
}


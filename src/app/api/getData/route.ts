import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { CardData } from '@/components/CardGrid';

const DATA_FILE = path.join(process.cwd(), 'data.json');

export async function GET() {
    if (!fs.existsSync(DATA_FILE)) return NextResponse.json([]);

    const data: CardData[] = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    return NextResponse.json(data);
}

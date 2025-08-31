import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const DATA_FILE = path.join(process.cwd(), 'data.json');

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        let existingData: any[] = [];
        if (fs.existsSync(DATA_FILE)) {
            const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
            existingData = fileContent ? JSON.parse(fileContent) : [];
        }

        const newRecord = { id: randomUUID(), ...data };

        existingData.push(newRecord);
        fs.writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2));

        return NextResponse.json({ message: 'Дані збережено', data: newRecord });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Помилка при збереженні', error: err }, { status: 500 });
    }
}

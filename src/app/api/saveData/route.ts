import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const DATA_FILE = path.join(process.cwd(), 'data.json');

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const sanitizedData = {
            id: randomUUID(),
            title: { ua: data.title?.ua || '', en: data.title?.en || '' },
            description: { ua: data.description?.ua || '', en: data.description?.en || '' },
            content: { ua: data.content?.ua || '', en: data.content?.en || '' },
            link: data.link || '',
            imageUrl: data.imageUrl || '',
        };

        let existingData: typeof sanitizedData[] = [];
        if (fs.existsSync(DATA_FILE)) {
            const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
            existingData = fileContent ? JSON.parse(fileContent) : [];
        }

        existingData.push(sanitizedData);
        fs.writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2));

        return NextResponse.json({ message: 'Дані збережено', data: sanitizedData });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Помилка при збереженні', error: err }, { status: 500 });
    }
}

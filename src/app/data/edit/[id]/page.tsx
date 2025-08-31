import RecordForm, { FormData } from '@/components/RecordForm';
import { useRouter } from 'next/navigation';
import fs from 'fs';
import path from 'path';

interface Props {
    params: { id: string };
}

const DATA_FILE = path.join(process.cwd(), 'data.json');

export default function EditPage({ params }: Props) {
    const router = useRouter();
    const id = parseInt(params.id, 10);

    const existingData: FormData[] = fs.existsSync(DATA_FILE)
        ? JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
        : [];

    const data = existingData[id];

    if (!data) return <div>Запис не знайдено</div>;

    const handleSubmit = (updatedData: FormData) => {
        existingData[id] = updatedData;
        fs.writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2));
        alert('Запис оновлено');
        router.push('/');
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
            <h1>Редагувати запис</h1>
            <RecordForm initialData={data} onSubmit={handleSubmit} />
        </div>
    );
}

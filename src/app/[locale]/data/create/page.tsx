'use client';

import RecordForm, { FormData } from '@/components/RecordForm';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
    const router = useRouter();

    const handleSubmit = async (data: FormData) => {
        try {
            const res = await fetch('/api/saveData', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            alert(result.message);
            router.push('/');
        } catch (err) {
            console.error(err);
            alert('Помилка при збереженні');
        }
    };

    return (
        <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
            <RecordForm onSubmit={handleSubmit} />
        </div>
    );
}

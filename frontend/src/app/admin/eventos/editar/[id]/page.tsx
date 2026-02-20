'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import EventForm from '@/components/EventForm';

export default function EditEventPage() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await apiFetch(`/events`);
                const found = data.find((e: any) => e.id === id);
                setEvent(found);
            } catch (error) {
                console.error('Error fetching event', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    if (loading) return <div>Cargando...</div>;
    if (!event) return <div>Evento no encontrado</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Editar Evento</h2>
                <p className="text-slate-500">Actualiza los detalles del evento programado.</p>
            </div>
            <EventForm initialData={event} isEditing={true} />
        </div>
    );
}

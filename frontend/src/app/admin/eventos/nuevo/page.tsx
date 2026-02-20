'use client';

import EventForm from '@/components/EventForm';

export default function NewEventPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Nuevo Evento</h2>
                <p className="text-slate-500">Programa actividades para la comunidad educativa.</p>
            </div>
            <EventForm />
        </div>
    );
}

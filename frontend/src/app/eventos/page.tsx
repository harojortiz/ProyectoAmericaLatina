'use client';

import { useEffect, useState } from 'react';
import { Event } from '@/types';
import { apiFetch } from '@/lib/api';

export default function PublicEventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await apiFetch('/events/public');
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Calendario de Eventos</h1>
                <p className="text-slate-500 max-w-2xl mx-auto">Participa en nuestras actividades y eventos programados.</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
                {loading ? (
                    <div className="text-center py-20">Cargando eventos...</div>
                ) : events.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 italic">No hay eventos próximos.</div>
                ) : events.map((event) => (
                    <div key={event.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-center hover:shadow-md transition">
                        <div className="w-full md:w-32 h-32 bg-red-700 text-white rounded-3xl flex flex-col items-center justify-center shrink-0">
                            <span className="text-4xl font-black">{new Date(event.date).getDate()}</span>
                            <span className="text-lg uppercase font-bold">{new Date(event.date).toLocaleString('es', { month: 'short' })}</span>
                        </div>
                        <div className="flex-grow">
                            <div className="flex flex-wrap gap-2 mb-2">
                                <span className="text-xs font-bold bg-red-50 text-red-700 px-3 py-1 rounded-full uppercase">
                                    {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                {event.location && (
                                    <span className="text-xs font-bold bg-slate-50 text-slate-500 px-3 py-1 rounded-full uppercase">
                                        {event.location}
                                    </span>
                                )}
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">{event.title}</h2>
                            <div className="text-slate-600 prose-sm" dangerouslySetInnerHTML={{ __html: event.description }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

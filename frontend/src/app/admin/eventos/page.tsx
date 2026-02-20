'use client';

import { useEffect, useState } from 'react';
import { Event } from '@/types';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';

export default function EventsAdminPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        try {
            const data = await apiFetch('/events');
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este evento?')) return;
        try {
            await apiFetch(`/events/${id}`, { method: 'DELETE' });
            setEvents(events.filter(e => e.id !== id));
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h2 className="text-3xl font-black text-black uppercase tracking-tighter italic m-0 leading-none">
                        Agenda de <span className="text-[#AA0F16]">Eventos</span>
                    </h2>
                    <p className="text-slate-500 font-medium italic mt-4">Planeación de actividades académicas y comunitarias.</p>
                </div>
                <Link href="/admin/eventos/nuevo" className="px-8 py-4 bg-black text-white font-black uppercase text-[10px] tracking-widest hover:bg-[#AA0F16] transition-all shadow-xl">
                    + Agendar Actividad
                </Link>
            </div>

            <div className="bg-white border-2 border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b-4 border-slate-50">
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Detalle de Actividad</th>
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Ubicación</th>
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Estado</th>
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Opciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {loading ? (
                            <tr><td colSpan={4} className="px-8 py-20 text-center font-black text-slate-300 uppercase tracking-widest animate-pulse">Sincronizando calendario...</td></tr>
                        ) : events.length === 0 ? (
                            <tr><td colSpan={4} className="px-8 py-20 text-center font-black text-slate-300 uppercase tracking-widest italic">No hay registros en la agenda.</td></tr>
                        ) : events.map((event) => (
                            <tr key={event.id} className="group hover:bg-slate-50 transition-colors">
                                <td className="px-8 py-6">
                                    <p className="font-black text-black uppercase tracking-tighter text-lg group-hover:text-[#AA0F16] transition-colors">{event.title}</p>
                                    <p className="text-[10px] font-bold text-[#AA0F16] uppercase tracking-widest mt-1 italic">
                                        📅 {new Date(event.date).toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })}
                                    </p>
                                </td>
                                <td className="px-8 py-6">
                                    <p className="text-xs font-black text-slate-600 uppercase tracking-widest">{event.location || 'Sede Principal'}</p>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`inline-flex items-center px-4 py-1.5 text-[9px] font-black uppercase tracking-widest ${event.published
                                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                        : 'bg-slate-50 text-slate-400 border border-slate-100'
                                        }`}>
                                        {event.published ? 'Confirmado' : 'Pendiente'}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex justify-end gap-6">
                                        <Link href={`/admin/eventos/editar/${event.id}`} className="text-[10px] font-black uppercase tracking-widest text-black hover:text-[#AA0F16] transition-colors border-b-2 border-transparent hover:border-[#AA0F16]">
                                            Editar
                                        </Link>
                                        <button onClick={() => handleDelete(event.id)} className="text-[10px] font-black uppercase tracking-widest text-[#AA0F16] hover:text-black transition-colors opacity-40 hover:opacity-100">
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

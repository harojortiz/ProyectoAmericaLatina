'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import { Event } from '@/types';

export default function EventCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    useEffect(() => {
        fetchEvents();
    }, [currentDate]);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            // En una implementación real, filtraríamos por mes/año en el backend
            const data = await apiFetch<Event[]>('/events');
            setEvents(data);
        } catch (error) {
            console.error('Failed to fetch events', error);
            // Mock data for demonstration
            setEvents([
                {
                    id: 'demo-1',
                    title: 'Izada de Bandera',
                    description: 'Celebración patria',
                    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15).toISOString(),
                    location: 'Patio Central',
                    published: true,
                    creator: { fullName: 'Dirección', role: 'SUPER_ADMIN' },
                    media: [],
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'demo-2',
                    title: 'Entrega de Notas',
                    description: 'Primer Periodo',
                    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 28).toISOString(),
                    location: 'Aulas',
                    published: true,
                    creator: { fullName: 'Coordinación', role: 'DIRECTIVO' },
                    media: [],
                    createdAt: new Date().toISOString()
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const changeMonth = (offset: number) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
        setSelectedDate(null);
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const monthName = currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

    const getEventsForDay = (day: number) => {
        return events.filter(e => {
            const eventDate = new Date(e.date);
            return eventDate.getDate() === day &&
                eventDate.getMonth() === currentDate.getMonth() &&
                eventDate.getFullYear() === currentDate.getFullYear();
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="bg-[#AA0F16] p-6 text-white flex justify-between items-center">
                <button
                    onClick={() => changeMonth(-1)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                    ←
                </button>
                <h2 className="text-2xl font-black uppercase tracking-widest capitalize">
                    {monthName}
                </h2>
                <button
                    onClick={() => changeMonth(1)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                    →
                </button>
            </div>

            {/* Grid */}
            <div className="p-6">
                {/* Weekdays */}
                <div className="grid grid-cols-7 mb-4">
                    {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                        <div key={day} className="text-center text-xs font-black text-slate-400 uppercase tracking-widest py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days */}
                <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square bg-slate-50/50 rounded-lg"></div>
                    ))}

                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const dayEvents = getEventsForDay(day);
                        const hasEvents = dayEvents.length > 0;
                        const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

                        return (
                            <div
                                key={day}
                                onClick={() => hasEvents && setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                                className={`
                  aspect-square rounded-lg border-2 flex flex-col items-center justify-center relative cursor-pointer transition-all duration-300 group
                  ${hasEvents ? 'border-[#AA0F16] bg-red-50 hover:bg-[#AA0F16] hover:text-white' : 'border-slate-100 hover:border-slate-300'}
                  ${isToday ? 'bg-slate-900 text-white border-slate-900' : ''}
                `}
                            >
                                <span className={`text-lg font-bold ${hasEvents ? 'font-black' : 'font-medium'}`}>
                                    {day}
                                </span>

                                {hasEvents && (
                                    <div className="flex gap-1 mt-1">
                                        {dayEvents.map((_, idx) => (
                                            <div key={idx} className="w-1.5 h-1.5 rounded-full bg-[#AA0F16] group-hover:bg-white"></div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Event Details Footer */}
            {(selectedDate || loading) && (
                <div className="bg-slate-50 border-t border-slate-100 p-6 animate-fade-in-up">
                    {loading ? (
                        <div className="text-center text-slate-400">Cargando eventos...</div>
                    ) : selectedDate ? (
                        <div>
                            <h3 className="text-[#AA0F16] font-black uppercase tracking-widest text-sm mb-4">
                                Eventos del {selectedDate.toLocaleDateString()}
                            </h3>
                            <div className="space-y-3">
                                {getEventsForDay(selectedDate.getDate()).map(event => (
                                    <div key={event.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-start gap-4">
                                        <span className="text-2xl">📅</span>
                                        <div>
                                            <h4 className="font-bold text-black">{event.title}</h4>
                                            <p className="text-sm text-slate-500">{event.description}</p>
                                            <p className="text-xs text-[#AA0F16] font-bold mt-2 uppercase tracking-wide">
                                                📍 {event.location || 'Lugar por definir'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
}

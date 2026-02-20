'use client';

import EventCalendar from '@/components/EventCalendar';

export default function CalendarioPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="bg-white py-24 text-center border-b-8 border-[#AA0F16]">
                <div className="container mx-auto px-4">
                    <span className="text-black font-black tracking-[0.5em] uppercase text-xs mb-4 block">
                        Agenda Institucional
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase text-[#AA0F16] m-0 leading-none">
                        Calendario
                    </h1>
                    <h4 className="text-black font-black mt-4 uppercase tracking-widest text-sm">
                        Eventos y Actividades 2026
                    </h4>
                    <div className="h-2 w-32 bg-black mx-auto mt-8"></div>
                </div>
            </section>

            {/* Calendar Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto font-medium">
                        Mantente informado sobre todas las actividades escolares, fechas importantes y celebraciones de nuestra comunidad educativa.
                    </p>

                    <EventCalendar />

                    {/* Leyenda */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
                            <span className="text-4xl mb-4 block">🚩</span>
                            <h3 className="font-black text-sm uppercase mb-2">Izadas de Bandera</h3>
                            <p className="text-xs text-slate-500">Celebraciones patrias y reconocimientos.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
                            <span className="text-4xl mb-4 block">📝</span>
                            <h3 className="font-black text-sm uppercase mb-2">Entregas de Notas</h3>
                            <p className="text-xs text-slate-500">Reuniones de padres y seguimiento académico.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
                            <span className="text-4xl mb-4 block">🎉</span>
                            <h3 className="font-black text-sm uppercase mb-2">Eventos Culturales</h3>
                            <p className="text-xs text-slate-500">Día de la familia, festival artístico, etc.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

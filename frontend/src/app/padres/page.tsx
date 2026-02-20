'use client';

import React from 'react';
import Link from 'next/link';

export default function PadresPage() {
    const parentTools = [
        {
            title: 'Pagos y Pensiones',
            description: 'Realiza el pago de mensualidades y otros servicios educativos.',
            icon: '💳',
            link: '#', // Requiere URL de pasarela de pagos
            color: 'bg-emerald-600'
        },
        {
            title: 'Circulares',
            description: 'Mantente informado con los comunicados oficiales del colegio.',
            icon: '📩',
            link: '/noticias',
            color: 'bg-[#AA0F16]'
        },
        {
            title: 'Boletines de Notas',
            description: 'Descarga y revisa el informe académico actualizado de tu hijo(a).',
            icon: '📊',
            link: '/faq',
            color: 'bg-black'
        },
        {
            title: 'Citas con Docentes',
            description: 'Agenda reuniones presenciales o virtuales con nuestro equipo.',
            icon: '🤝',
            link: '/contacto',
            color: 'bg-amber-500'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header del Portal */}
            <section className="bg-white py-20 border-b border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="text-emerald-600 font-black tracking-[0.5em] uppercase text-xs mb-4 block">Portal de Acudientes</span>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase text-black m-0 leading-none">
                        Gestión <span className="text-[#AA0F16]">Familiar</span>
                    </h1>
                    <p className="mt-8 text-slate-500 max-w-2xl mx-auto text-lg font-medium italic">
                        Facilitamos tu comunicación y gestión con la institución. Todo el control académico y administrativo en tus manos.
                    </p>
                </div>
            </section>

            {/* Dashboard de Herramientas */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {parentTools.map((tool, index) => (
                            <Link
                                key={index}
                                href={tool.link}
                                className="bg-white p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 group flex flex-col items-center text-center"
                            >
                                <div className={`w-20 h-20 ${tool.color} rounded-sm flex items-center justify-center text-4xl mb-8 group-hover:rotate-12 transition-transform duration-500 shadow-lg`}>
                                    {tool.icon}
                                </div>
                                <h3 className="text-2xl font-black text-black uppercase italic tracking-tighter mb-4">{tool.title}</h3>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed italic">{tool.description}</p>
                                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity font-black text-[#AA0F16] text-[10px] uppercase tracking-widest underline decoration-2">
                                    Ir a la sección &rarr;
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Info de contacto rápido */}
            <section className="py-20 bg-white border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-[#AA0F16] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h4 className="text-2xl font-black uppercase tracking-tighter italic">¿Necesitas ayuda inmediata?</h4>
                            <p className="font-bold opacity-80 mt-2">Nuestra secretaría académica está para apoyarte.</p>
                        </div>
                        <div className="flex gap-4">
                            <a href="tel:3204518938" className="px-8 py-4 bg-black text-white font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-colors">
                                LLAMAR AHORA
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

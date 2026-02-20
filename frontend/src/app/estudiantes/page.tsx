'use client';

import React from 'react';
import Link from 'next/link';

export default function EstudiantesPage() {
    const studentTools = [
        {
            title: 'Aula Virtual',
            description: 'Accede a tus clases, tareas y material de apoyo en línea.',
            icon: '💻',
            link: 'https://classroom.google.com', // Enlace común por defecto
            color: 'bg-blue-600'
        },
        {
            title: 'Consulta de Notas',
            description: 'Revisa tu progreso académico y boletines por periodo.',
            icon: '📝',
            link: '/faq', // Vinculado a FAQ para dudas sobre notas por ahora
            color: 'bg-[#AA0F16]'
        },
        {
            title: 'Horario de Clases',
            description: 'Consulta tus bloques de clase y salones correspondientes.',
            icon: '📅',
            link: '/calendario',
            color: 'bg-black'
        },
        {
            title: 'Calendario Académico',
            description: 'Fechas de exámenes, salidas pedagógicas y eventos.',
            icon: '🗓️',
            link: '/calendario',
            color: 'bg-slate-700'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header del Portal */}
            <section className="bg-white py-20 border-b border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="text-blue-600 font-black tracking-[0.5em] uppercase text-xs mb-4 block">Área del Estudiante</span>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase text-black m-0 leading-none">
                        ¡Hola, <span className="text-[#AA0F16]">Estudiante!</span>
                    </h1>
                    <p className="mt-8 text-slate-500 max-w-2xl mx-auto text-lg font-medium italic">
                        Tu centro de recursos académicos. Todo lo que necesitas para tu día a día escolar en un solo lugar.
                    </p>
                </div>
            </section>

            {/* Dashboard de Herramientas */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {studentTools.map((tool, index) => (
                            <Link
                                key={index}
                                href={tool.link}
                                className="bg-white p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 group flex flex-col items-center text-center rounded-sm"
                            >
                                <div className={`w-20 h-20 ${tool.color} rounded-full flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform duration-500 rotate-6 group-hover:rotate-0 shadow-lg`}>
                                    {tool.icon}
                                </div>
                                <h3 className="text-2xl font-black text-black uppercase italic tracking-tighter mb-4">{tool.title}</h3>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed italic">{tool.description}</p>
                                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity font-black text-[#AA0F16] text-[10px] uppercase tracking-widest">
                                    Ingresar ahora &rarr;
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Franja de Apoyo */}
            <section className="bg-black py-16 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4">"El aprendizaje es el único tesoro que siempre te seguirá"</h2>
                    <p className="text-xs font-black uppercase tracking-[0.4em] text-[#AA0F16]">#OrgulloAméricaLatina</p>
                </div>
            </section>
        </div>
    );
}

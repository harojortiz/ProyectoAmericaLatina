'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiFetch, MEDIA_URL } from '@/lib/api';
import Image from 'next/image';

interface Grade {
    id: string;
    name: string;
    section: string;
    description: string | null;
    order: number;
}

export default function GradosPage() {
    const [grades, setGrades] = useState<Grade[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const data = await apiFetch('/grades');
                setGrades(data);
            } catch (error) {
                console.error('Error fetching grades', error);
            } finally {
                setLoading(false);
            }
        };
        fetchGrades();
    }, []);

    const preescolar = grades.filter(g => g.section === 'PREESCOLAR');
    const primaria = grades.filter(g => g.section === 'PRIMARIA');
    const secundaria = grades.filter(g => g.section === 'SECUNDARIA');

    const GradeSection = ({ title, subtitle, members }: { title: string, subtitle: string, members: Grade[] }) => (
        <section className="py-24 bg-white border-b border-slate-50 last:border-0 overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter uppercase m-0 leading-none">
                        {title}
                    </h2>
                    <div className="h-1.5 w-24 bg-[#AA0F16] mx-auto mt-6"></div>
                    <p className="mt-6 text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px]">
                        {subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {members.map((grade) => (
                        <div key={grade.id} className="group relative">
                            {/* Card Media 16:9 for Groups */}
                            <div className="w-full aspect-video rounded-3xl overflow-hidden bg-slate-50 border-2 border-slate-50 group-hover:border-[#AA0F16] transition-all duration-500 relative mb-8 shadow-sm group-hover:shadow-2xl">
                                {(grade as any).media?.[0] ? (
                                    <Image
                                        src={`${MEDIA_URL}${(grade as any).media[0].url}`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        alt={grade.name}
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-200 gap-4">
                                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
                                        </svg>
                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Pendiente de fotografía</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none m-0 italic group-hover:translate-x-2 transition">
                                        {grade.name}
                                    </h3>
                                </div>
                            </div>

                            {grade.description && (
                                <p className="text-slate-500 font-medium text-sm leading-relaxed px-2">
                                    {grade.description}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

    return (
        <div className="min-h-screen bg-white font-sans overflow-x-hidden">
            {/* Hero Minimalista e Iluminado */}
            <section className="relative h-[45vh] flex items-center justify-center bg-slate-50 border-b-8 border-[#AA0F16]">
                <div className="absolute inset-0 opacity-10">
                    <Image
                        src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop"
                        fill
                        className="object-cover"
                        alt="Grados"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block px-4 py-1 bg-black text-white text-[10px] font-black uppercase tracking-[0.4em] mb-6 shadow-xl">Comunidad Estudiantil</span>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase text-black m-0 leading-none">
                        Nuestros <span className="text-[#AA0F16]">Grados</span>
                    </h1>
                </div>
            </section>

            {loading ? (
                <div className="py-40 text-center">
                    <div className="inline-block w-8 h-8 border-2 border-slate-100 border-t-[#AA0F16] rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="divide-y divide-slate-50">
                    {preescolar.length > 0 && <GradeSection title="Preescolar" subtitle="Nuestros Primeros Pasos" members={preescolar} />}
                    {primaria.length > 0 && <GradeSection title="Primaria" subtitle="Formando Cimientos Sólidos" members={primaria} />}
                    {secundaria.length > 0 && <GradeSection title="Secundaria" subtitle="Hacia la Excelencia y el Futuro" members={secundaria} />}

                    {grades.length === 0 && (
                        <div className="py-40 text-center">
                            <p className="text-2xl font-black italic text-slate-200 uppercase tracking-tighter italic">Cargando Grados Estudiantiles...</p>
                        </div>
                    )}
                </div>
            )}

            <section className="py-32 bg-slate-50 border-t border-slate-100 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-8 text-black">¿Quieres ser parte de nuestra familia?</h2>
                    <Link href="/admisiones" className="inline-block px-12 py-5 bg-black text-white font-black uppercase text-[10px] tracking-widest hover:bg-[#AA0F16] transition-all rounded-full shadow-2xl">
                        Información de Admisiones
                    </Link>
                </div>
            </section>
        </div>
    );
}

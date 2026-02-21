'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiFetch, MEDIA_URL } from '@/lib/api';
import Image from 'next/image';

interface StaffMember {
    id: string;
    name: string;
    title: string;
    type: 'DIRECTIVO' | 'DOCENTE' | 'ADMINISTRATIVO';
    email: string | null;
    order: number;
}

export default function EquipoHumanoPage() {
    const [staff, setStaff] = useState<StaffMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const data = await apiFetch('/staff/public');
                setStaff(data);
            } catch (error) {
                console.error('Error fetching staff', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStaff();
    }, []);

    const directivos = staff.filter(s => s.type === 'DIRECTIVO');
    const docentes = staff.filter(s => s.type === 'DOCENTE');
    const administrativos = staff.filter(s => s.type === 'ADMINISTRATIVO');

    const StaffSection = ({ title, subtitle, members }: { title: string, subtitle: string, members: StaffMember[] }) => (
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

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-16">
                    {members.map((person) => (
                        <div key={person.id} className="flex flex-col items-center group text-balance">
                            {/* Card Media 1:1 */}
                            <div className="w-full aspect-square rounded-3xl overflow-hidden bg-slate-50 border-2 border-slate-50 group-hover:border-[#AA0F16] transition-all duration-500 relative mb-6">
                                {(person as StaffMember & { media?: { url: string }[] }).media?.[0] ? (
                                    <Image
                                        src={`${MEDIA_URL}${(person as StaffMember & { media?: { url: string }[] }).media?.[0]?.url}`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        alt={person.name}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-200">
                                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Info Centrada y Alineada */}
                            <div className="text-center w-full space-y-2">
                                <h3 className="text-xs md:text-sm font-black text-black uppercase tracking-tight leading-tight line-clamp-2 min-h-[2rem] flex items-center justify-center group-hover:text-[#AA0F16] transition-colors">
                                    {person.name}
                                </h3>
                                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#AA0F16] opacity-60 line-clamp-1">
                                    {person.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

    return (
        <div className="min-h-screen bg-white font-sans overflow-x-hidden">
            {/* Hero Iluminado y Cálido */}
            <section className="relative h-[45vh] flex items-center justify-center bg-slate-50 border-b-8 border-[#AA0F16]">
                <div className="absolute inset-0 opacity-10">
                    <Image
                        src="https://images.unsplash.com/photo-1523050335392-9ae844963131?q=80&w=2070&auto=format&fit=crop"
                        fill
                        className="object-cover"
                        alt="Hero"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block px-4 py-1 bg-black text-white text-[10px] font-black uppercase tracking-[0.4em] mb-6 shadow-xl">Comunidad Educativa</span>
                    <h1 className="text-6xl md:text-9xl font-black tracking-tight italic uppercase text-black m-0 leading-none">
                        Nuestro <span className="text-[#AA0F16]">Equipo</span>
                    </h1>
                </div>
                <nav className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-8 text-black/40 text-[9px] font-black uppercase tracking-widest">
                    <Link href="/" className="hover:text-[#AA0F16] transition">Inicio</Link>
                    <a href="#directivos" className="hover:text-[#AA0F16] transition">Directivos</a>
                    <a href="#docentes" className="hover:text-[#AA0F16] transition">Docentes</a>
                    <a href="#administrativos" className="hover:text-[#AA0F16] transition">Administrativos</a>
                </nav>
            </section>

            {loading ? (
                <div className="py-40 text-center">
                    <div className="inline-block w-8 h-8 border-2 border-slate-100 border-t-[#AA0F16] rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="divide-y divide-slate-50">
                    {directivos.length > 0 && <div id="directivos"><StaffSection title="Directivos" subtitle="Liderazgo Institucional" members={directivos} /></div>}
                    {docentes.length > 0 && <div id="docentes" className="bg-slate-50/50"><StaffSection title="Docentes" subtitle="Nuestro Cuerpo Académico" members={docentes} /></div>}
                    {administrativos.length > 0 && <div id="administrativos"><StaffSection title="Administrativos" subtitle="Gestión y Servicio" members={administrativos} /></div>}

                    {staff.length === 0 && (
                        <div className="py-40 text-center">
                            <p className="text-2xl font-black italic text-slate-200 uppercase tracking-tighter text-balance">&quot;El corazón de nuestro colegio es su gente&quot;</p>
                        </div>
                    )}
                </div>
            )}

            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4 text-center">
                    <h4 className="text-[#AA0F16] font-black uppercase tracking-[0.5em] text-[10px] mb-8">Fe y Alegría - América Latina</h4>
                    <Link href="/contacto" className="inline-block px-10 py-4 bg-black text-white font-black uppercase text-[10px] tracking-widest hover:bg-[#AA0F16] transition-all rounded-full">
                        Forma parte de nosotros
                    </Link>
                </div>
            </section>
        </div>
    );
}

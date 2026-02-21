'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';

export default function HistoriaPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [pageData, setPageData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const data = await apiFetch('/pages/public/historia');
                // Intentamos parsear el JSON si viene estructurado
                if (data.content?.startsWith('{')) {
                    data.structured = JSON.parse(data.content);
                }
                setPageData(data);
            } catch {
                console.log('Usando contenido estático por defecto');
            } finally {
                setLoading(false);
            }
        };
        fetchPage();
    }, []);

    // Renderizado dinámico estructurado (Editor inteligente)
    if (pageData?.structured && !loading) {
        const { hitos } = pageData.structured;
        return (
            <div className="min-h-screen bg-white">
                <section className="bg-white py-24 text-center border-b-8 border-[#AA0F16]">
                    <div className="container mx-auto px-4">
                        <span className="text-black font-black tracking-[0.5em] uppercase text-xs mb-4 block">Nuestro Legado</span>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase text-[#AA0F16] m-0">{pageData.title}</h1>
                        <h4 className="text-black font-black mt-2 uppercase tracking-widest">{pageData.description}</h4>
                        <div className="h-2 w-32 bg-[#AA0F16] mx-auto mt-8"></div>
                    </div>
                </section>

                <section className="py-24">
                    <div className="container mx-auto px-4 max-w-5xl">
                        {hitos?.map((hito: { titulo: string; texto: string }, index: number) => (
                            <div key={index} className={`grid md:grid-cols-2 gap-20 items-center mb-32 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                <div className={index % 2 !== 0 ? 'md:order-2 space-y-8' : 'space-y-8'}>
                                    <h2 className="text-4xl md:text-5xl font-black text-[#AA0F16] tracking-tighter m-0 uppercase italic leading-none">{hito.titulo}</h2>
                                    <div className="text-slate-600 leading-relaxed text-lg [&>p]:mb-4" dangerouslySetInnerHTML={{ __html: hito.texto }} />
                                </div>
                                <div className={`${index % 2 !== 0 ? 'md:order-1' : ''} relative border-[20px] border-slate-50 shadow-2xl overflow-hidden`}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={index === 0 ? "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" : "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"}
                                        alt={hito.titulo}
                                        className="w-full aspect-video object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-white py-24 border-t-8 border-[#AA0F16] text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-black italic mb-10 uppercase tracking-tighter text-[#AA0F16]">Somos parte de un legado de esperanza</h2>
                        <Link href="/nosotros/mision-vision" className="px-12 py-5 bg-[#AA0F16] text-white font-black hover:bg-black transition shadow-2xl uppercase tracking-[0.2em] text-[10px] inline-block">
                            Misión y Visión &rarr;
                        </Link>
                    </div>
                </section>
            </div>
        );
    }

    // Renderizado HTML Clásico (Respaldo)
    if (pageData && !loading) {
        return (
            <div className="min-h-screen bg-white">
                <section className="bg-white py-24 text-center border-b-8 border-[#AA0F16]">
                    <div className="container mx-auto px-4">
                        <span className="text-black font-black tracking-[0.5em] uppercase text-xs mb-4 block">Nuestro Legado</span>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase text-[#AA0F16] m-0">{pageData.title}</h1>
                        <h4 className="text-black font-black mt-2 uppercase tracking-widest">{pageData.description}</h4>
                        <div className="h-2 w-32 bg-[#AA0F16] mx-auto mt-8"></div>
                    </div>
                </section>

                <section className="py-24">
                    <div className="container mx-auto px-4 max-w-4xl prose prose-xl prose-slate font-medium leading-relaxed">
                        <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
                    </div>
                </section>

                <section className="bg-white py-24 border-t-8 border-[#AA0F16] text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-black italic mb-10 uppercase tracking-tighter text-[#AA0F16]">Somos parte de un legado de esperanza</h2>
                        <Link href="/nosotros/mision-vision" className="px-12 py-5 bg-[#AA0F16] text-white font-black hover:bg-black transition shadow-2xl uppercase tracking-[0.2em] text-[10px] inline-block">
                            Misión y Visión &rarr;
                        </Link>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-40 text-center">
            <div className="inline-block w-12 h-12 border-4 border-[#AA0F16] border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { apiFetch } from '@/lib/api';

export default function MisionVisionPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [pageData, setPageData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const data = await apiFetch('/pages/public/mision-vision');
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

    if (pageData?.structured && !loading) {
        const { mision, vision } = pageData.structured;
        return (
            <div className="min-h-screen bg-white">
                <section className="bg-[#AA0F16] py-24 text-center text-white">
                    <div className="container mx-auto px-4">
                        <span className="text-white/60 font-black tracking-[0.5em] uppercase text-xs mb-4 block">Identidad Institucional</span>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase m-0">{pageData.title}</h1>
                        <div className="h-2 w-32 bg-white mx-auto mt-8"></div>
                    </div>
                </section>

                <section className="py-32">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-20 items-center">
                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="h-px w-12 bg-[#AA0F16]"></div>
                                    <span className="font-black uppercase tracking-widest text-[#AA0F16] text-xs">Propósito Vital</span>
                                </div>
                                <h2 className="text-6xl font-black text-black tracking-tighter italic uppercase m-0">Nuestra Misión</h2>
                                <div className="p-10 bg-slate-50 border-l-8 border-[#AA0F16]">
                                    <div
                                        className="text-2xl text-slate-700 leading-tight font-medium italic [&>p]:mb-4"
                                        dangerouslySetInnerHTML={{ __html: mision }}
                                    />
                                </div>
                            </div>
                            <div className="relative aspect-square shadow-2xl overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop"
                                    alt="Misión"
                                    fill
                                    className="object-cover grayscale brightness-50"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-32 bg-slate-50 border-t border-slate-100 text-center">
                    <div className="container mx-auto px-4 max-w-4xl space-y-12">
                        <span className="font-black uppercase tracking-[0.5em] text-[#AA0F16] text-xs">Hacia el Futuro</span>
                        <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase m-0 text-black">Nuestra Visión</h2>
                        <div className="h-1.5 w-24 bg-[#AA0F16] mx-auto"></div>
                        <div
                            className="text-3xl md:text-4xl font-black leading-none tracking-tight text-slate-800"
                            dangerouslySetInnerHTML={{ __html: vision }}
                        />
                    </div>
                </section>
            </div>
        );
    }

    // Fallback HTML o estático
    return (
        <div className="min-h-screen bg-white py-40 text-center">
            <div className="inline-block w-12 h-12 border-4 border-[#AA0F16] border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}

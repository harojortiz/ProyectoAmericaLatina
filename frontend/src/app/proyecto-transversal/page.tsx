'use client';

import React, { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';

export default function ProyectoTransversalPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [pageData, setPageData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const data = await apiFetch('/pages/public/proyecto-transversal');
                setPageData(data);
            } catch {
                console.log('Usando contenido estático por defecto');
            } finally {
                setLoading(false);
            }
        };
        fetchPage();
    }, []);

    if (pageData && !loading) {
        return (
            <div className="min-h-screen bg-white">
                <section className="bg-white py-24 text-center border-b-8 border-[#AA0F16]">
                    <div className="container mx-auto px-4">
                        <span className="text-black font-black tracking-[0.5em] uppercase text-xs mb-4 block">Formación Integral</span>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase text-[#AA0F16] m-0">{pageData.title}</h1>
                        <h4 className="text-black font-black mt-2 uppercase tracking-widest">{pageData.description || 'Proyectos que Transforman'}</h4>
                        <div className="h-2 w-32 bg-[#AA0F16] mx-auto mt-8"></div>
                    </div>
                </section>

                <section className="py-24">
                    <div className="container mx-auto px-4 max-w-4xl prose prose-xl prose-slate font-medium leading-relaxed">
                        <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <section className="bg-white py-24 text-center border-b-8 border-[#AA0F16]">
                <div className="container mx-auto px-4">
                    <span className="text-black font-black tracking-[0.5em] uppercase text-xs mb-4 block">Formación Integral</span>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase text-[#AA0F16] m-0">Proyecto Transversal</h1>
                    <h4 className="text-black font-black mt-2 uppercase tracking-widest">Transformando la realidad desde el aula</h4>
                    <div className="h-2 w-32 bg-[#AA0F16] mx-auto mt-8"></div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-slate-50 p-12 border-l-[16px] border-[#AA0F16] shadow-2xl space-y-8">
                        <h2 className="text-4xl font-black text-black tracking-tighter uppercase italic leading-none">Cátedra de Paz</h2>
                        <p className="text-xl text-slate-700 leading-relaxed font-medium">
                            Nuestra Cátedra de Paz no es solo una materia; es un compromiso vivo con la convivencia y la justicia social en el barrio.
                        </p>
                    </div>

                    <div className="mt-20 grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-black text-[#AA0F16] uppercase tracking-tighter">Objetivo General</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Formar ciudadanos capaces de resolver conflictos de manera pacífica, promoviendo el respeto mutuo y la construcción de una comunidad más armoniosa.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-2xl font-black text-black uppercase tracking-tighter">Impacto Social</h3>
                            <p className="text-slate-600 leading-relaxed">
                                El proyecto trasciende las paredes del colegio, llevando los valores de la paz y la reconciliación a las familias y al entorno social de nuestros estudiantes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

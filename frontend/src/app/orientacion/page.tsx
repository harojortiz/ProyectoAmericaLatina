'use client';

import React, { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';

export default function OrientacionPage() {
    const [pageData, setPageData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const data = await apiFetch('/pages/public/orientacion');
                setPageData(data);
            } catch (error) {
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
                        <span className="text-black font-black tracking-[0.5em] uppercase text-xs mb-4 block">Acompañamiento</span>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase text-[#AA0F16] m-0">{pageData.title}</h1>
                        <h4 className="text-black font-black mt-2 uppercase tracking-widest">{pageData.description || 'Cuidando el Bienestar Estudiantil'}</h4>
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
                    <span className="text-black font-black tracking-[0.5em] uppercase text-xs mb-4 block">Acompañamiento</span>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase text-[#AA0F16] m-0">Orientación</h1>
                    <h4 className="text-black font-black mt-2 uppercase tracking-widest">Cuidando el bienestar de nuestra comunidad</h4>
                    <div className="h-2 w-32 bg-[#AA0F16] mx-auto mt-8"></div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl text-center space-y-12">
                    <p className="text-3xl font-black italic text-black leading-none">
                        "Un espacio de escucha, apoyo y crecimiento para estudiantes y familias."
                    </p>
                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        <div className="p-10 border-2 border-slate-100 hover:border-[#AA0F16] transition group bg-white shadow-xl">
                            <h3 className="text-2xl font-black text-black uppercase tracking-tighter mb-4 group-hover:text-[#AA0F16]">Apoyo Psicoemocional</h3>
                            <p className="text-slate-600">Brindamos herramientas para el manejo de emociones, resolución de conflictos y fortalecimiento de la salud mental.</p>
                        </div>
                        <div className="p-10 border-2 border-slate-100 hover:border-[#AA0F16] transition group bg-white shadow-xl">
                            <h3 className="text-2xl font-black text-black uppercase tracking-tighter mb-4 group-hover:text-[#AA0F16]">Proyecto de Vida</h3>
                            <p className="text-slate-600">Acompañamos a nuestros jóvenes en la definición de sus metas académicas, profesionales y personales.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

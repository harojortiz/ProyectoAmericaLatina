'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Breadcrumbs from '@/components/Breadcrumbs';
import { API_URL } from '@/lib/api';

interface PastoralPage {
    id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    media: { url: string; type: string }[];
}

export default function PastoralDynamicPage() {
    const { slug } = useParams();
    const { isAuthenticated, user } = useAuth();
    const [pageData, setPageData] = useState<PastoralPage | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const response = await fetch(`${API_URL}/pages/public/${slug}`);
                if (!response.ok) throw new Error('No se pudo cargar la información');
                const data = await response.json();
                setPageData(data);
            } catch (err) {
                setError('Estamos preparando este contenido para ti.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchPage();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#AA0F16]"></div>
            </div>
        );
    }

    if (error || !pageData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
                <h2 className="text-4xl font-black text-[#AA0F16] uppercase italic tracking-tighter mb-4">Próximamente</h2>
                <p className="text-black font-bold max-w-md">{error || 'Esta sección de Pastoral pronto estará disponible con información relevante.'}</p>
                <div className="h-1 w-20 bg-black mt-8"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Breadcrumbs />
            {/* Header Seccional */}
            <section className="bg-white py-24 text-center border-b-8 border-[#AA0F16]">
                <div className="container mx-auto px-4">
                    <span className="text-black font-black tracking-[0.5em] uppercase text-xs mb-4 block">Pastoral Institucional</span>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase text-[#AA0F16] m-0 leading-none">
                        {pageData.title}
                    </h1>
                    <div className="h-2 w-32 bg-black mx-auto mt-8"></div>
                </div>
            </section>

            {/* Contenido Dinámico */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-5xl font-black text-black uppercase italic tracking-tighter m-0 leading-tight">
                                {pageData.description}
                            </h2>
                            <div
                                className="prose prose-lg text-black font-medium leading-relaxed italic"
                                dangerouslySetInnerHTML={{ __html: pageData.content }}
                            />

                            {/* Botón de edición para Administrativos */}
                            {(isAuthenticated && (user?.role === 'DIRECTIVO' || user?.role === 'ADMINISTRATIVO' || user?.role === 'SUPER_ADMIN')) && (
                                <button className="bg-black text-white px-8 py-4 font-black uppercase tracking-widest text-xs hover:bg-[#AA0F16] transition shadow-lg">
                                    Editar Contenido
                                </button>
                            )}
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-4 border-4 border-[#AA0F16] -z-10 transform -rotate-1 group-hover:rotate-0 transition duration-500"></div>
                            {pageData.media && pageData.media.length > 0 ? (
                                <img
                                    src={pageData.media[0].url}
                                    alt={pageData.title}
                                    className="w-full h-[500px] object-cover shadow-2xl grayscale hover:grayscale-0 transition duration-700"
                                />
                            ) : (
                                <div className="w-full h-[500px] bg-slate-100 flex items-center justify-center text-slate-400 font-black italic">
                                    GALERÍA INSTITUCIONAL
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Franja de Reflexión */}
            <section className="bg-black py-24 text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[#AA0F16]/5 transform -skew-y-3 origin-right"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <p className="text-sm font-black uppercase tracking-[0.5em] mb-8 opacity-40">I.E.D América Latina</p>
                    <h3 className="text-4xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-4">
                        &quot;Fe, <span className="text-[#AA0F16]">Alegría</span> <br /> y Servicio&quot;
                    </h3>
                </div>
            </section>

            {/* Footer Branded */}
            <footer className="py-20 bg-white text-center border-t border-slate-100">
                <p className="text-3xl font-black italic text-[#AA0F16] m-0 uppercase tracking-tighter">Corazón de Nuestra Misión</p>
            </footer>
        </div>
    );
}

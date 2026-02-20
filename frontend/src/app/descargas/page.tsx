'use client';

import { useState, useEffect } from 'react';
import { apiFetch, MEDIA_URL } from '@/lib/api';

interface Document {
    id: string;
    title: string;
    description: string | null;
    category: string;
    url: string;
    filename: string;
}

export default function DescargasPage() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('TODO');

    const categories = ['CIRCULAR', 'MANUAL', 'FORMULARIO', 'PROYECTO', 'OTRO'];

    useEffect(() => {
        const loadDocs = async () => {
            try {
                const data = await apiFetch('/documents/public');
                setDocuments(data);
            } catch (error) {
                console.error('Error loading documents', error);
            } finally {
                setLoading(false);
            }
        };
        loadDocs();
    }, []);

    const filteredDocs = selectedCategory === 'TODO'
        ? documents
        : documents.filter(doc => doc.category === selectedCategory);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-slate-900 py-24 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#AA0F16]/10 transform skew-x-12 translate-x-24"></div>
                <div className="container mx-auto max-w-6xl relative z-10 text-center">
                    <h1 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter italic">
                        Centro de <span className="text-[#AA0F16]">Descargas</span>
                    </h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs md:text-sm">
                        Accede a circulares, manuales y formularios oficiales de la I.E.D América Latina
                    </p>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl py-16 px-4">
                {/* Categorías / Filtros */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    <button
                        onClick={() => setSelectedCategory('TODO')}
                        className={`px-8 py-4 font-black uppercase text-[10px] tracking-widest transition-all border-2 ${selectedCategory === 'TODO' ? 'bg-[#AA0F16] border-[#AA0F16] text-white shadow-xl' : 'bg-white border-slate-100 text-slate-400 hover:border-black hover:text-black'}`}
                    >
                        Todos los Documentos
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-8 py-4 font-black uppercase text-[10px] tracking-widest transition-all border-2 ${selectedCategory === cat ? 'bg-[#AA0F16] border-[#AA0F16] text-white shadow-xl' : 'bg-white border-slate-100 text-slate-400 hover:border-black hover:text-black'}`}
                        >
                            {cat}S
                        </button>
                    ))}
                </div>

                {/* Lista de Documentos */}
                {loading ? (
                    <div className="flex flex-col items-center py-20 animate-pulse">
                        <div className="w-12 h-12 border-4 border-[#AA0F16] border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="font-black uppercase text-[10px] tracking-widest text-slate-400">Consultando Archivos Oficiales...</p>
                    </div>
                ) : filteredDocs.length === 0 ? (
                    <div className="text-center py-20 bg-slate-50 border-2 border-dashed border-slate-200">
                        <span className="text-4xl mb-4 block">📁</span>
                        <p className="font-black uppercase text-xs text-slate-400 tracking-widest">No se encontraron documentos en esta categoría.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredDocs.map((doc) => (
                            <div key={doc.id} className="bg-white border-2 border-slate-100 p-8 hover:border-[#AA0F16] transition-all duration-500 group relative">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                                    <span className="text-2xl font-black text-[#AA0F16]">PDF</span>
                                </div>
                                <span className="text-[9px] font-black text-[#AA0F16] uppercase tracking-[0.2em] mb-4 block">{doc.category}</span>
                                <h3 className="text-xl font-black text-black uppercase tracking-tight italic mb-3 leading-tight">{doc.title}</h3>
                                {doc.description && (
                                    <p className="text-xs text-slate-500 font-medium italic mb-6 line-clamp-2">{doc.description}</p>
                                )}
                                <div className="mt-auto">
                                    <a
                                        href={`${MEDIA_URL}${doc.url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-black uppercase text-[10px] tracking-widest hover:bg-[#AA0F16] transition-all shadow-lg group-hover:scale-105"
                                    >
                                        ⬇ Descargar Archivo
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer Info */}
                <div className="mt-24 p-10 bg-slate-50 border-l-8 border-[#AA0F16] flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h4 className="text-lg font-black text-black uppercase tracking-tight italic">¿No encuentras lo que buscas?</h4>
                        <p className="text-sm text-slate-500 font-medium">Contáctanos directamente a la secretaría del colegio para solicitar documentos específicos.</p>
                    </div>
                    <a href="/contacto" className="px-10 py-4 border-2 border-black font-black uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all shrink-0">
                        Atención al Ciudadano
                    </a>
                </div>
            </div>
        </div>
    );
}

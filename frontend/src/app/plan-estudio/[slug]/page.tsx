'use client';

import { useEffect, useState, useCallback, use } from 'react';
import { Area } from '@/types';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';

// Datos mock por si la API falla o está vacía inicialmente
const mockData: Record<string, Partial<Area>> = {
    'castellano': {
        name: 'Lengua Castellana',
        description: 'Fomentamos la expression oral, escrita y el deleite por la literatura clásica y contemporánea.',
        content: 'Nuestra metodología se basa en el análisis crítico de textos, la producción literaria creativa y el fortalecimiento de las competencias comunicativas como ejes fundamentales del desarrollo humano.',
    },
    'matematica': {
        name: 'Matemática',
        description: 'Desarrollamos el razonamiento lógico-matemático para la resolución de problemas en la vida cotidiana.',
        content: 'Desde el cálculo hasta la geometría, buscamos que el estudiante comprenda los lenguajes numéricos como herramientas de transformación y análisis del entorno.',
    }
};

export default function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [area, setArea] = useState<Area | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const data = await apiFetch(`/areas/public/${slug}`);
            setArea(data);
        } catch (error) {
            console.error('Error fetching area', error);
            // Usar mock si no hay datos en DB
            if (mockData[slug]) {
                setArea({
                    id: 'mock',
                    name: mockData[slug].name || slug,
                    slug,
                    description: mockData[slug].description || '',
                    content: mockData[slug].content || '',
                    media: [
                        { id: '1', url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2070&auto=format&fit=crop', type: 'image/jpeg', filename: 'study.jpg' },
                        { id: '2', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop', type: 'image/jpeg', filename: 'learning.jpg' }
                    ],
                    createdAt: new Date().toISOString()
                });
            }
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const nextSlide = useCallback(() => {
        if (area?.media && area.media.length > 1) {
            setCurrentSlide((prev) => (prev + 1) % area.media.length);
        }
    }, [area?.media]);

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-16 h-16 border-4 border-[#AA0F16] border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!area) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
            <h2 className="text-4xl font-black text-[#AA0F16] uppercase italic tracking-tighter mb-4">Área no encontrada</h2>
            <Link href="/" className="text-black font-black uppercase text-xs border-b-2 border-black pb-1">Volver al inicio</Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section con Carrusel */}
            <section className="relative h-[500px] w-full bg-slate-100 overflow-hidden">
                {area.media && area.media.length > 0 ? (
                    area.media.map((item, index) => (
                        <div
                            key={item.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <div className="absolute inset-0 bg-black/40 z-10"></div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.url} alt={area.name} className="w-full h-full object-cover" />
                        </div>
                    ))
                ) : (
                    <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                        <p className="text-slate-400 font-black uppercase tracking-widest italic">Sin imágenes institucionales</p>
                    </div>
                )}

                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                    <span className="bg-[#AA0F16] text-white text-xs font-black px-6 py-2 tracking-[0.4em] uppercase mb-6 shadow-2xl">Plan de Estudio</span>
                    <h1 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter m-0 drop-shadow-2xl">
                        {area.name}
                    </h1>
                    <div className="h-2 w-32 bg-white mt-8 shadow-2xl"></div>
                </div>
            </section>

            {/* Contenido del Área */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid md:grid-cols-3 gap-16">

                        {/* Sidebar con Info Rápida */}
                        <div className="md:col-span-1 space-y-10">
                            <div className="bg-white border-2 border-black p-8 shadow-[-10px_10px_0px_0px_#AA0F16]">
                                <h4 className="text-black font-black uppercase tracking-widest text-xs mb-6">Líder de Área</h4>
                                <p className="text-2xl font-black text-[#AA0F16] uppercase tracking-tighter italic m-0">
                                    {area.leader?.fullName || 'Por Asignar'}
                                </p>
                                <div className="mt-8 pt-8 border-t border-slate-100">
                                    <p className="text-[10px] font-black text-black opacity-30 uppercase tracking-[0.3em] mb-2">Estado del Área</p>
                                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest">Activo 2025</span>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-8 border-l-8 border-black">
                                <h4 className="text-black font-black uppercase tracking-widest text-xs mb-4">Recursos Académicos</h4>
                                <ul className="space-y-4">
                                    {['Guías Pedagógicas', 'Plan de Área', 'Cronograma', 'Material de APOYO'].map(item => (
                                        <li key={item} className="flex items-center gap-2 group cursor-pointer">
                                            <span className="text-[#AA0F16] font-black">&rarr;</span>
                                            <span className="text-xs font-black text-black group-hover:text-[#AA0F16] transition uppercase">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Contenido Principal */}
                        <div className="md:col-span-2 space-y-12">
                            <div>
                                <h2 className="text-3xl font-black text-[#AA0F16] uppercase italic tracking-tighter mb-6 m-0">Descripción del Área</h2>
                                <p className="text-2xl font-black text-black leading-tight mb-8 drop-shadow-sm">
                                    {area.description}
                                </p>
                                <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed font-medium">
                                    {area.content ? (
                                        <div dangerouslySetInnerHTML={{ __html: area.content }} />
                                    ) : (
                                        <p>Contenido detallado en preparación por el equipo docente. Próximamente encontrarás aquí los objetivos de aprendizaje, metodologías y proyectos transversales vinculados a esta materia.</p>
                                    )}
                                </div>
                            </div>

                            {/* Sección Interactiva Mock */}
                            <div className="grid grid-cols-2 gap-4 pt-12">
                                <div className="bg-[#AA0F16] p-10 text-white flex flex-col justify-center hover:scale-105 transition duration-500">
                                    <p className="text-5xl font-black italic m-0">100%</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest mt-2 opacity-80">Compromiso Educativo</p>
                                </div>
                                <div className="bg-black p-10 text-white flex flex-col justify-center hover:scale-105 transition duration-500">
                                    <p className="text-5xl font-black italic m-0">OBJ</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest mt-2 opacity-80">Excelencia Integral</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer / Otras Áreas */}
            <section className="bg-slate-50 py-24 border-t border-slate-200">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-black font-black uppercase tracking-widest text-sm mb-12 opacity-40 italic">Otras Áreas Académicas</h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        {['Castellano', 'Matematica', 'Ciencias Sociales', 'Ingles'].filter(n => n.toLowerCase() !== slug).map(name => (
                            <Link
                                key={name}
                                href={`/plan-estudio/${name.toLowerCase().replace(' ', '-')}`}
                                className="px-8 py-3 border-2 border-slate-200 text-slate-400 font-black hover:border-[#AA0F16] hover:text-[#AA0F16] transition uppercase tracking-widest text-[10px]"
                            >
                                {name}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

'use client';

import Link from 'next/link';

export default function NosotrosPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-white py-24 text-center border-b-8 border-[#AA0F16]">
                <div className="container mx-auto px-4">
                    <span className="text-black font-black tracking-[0.5em] uppercase text-xs mb-4 block">
                        Conoce Nuestra Institución
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase text-[#AA0F16] m-0 leading-none">
                        Nosotros
                    </h1>
                    <h4 className="text-black font-black mt-4 uppercase tracking-widest text-sm">
                        Fe y Alegría - Educación de Calidad
                    </h4>
                    <div className="h-2 w-32 bg-black mx-auto mt-8"></div>
                </div>
            </section>

            {/* Introducción */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <p className="text-2xl text-black font-bold leading-relaxed italic">
                        Somos una institución educativa comprometida con la formación integral de nuestros estudiantes,
                        guiados por los valores cristianos y el espíritu de Fe y Alegría.
                    </p>
                </div>
            </section>

            {/* Secciones de Nosotros */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Historia */}
                        <Link
                            href="/nosotros/historia"
                            className="group bg-white border-2 border-slate-200 p-12 hover:border-[#AA0F16] hover:bg-[#AA0F16] transition-all duration-500 no-underline"
                        >
                            <div className="flex items-start gap-6">
                                <span className="text-6xl group-hover:scale-110 transition-transform">📖</span>
                                <div className="flex-1">
                                    <h3 className="text-3xl font-black text-[#AA0F16] group-hover:text-white uppercase tracking-tighter mb-4 transition-colors">
                                        Historia
                                    </h3>
                                    <p className="text-black group-hover:text-white/90 font-medium leading-relaxed transition-colors">
                                        Conoce nuestros orígenes, trayectoria y el camino recorrido desde nuestra fundación
                                        hasta convertirnos en un referente educativo de la comunidad.
                                    </p>
                                    <div className="mt-6 flex items-center gap-2 text-black group-hover:text-white font-black text-sm uppercase tracking-widest transition-colors">
                                        Leer más <span className="text-xl">→</span>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Misión y Visión */}
                        <Link
                            href="/nosotros/mision-vision"
                            className="group bg-white border-2 border-slate-200 p-12 hover:border-[#AA0F16] hover:bg-[#AA0F16] transition-all duration-500 no-underline"
                        >
                            <div className="flex items-start gap-6">
                                <span className="text-6xl group-hover:scale-110 transition-transform">🎯</span>
                                <div className="flex-1">
                                    <h3 className="text-3xl font-black text-[#AA0F16] group-hover:text-white uppercase tracking-tighter mb-4 transition-colors">
                                        Misión y Visión
                                    </h3>
                                    <p className="text-black group-hover:text-white/90 font-medium leading-relaxed transition-colors">
                                        Descubre nuestro propósito institucional, los valores que nos guían y hacia dónde
                                        nos proyectamos como comunidad educativa.
                                    </p>
                                    <div className="mt-6 flex items-center gap-2 text-black group-hover:text-white font-black text-sm uppercase tracking-widest transition-colors">
                                        Leer más <span className="text-xl">→</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section - Ahora con Color Institucional y más calidez */}
            <section className="bg-[#AA0F16] py-24 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <img src="https://images.unsplash.com/photo-1523050335392-9ae844963131?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="pattern" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-6 uppercase line-height-none">
                        "Educación Popular Integral <br /> y de Calidad"
                    </h3>
                    <div className="h-1 w-20 bg-white mx-auto mb-6"></div>
                    <p className="text-white/80 font-black uppercase tracking-[0.4em] text-[10px]">
                        I.E.D América Latina - Fe y Alegría
                    </p>
                </div>
            </section>
        </div>
    );
}

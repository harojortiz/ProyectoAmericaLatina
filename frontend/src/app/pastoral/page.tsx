'use client';

import Link from 'next/link';

export default function PastoralPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-white py-24 text-center border-b-8 border-[#AA0F16]">
                <div className="container mx-auto px-4">
                    <span className="text-black font-black tracking-[0.5em] uppercase text-xs mb-4 block">
                        Dimensión Espiritual
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase text-[#AA0F16] m-0 leading-none">
                        Pastoral
                    </h1>
                    <h4 className="text-black font-black mt-4 uppercase tracking-widest text-sm">
                        Fe, Alegría y Servicio
                    </h4>
                    <div className="h-2 w-32 bg-black mx-auto mt-8"></div>
                </div>
            </section>

            {/* Introducción */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <p className="text-2xl text-black font-bold leading-relaxed italic">
                        La pastoral es el corazón de nuestra misión evangelizadora y educativa,
                        acompañando a la comunidad en su crecimiento espiritual y compromiso social.
                    </p>
                </div>
            </section>

            {/* Secciones de Pastoral */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-10">
                        {/* Comisión de la Verdad */}
                        <Link
                            href="/pastoral/comision-verdad"
                            className="group bg-white border-2 border-slate-200 p-10 hover:border-[#AA0F16] hover:bg-[#AA0F16] transition-all duration-500 hover:-translate-y-2 no-underline"
                        >
                            <div className="text-center">
                                <span className="text-6xl mb-6 block group-hover:scale-110 transition-transform">⚖️</span>
                                <h3 className="text-2xl font-black text-[#AA0F16] group-hover:text-white uppercase tracking-tighter mb-4 transition-colors">
                                    Comisión de la Verdad
                                </h3>
                                <p className="text-black group-hover:text-white/90 font-medium text-sm leading-relaxed transition-colors">
                                    Memoria, justicia y reparación desde la fe y la esperanza.
                                </p>
                                <div className="mt-6 flex items-center justify-center gap-2 text-black group-hover:text-white font-black text-xs uppercase tracking-widest transition-colors">
                                    Conocer más <span className="text-lg">→</span>
                                </div>
                            </div>
                        </Link>

                        {/* Orientación Escolar */}
                        <Link
                            href="/pastoral/pastoral-orientacion"
                            className="group bg-white border-2 border-slate-200 p-10 hover:border-[#AA0F16] hover:bg-[#AA0F16] transition-all duration-500 hover:-translate-y-2 no-underline"
                        >
                            <div className="text-center">
                                <span className="text-6xl mb-6 block group-hover:scale-110 transition-transform">🤝</span>
                                <h3 className="text-2xl font-black text-[#AA0F16] group-hover:text-white uppercase tracking-tighter mb-4 transition-colors">
                                    Orientación Escolar
                                </h3>
                                <p className="text-black group-hover:text-white/90 font-medium text-sm leading-relaxed transition-colors">
                                    Acompañamiento integral para el bienestar emocional y espiritual.
                                </p>
                                <div className="mt-6 flex items-center justify-center gap-2 text-black group-hover:text-white font-black text-xs uppercase tracking-widest transition-colors">
                                    Conocer más <span className="text-lg">→</span>
                                </div>
                            </div>
                        </Link>

                        {/* Pastoral General */}
                        <Link
                            href="/pastoral/pastoral-general"
                            className="group bg-white border-2 border-slate-200 p-10 hover:border-[#AA0F16] hover:bg-[#AA0F16] transition-all duration-500 hover:-translate-y-2 no-underline"
                        >
                            <div className="text-center">
                                <span className="text-6xl mb-6 block group-hover:scale-110 transition-transform">🕊️</span>
                                <h3 className="text-2xl font-black text-[#AA0F16] group-hover:text-white uppercase tracking-tighter mb-4 transition-colors">
                                    Pastoral General
                                </h3>
                                <p className="text-black group-hover:text-white/90 font-medium text-sm leading-relaxed transition-colors">
                                    El corazón de nuestra misión evangelizadora y educativa.
                                </p>
                                <div className="mt-6 flex items-center justify-center gap-2 text-black group-hover:text-white font-black text-xs uppercase tracking-widest transition-colors">
                                    Conocer más <span className="text-lg">→</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-black py-20 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-6">
                        &quot;Fe, Alegría y Servicio&quot;
                    </h3>
                    <p className="text-white/80 font-bold uppercase tracking-widest text-xs">
                        Pastoral Institucional - I.E.D América Latina
                    </p>
                </div>
            </section>
        </div>
    );
}

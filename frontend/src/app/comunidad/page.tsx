'use client';

import Link from 'next/link';

export default function ComunidadPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-white py-24 text-center border-b-8 border-[#AA0F16]">
                <div className="container mx-auto px-4">
                    <span className="text-black font-black tracking-[0.5em] uppercase text-xs mb-4 block">
                        Nuestro Equipo
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase text-[#AA0F16] m-0 leading-none">
                        Comunidad Educativa
                    </h1>
                    <h4 className="text-black font-black mt-4 uppercase tracking-widest text-sm">
                        Juntos Construimos Futuro
                    </h4>
                    <div className="h-2 w-32 bg-black mx-auto mt-8"></div>
                </div>
            </section>

            {/* Introducción */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <p className="text-2xl text-black font-bold leading-relaxed italic">
                        Nuestra comunidad educativa está conformada por un equipo humano comprometido,
                        estudiantes motivados y familias que creen en la educación como motor de transformación social.
                    </p>
                </div>
            </section>

            {/* Secciones */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Equipo Humano */}
                        <Link
                            href="/comunidad/equipo"
                            className="group bg-white border-2 border-slate-200 p-12 hover:border-[#AA0F16] hover:bg-[#AA0F16] transition-all duration-500 no-underline"
                        >
                            <div className="flex items-start gap-6">
                                <span className="text-6xl group-hover:scale-110 transition-transform">👥</span>
                                <div className="flex-1">
                                    <h3 className="text-3xl font-black text-[#AA0F16] group-hover:text-white uppercase tracking-tighter mb-4 transition-colors">
                                        Equipo Humano
                                    </h3>
                                    <p className="text-black group-hover:text-white/90 font-medium leading-relaxed transition-colors">
                                        Conoce a nuestro equipo directivo, cuerpo docente y personal administrativo.
                                        Profesionales comprometidos con la excelencia educativa.
                                    </p>
                                    <div className="mt-6 flex items-center gap-2 text-black group-hover:text-white font-black text-sm uppercase tracking-widest transition-colors">
                                        Ver equipo <span className="text-xl">→</span>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Grados */}
                        <Link
                            href="/comunidad/grados"
                            className="group bg-white border-2 border-slate-200 p-12 hover:border-[#AA0F16] hover:bg-[#AA0F16] transition-all duration-500 no-underline"
                        >
                            <div className="flex items-start gap-6">
                                <span className="text-6xl group-hover:scale-110 transition-transform">🎓</span>
                                <div className="flex-1">
                                    <h3 className="text-3xl font-black text-[#AA0F16] group-hover:text-white uppercase tracking-tighter mb-4 transition-colors">
                                        Grados
                                    </h3>
                                    <p className="text-black group-hover:text-white/90 font-medium leading-relaxed transition-colors">
                                        Organización académica por niveles: Transición, Primaria, Secundaria y Media.
                                        Conoce a los directores de grupo de cada nivel.
                                    </p>
                                    <div className="mt-6 flex items-center gap-2 text-black group-hover:text-white font-black text-sm uppercase tracking-widest transition-colors">
                                        Ver grados <span className="text-xl">→</span>
                                    </div>
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
                        "Educamos con el Corazón"
                    </h3>
                    <p className="text-white/80 font-bold uppercase tracking-widest text-xs">
                        Equipo IDEAL - I.E.D América Latina
                    </p>
                </div>
            </section>
        </div>
    );
}

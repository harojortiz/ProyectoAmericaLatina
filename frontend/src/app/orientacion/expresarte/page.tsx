'use client';

import React from 'react';

export default function ExpresartePage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header Seccional */}
            <section className="bg-white py-24 text-center border-b-8 border-[#AA0F16]">
                <div className="container mx-auto px-4">
                    <span className="text-black font-black tracking-[0.5em] uppercase text-xs mb-4 block">Orientación Escolar</span>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase text-[#AA0F16] m-0">Eje Expresarte</h1>
                    <h4 className="text-black font-black mt-2 uppercase tracking-widest text-sm">El arte de ser y sentir</h4>
                    <div className="h-2 w-32 bg-[#AA0F16] mx-auto mt-8"></div>
                </div>
            </section>

            {/* Contenido Principal */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-6xl font-black text-[#AA0F16] uppercase italic tracking-tighter m-0 leading-none">Desarrollo <br /> Socioemocional</h2>
                            <p className="text-xl font-bold text-black leading-relaxed italic">
                                &quot;Expresarte&quot; es un espacio diseñado para que nuestros estudiantes exploren sus emociones a través del arte, la música y la palabra. Creemos que una educación integral comienza con el autoconocimiento.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <span className="bg-[#AA0F16] text-white p-2 font-black text-xs">01</span>
                                    <p className="text-black font-medium">Talleres de inteligencia emocional y resiliencia.</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <span className="bg-black text-white p-2 font-black text-xs">02</span>
                                    <p className="text-black font-medium">Expresión artística como canal de comunicación.</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <span className="bg-[#AA0F16] text-white p-2 font-black text-xs">03</span>
                                    <p className="text-black font-medium">Fortalecimiento de la convivencia escolar.</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-[#AA0F16] -z-10 transform rotate-2 group-hover:rotate-0 transition duration-500"></div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop"
                                alt="Arte y Expresión"
                                className="w-full h-[500px] object-cover grayscale group-hover:grayscale-0 transition duration-700 shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Franja de Valor */}
            <section className="bg-black py-20 text-white">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm font-black uppercase tracking-[0.5em] mb-8 opacity-60">Filosofía Institucional</p>
                    <h3 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-12">
                        &quot;Donde las palabras fallan, <br /> <span className="text-[#AA0F16]">el arte habla</span>&quot;
                    </h3>
                    <div className="h-1 w-24 bg-[#AA0F16] mx-auto"></div>
                </div>
            </section>

            {/* Secciones de Trabajo */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="border-t-8 border-[#AA0F16] p-10 shadow-xl hover:-translate-y-4 transition duration-500">
                            <h4 className="text-2xl font-black text-black uppercase mb-4 tracking-tighter italic">Creatividad</h4>
                            <p className="text-slate-600 font-medium">Fomentamos el pensamiento divergente para encontrar soluciones innovadoras a los retos de la vida.</p>
                        </div>
                        <div className="border-t-8 border-black p-10 shadow-xl hover:-translate-y-4 transition duration-500">
                            <h4 className="text-2xl font-black text-[#AA0F16] uppercase mb-4 tracking-tighter italic">Empatía</h4>
                            <p className="text-slate-600 font-medium">A través del teatro y la pintura aprendemos a ponernos en el lugar del otro.</p>
                        </div>
                        <div className="border-t-8 border-[#AA0F16] p-10 shadow-xl hover:-translate-y-4 transition duration-500">
                            <h4 className="text-2xl font-black text-black uppercase mb-4 tracking-tighter italic">Liderazgo</h4>
                            <p className="text-slate-600 font-medium">Expresarse con seguridad es el primer paso para liderar con propósito en la comunidad.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Referencia a Video */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl font-black text-[#AA0F16] uppercase italic tracking-tighter mb-8 italic">Material Educativo</h2>
                    <div className="aspect-video bg-black flex items-center justify-center relative shadow-2xl overflow-hidden">
                        <video className="absolute inset-0 w-full h-full object-cover opacity-60" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop" />
                        <div className="z-10 text-center">
                            <div className="w-20 h-20 bg-[#AA0F16] rounded-full mx-auto flex items-center justify-center cursor-pointer hover:scale-110 transition">
                                <span className="text-white text-3xl">▶</span>
                            </div>
                            <p className="text-white font-black uppercase tracking-widest text-xs mt-6">Ver cápsula: El poder de la expresión</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Branding */}
            <footer className="py-20 bg-white text-center border-t border-slate-100">
                <p className="text-3xl font-black italic text-[#AA0F16] m-0 uppercase tracking-tighter">I.E.D América Latina</p>
                <p className="text-black font-black uppercase tracking-[0.5em] text-[10px] mt-2 opacity-40">#EducamosParaLaLibertad</p>
            </footer>
        </div>
    );
}

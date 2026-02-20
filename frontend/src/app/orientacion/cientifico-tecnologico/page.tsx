'use client';

import React from 'react';

export default function CientificoTecnologicoPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header Seccional */}
            <section className="bg-white py-24 text-center border-b-8 border-black">
                <div className="container mx-auto px-4">
                    <span className="text-black font-black tracking-[0.5em] uppercase text-xs mb-4 block">Orientación Escolar</span>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase text-black m-0"><span className="text-[#AA0F16]">Eje</span> Científico</h1>
                    <h4 className="text-black font-black mt-2 uppercase tracking-widest text-sm">Tecnología al servicio de la vida</h4>
                    <div className="h-2 w-32 bg-[#AA0F16] mx-auto mt-8"></div>
                </div>
            </section>

            {/* Contenido Principal */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <div className="order-2 md:order-1 relative">
                            <div className="absolute top-0 right-0 w-full h-full border-2 border-black -m-6 -z-10 bg-slate-50"></div>
                            <img
                                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
                                alt="Tecnología y Ciencia"
                                className="w-full h-[600px] object-cover shadow-2xl grayscale hover:grayscale-0 transition duration-1000"
                            />
                        </div>

                        <div className="order-1 md:order-2 space-y-10">
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-6xl font-black text-black uppercase italic tracking-tighter m-0 leading-none">Vocación <br /> <span className="text-[#AA0F16]">Técnica</span></h2>
                                <div className="h-1 w-20 bg-[#AA0F16]"></div>
                            </div>

                            <p className="text-xl font-bold text-black leading-tight italic">
                                El eje "Científico Tecnológico" de nuestra orientación escolar busca despertar la curiosidad investigativa y el uso ético de las herramientas digitales para transformar el entorno.
                            </p>

                            <div className="grid gap-6">
                                <div className="p-8 bg-slate-900 text-white hover:bg-[#AA0F16] transition duration-300">
                                    <h4 className="font-black uppercase tracking-widest text-xs mb-2 text-[#AA0F16] group-hover:text-white">Investigación</h4>
                                    <p className="text-sm opacity-80 font-medium">Promovemos el método científico para encontrar respuestas a las necesidades locales.</p>
                                </div>
                                <div className="p-8 border-2 border-black hover:border-[#AA0F16] transition duration-300">
                                    <h4 className="font-black uppercase tracking-widest text-xs mb-2">Ética Digital</h4>
                                    <p className="text-sm font-medium">Orientamos sobre el uso responsable, seguro y humano de la tecnología y redes sociales.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Panel de Enfoque */}
            <section className="bg-[#AA0F16] py-24 text-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-12 text-center">
                        <div className="space-y-4">
                            <p className="text-5xl font-black italic m-0">BIO</p>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Sostenibilidad</p>
                        </div>
                        <div className="space-y-4">
                            <p className="text-5xl font-black italic m-0">TEC</p>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Innovación</p>
                        </div>
                        <div className="space-y-4">
                            <p className="text-5xl font-black italic m-0">LOG</p>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Razonamiento</p>
                        </div>
                        <div className="space-y-4">
                            <p className="text-5xl font-black italic m-0">HUM</p>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Propósito</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Referencia a Segmentos Educativos */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="mb-20 text-center">
                        <h2 className="text-4xl font-black text-black uppercase italic tracking-tighter m-0">Nuestros Segmentos</h2>
                        <p className="text-black font-black uppercase tracking-[0.4em] text-[10px] mt-4 opacity-40">Horizontes de Aprendizaje</p>
                    </div>

                    <div className="space-y-12">
                        <div className="flex flex-col md:flex-row gap-12 items-center border-b border-slate-100 pb-12">
                            <div className="w-full md:w-1/3 text-6xl font-black text-slate-100 italic">SEC 01</div>
                            <div className="w-full md:w-2/3">
                                <h4 className="text-2xl font-black text-[#AA0F16] uppercase italic tracking-tight mb-4">Cápsulas de Saber Tecnológico</h4>
                                <p className="text-slate-600 font-medium leading-relaxed">Breves introducciones a las tendencias mundiales: IA, Robótica y Energías Limpias, acompañadas de guías para su aplicación en proyectos institucionales.</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-12 items-center border-b border-slate-100 pb-12">
                            <div className="w-full md:w-1/3 text-6xl font-black text-slate-100 italic">SEC 02</div>
                            <div className="w-full md:w-2/3">
                                <h4 className="text-2xl font-black text-black uppercase italic tracking-tight mb-4">Laboratorios de Ideas</h4>
                                <p className="text-slate-600 font-medium leading-relaxed">Espacios de experimentación donde la teoría se convierte en práctica tangible, reforzando la vocación técnica de los estudiantes de grado superior.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Branding */}
            <section className="py-20 bg-slate-50 text-center">
                <p className="text-4xl font-black italic text-[#AA0F16] m-0 uppercase tracking-tighter">I.E.D América Latina</p>
                <p className="text-black font-black uppercase tracking-[0.5em] text-[10px] mt-2 opacity-40">Hacia la excelencia científica</p>
            </section>
        </div>
    );
}

'use client';

import FAQ from '@/components/FAQ';
import Link from 'next/link';

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="bg-white py-24 text-center border-b-8 border-[#AA0F16]">
                <div className="container mx-auto px-4">
                    <span className="text-black font-black tracking-[0.5em] uppercase text-xs mb-4 block">
                        Centro de Ayuda
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase text-[#AA0F16] m-0 leading-none">
                        Preguntas
                    </h1>
                    <h4 className="text-black font-black mt-4 uppercase tracking-widest text-sm">
                        Resolvemos tus dudas
                    </h4>
                    <div className="h-2 w-32 bg-black mx-auto mt-8"></div>
                </div>
            </section>

            {/* FAQ Content Section */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <FAQ />

                    {/* Contact Fallback */}
                    <div className="max-w-3xl mx-auto mt-16 text-center bg-[#AA0F16] text-white p-10 rounded-2xl shadow-xl">
                        <h3 className="text-2xl font-black italic mb-4">¿No encontraste tu respuesta?</h3>
                        <p className="mb-8 font-medium text-white/90">
                            Nuestro equipo administrativo está listo para atenderte personalmente.
                            No dudes en escribirnos.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contacto"
                                className="bg-white text-[#AA0F16] px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-all transform hover:-translate-y-1"
                            >
                                Contáctanos
                            </Link>
                            <a
                                href="https://wa.me/573204518938"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-black text-white px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                            >
                                <span>WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

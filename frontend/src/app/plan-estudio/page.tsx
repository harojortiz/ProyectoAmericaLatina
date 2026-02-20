'use client';

import Link from 'next/link';

export default function PlanEstudioPage() {
    const areas = [
        { name: 'Castellano', slug: 'castellano', icon: '📝', description: 'Lengua, literatura y comunicación' },
        { name: 'Matemática', slug: 'matematica', icon: '🔢', description: 'Pensamiento lógico y resolución de problemas' },
        { name: 'Ciencias Sociales', slug: 'ciencias-sociales', icon: '🌍', description: 'Historia, geografía y ciudadanía' },
        { name: 'Ciencias Naturales', slug: 'ciencias-naturales', icon: '🔬', description: 'Biología, física y química' },
        { name: 'Inglés', slug: 'ingles', icon: '🌐', description: 'Lengua extranjera y comunicación global' },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-white py-24 text-center border-b-8 border-[#AA0F16]">
                <div className="container mx-auto px-4">
                    <span className="text-black font-black tracking-[0.5em] uppercase text-xs mb-4 block">
                        Excelencia Académica
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase text-[#AA0F16] m-0 leading-none">
                        Plan de Estudio
                    </h1>
                    <h4 className="text-black font-black mt-4 uppercase tracking-widest text-sm">
                        Formación Integral y de Calidad
                    </h4>
                    <div className="h-2 w-32 bg-black mx-auto mt-8"></div>
                </div>
            </section>

            {/* Introducción */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <p className="text-2xl text-black font-bold leading-relaxed italic">
                        Nuestro plan de estudios está diseñado para desarrollar competencias integrales en nuestros estudiantes,
                        preparándolos para los desafíos del siglo XXI.
                    </p>
                </div>
            </section>

            {/* Áreas Académicas */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {areas.map((area) => (
                            <Link
                                key={area.slug}
                                href={`/plan-estudio/${area.slug}`}
                                className="group bg-white border-2 border-slate-200 p-10 hover:border-[#AA0F16] hover:bg-[#AA0F16] transition-all duration-500 hover:-translate-y-2 no-underline"
                            >
                                <div className="text-center">
                                    <span className="text-6xl mb-6 block group-hover:scale-110 transition-transform">
                                        {area.icon}
                                    </span>
                                    <h3 className="text-2xl font-black text-[#AA0F16] group-hover:text-white uppercase tracking-tighter mb-3 transition-colors">
                                        {area.name}
                                    </h3>
                                    <p className="text-black group-hover:text-white/90 font-medium text-sm leading-relaxed transition-colors">
                                        {area.description}
                                    </p>
                                    <div className="mt-6 flex items-center justify-center gap-2 text-black group-hover:text-white font-black text-xs uppercase tracking-widest transition-colors">
                                        Ver área <span className="text-lg">→</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-black py-20 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-6">
                        &quot;Educación que Transforma Vidas&quot;
                    </h3>
                    <p className="text-white/80 font-bold uppercase tracking-widest text-xs">
                        Plan de Estudio - I.E.D América Latina
                    </p>
                </div>
            </section>
        </div>
    );
}

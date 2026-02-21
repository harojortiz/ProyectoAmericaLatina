'use client';

import { useState } from 'react';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

export default function AdmisionesPage() {
    const [formData, setFormData] = useState({
        studentName: '',
        parentName: '',
        grade: 'TRANSICIÓN',
        phone: '',
        email: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await apiFetch('/public/admissions', {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            setStatus('success');
            setFormData({ studentName: '', parentName: '', grade: 'TRANSICIÓN', phone: '', email: '' });
        } catch (error) {
            console.error('Error submitting application', error);
            setStatus('error');
        }
    };

    const grades = ['TRANSICIÓN', 'PRIMERO', 'SEGUNDO', 'TERCERO', 'CUARTO', 'QUINTO', 'SEXTO', 'SÉPTIMO', 'OCTAVO', 'NOVENO', 'DÉCIMO', 'ONCE'];

    const steps = [
        {
            number: '01',
            title: 'Inscripción Inicial',
            description: 'Diligencia el formulario de pre-inscripción en línea o acércate a nuestra secretaría académica para iniciar el proceso.',
            icon: '📝'
        },
        {
            number: '02',
            title: 'Entrega de Documentos',
            description: 'Presenta la documentación requerida (registro civil, certificados de años anteriores y paz y salvo del colegio anterior).',
            icon: '📂'
        },
        {
            number: '03',
            title: 'Entrevista y Valoración',
            description: 'Participa en un encuentro con nuestro equipo de orientación para conocernos mejor y validar el perfil del estudiante.',
            icon: '🤝'
        },
        {
            number: '04',
            title: 'Matrícula Financiera',
            description: 'Realiza el pago de matrícula y costos educativos correspondientes al año lectivo.',
            icon: '💳'
        },
        {
            number: '05',
            title: 'Formalización de Matrícula',
            description: 'Firma el contrato de prestación de servicios educativos y el acta de compromiso con el manual de convivencia.',
            icon: '🖋️'
        }
    ];

    return (
        <div className="min-h-screen bg-white">

            {/* Hero Section Admisiones */}
            <section className="bg-white py-24 text-center">
                <div className="container mx-auto px-4">
                    <span className="text-black font-black tracking-[0.5em] uppercase text-xs mb-4 block">Año Lectivo 2026</span>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase text-[#AA0F16] m-0">Proceso de <br /> Admisiones</h1>
                    <h4 className="text-black font-black mt-4 uppercase tracking-widest text-sm">Formamos líderes transformadores para un mundo mejor</h4>
                    <div className="h-2 w-32 bg-[#AA0F16] mx-auto mt-12"></div>
                </div>
            </section>

            {/* Formulario de Pre-inscripción */}
            <section id="inscripcion" className="py-24 bg-black text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#AA0F16]"></div>
                <div className="container mx-auto px-4 max-w-4xl relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-[#AA0F16] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Cupos Limitados</span>
                        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter m-0 leading-none underline decoration-[#AA0F16] decoration-8 underline-offset-8">Pre-Inscripción <br /> <span className="text-[#AA0F16]">En Línea</span></h2>
                        <p className="mt-12 text-slate-400 font-bold uppercase text-xs tracking-widest max-w-xl mx-auto italic">Inicia el proceso de formación de tu hijo(a) hoy mismo completando este registro básico.</p>
                    </div>

                    {status === 'success' ? (
                        <div className="bg-white/5 border-2 border-[#AA0F16] p-12 text-center animate-fade-in">
                            <div className="text-6xl mb-6">🎓</div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-4">Solicitud Recibida</h3>
                            <p className="text-slate-400 font-medium italic text-lg pr-4">Nuestro equipo de admisiones revisará la información y se pondrá en contacto contigo a través del teléfono proporcionado.</p>
                            <button onClick={() => setStatus('idle')} className="mt-10 px-12 py-4 bg-[#AA0F16] text-white font-black uppercase text-xs tracking-[0.3em] hover:bg-white hover:text-black transition-all">Registrar otro Aspirante</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#AA0F16]">Nombre del Estudiante</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="EJ: CARLOS RIVERA"
                                    value={formData.studentName}
                                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                                    className="w-full px-6 py-5 bg-white/5 border-2 border-white/10 outline-none focus:border-[#AA0F16] transition-colors font-black text-white uppercase tracking-widest text-xs"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#AA0F16]">Nombre del Acudiente</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="EJ: ANA MORALES"
                                    value={formData.parentName}
                                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                                    className="w-full px-6 py-5 bg-white/5 border-2 border-white/10 outline-none focus:border-[#AA0F16] transition-colors font-black text-white uppercase tracking-widest text-xs"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#AA0F16]">Grado de Interés</label>
                                <select
                                    value={formData.grade}
                                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                    className="w-full px-6 py-5 bg-white/5 border-2 border-white/10 outline-none focus:border-[#AA0F16] transition-colors font-black text-white uppercase tracking-widest text-xs cursor-pointer appearance-none"
                                >
                                    {grades.map(g => <option key={g} value={g} className="bg-black">{g}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#AA0F16]">Teléfono de Contacto</label>
                                <input
                                    required
                                    type="tel"
                                    placeholder="EJ: 300 000 0000"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-6 py-5 bg-white/5 border-2 border-white/10 outline-none focus:border-[#AA0F16] transition-colors font-black text-white tracking-widest text-xs"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#AA0F16]">Correo Electrónico</label>
                                <input
                                    required
                                    type="email"
                                    placeholder="USUARIO@EMAIL.COM"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-6 py-5 bg-white/5 border-2 border-white/10 outline-none focus:border-[#AA0F16] transition-colors font-black text-white uppercase tracking-widest text-xs"
                                />
                            </div>
                            <div className="md:col-span-2 mt-4">
                                {status === 'error' && (
                                    <p className="text-[#AA0F16] text-[10px] font-black uppercase tracking-widest italic mb-4">⚠ Error al procesar la solicitud. Por favor intenta de nuevo.</p>
                                )}
                                <button
                                    disabled={status === 'loading'}
                                    type="submit"
                                    className="w-full py-6 bg-[#AA0F16] text-white font-black uppercase tracking-[0.5em] text-xs hover:bg-white hover:text-black transition-all shadow-[0_0_50px_rgba(170,15,22,0.3)] disabled:opacity-50"
                                >
                                    {status === 'loading' ? 'ENVIANDO SOLICITUD...' : 'CONFIRMAR PRE-INSCRIPCIÓN'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </section>

            {/* Requisitos Destacados */}
            <section className="py-24 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-black text-black uppercase italic tracking-tighter m-0 leading-none">¿Por qué elegir <br /> <span className="text-[#AA0F16]">nuestra institución?</span></h2>
                            <p className="text-xl font-medium text-slate-600 leading-relaxed italic">
                                En I.E.D América Latina - Fe y Alegría, ofrecemos más que educación: brindamos un proyecto de vida basado en la excelencia humana y académica.
                            </p>
                            <ul className="space-y-4">
                                {['Formación en valores cristianos y sociales.', 'Convenios con educación superior para grado 11.', 'Programas de orientación vocacional y pastoral.', 'Infraestructura moderna para ciencias y artes.'].map((point, i) => (
                                    <li key={i} className="flex items-center gap-4 text-black font-black uppercase text-xs tracking-widest">
                                        <span className="text-[#AA0F16] text-xl">✓</span> {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative w-full h-64 border-4 border-white shadow-xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1577891742442-5f6312a0257e?q=80&w=2000&auto=format&fit=crop"
                                    alt="Estudiante"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative w-full h-64 border-4 border-white shadow-xl mt-8">
                                <Image
                                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2000&auto=format&fit=crop"
                                    alt="Docente"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Proceso Paso a Paso */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black text-black uppercase tracking-tighter italic">Paso a paso del proceso</h2>
                        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em] mt-4">Sigue estas etapas para unirte a nuestra comunidad</p>
                    </div>

                    <div className="space-y-6">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col md:flex-row items-center gap-8 bg-white p-10 border-2 border-slate-100 hover:border-[#AA0F16] transition-colors group">
                                <div className="text-5xl">{step.icon}</div>
                                <div className="flex-grow text-center md:text-left">
                                    <div className="text-[#AA0F16] font-black text-xs uppercase tracking-[0.3em] mb-2">{step.number}</div>
                                    <h3 className="text-2xl font-black text-black uppercase italic tracking-tighter mb-2 group-hover:text-[#AA0F16] transition-colors">{step.title}</h3>
                                    <p className="text-slate-600 font-medium italic">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Llamado a la Acción Final */}
            <section className="bg-[#AA0F16] py-24 text-white text-center mt-12 mb-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-black/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 leading-none">¿Tienes alguna duda <br /> <span className="text-black">específica?</span></h2>
                    <p className="text-xl font-bold italic mb-12 opacity-80 max-w-2xl mx-auto">
                        Nuestro equipo de secretaría está listo para asesorarte en todo lo que necesites para el ingreso de tu hijo(a).
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link href="/contacto" className="px-12 py-5 bg-black text-white font-black hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-xs shadow-2xl">
                            Contáctanos Ahora
                        </Link>
                        <a href="tel:3204518938" className="px-12 py-5 border-2 border-white text-white font-black hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-xs">
                            Llamar: 320 451 89 38
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

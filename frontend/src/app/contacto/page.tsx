'use client';

import { useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function ContactoPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await apiFetch('/public/contact', {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error sending message', error);
            setStatus('error');
        }
    };

    const socialLinks = [
        {
            name: 'Facebook',
            url: 'https://facebook.com',
            color: 'hover:bg-blue-600',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
            )
        },
        {
            name: 'Instagram',
            url: 'https://instagram.com',
            color: 'hover:bg-pink-600',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            )
        },
        {
            name: 'TikTok',
            url: 'https://tiktok.com',
            color: 'hover:bg-black',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92 0 5.84 0 8.75 0 2.03-.67 4.07-2.1 5.54-1.5 1.56-3.7 2.44-5.9 2.35-2.16-.1-4.25-1.07-5.58-2.73-1.39-1.74-1.85-4.08-1.24-6.23.58-2.11 2.19-3.9 4.31-4.7 1-.37 2.06-.52 3.12-.49v4.1c-.67-.07-1.35.03-1.97.3-.85.38-1.49 1.13-1.73 2-.24.84-.13 1.78.33 2.52.46.74 1.25 1.23 2.11 1.35 1.05.15 2.17-.16 2.94-.9.84-.81 1.27-1.98 1.23-3.14V.02z" />
                </svg>
            )
        },
    ];

    return (
        <div className="min-h-screen bg-white py-16 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-[#AA0F16] mb-4 tracking-tight uppercase m-0">Contáctanos</h1>
                    <h4 className="text-black font-black uppercase tracking-widest text-sm mt-2">Canales de Atención Institucional</h4>
                    <div className="h-2 w-32 bg-[#AA0F16] mx-auto mt-6"></div>
                    <p className="mt-8 text-black text-lg max-w-2xl mx-auto font-bold uppercase opacity-60">
                        Estamos aquí para escucharte y guiarte en tu proceso educativo.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Formulario de Contacto */}
                    <div className="lg:col-span-2 bg-white p-10 border-2 border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                        <h2 className="text-2xl font-black text-black uppercase tracking-tighter italic mb-8">Envíanos un <span className="text-[#AA0F16]">Mensaje</span></h2>

                        {status === 'success' ? (
                            <div className="bg-emerald-50 border-2 border-emerald-100 p-8 text-center animate-fade-in">
                                <div className="text-4xl mb-4">✅</div>
                                <h3 className="text-lg font-black text-emerald-800 uppercase tracking-widest mb-2">Mensaje Enviado</h3>
                                <p className="text-emerald-600 font-medium italic">Gracias por contactarnos. Te responderemos a la brevedad posible.</p>
                                <button onClick={() => setStatus('idle')} className="mt-6 px-8 py-3 bg-emerald-600 text-white font-black uppercase text-[10px] tracking-[0.2em] hover:bg-emerald-700 transition-colors">Nuevo Mensaje</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Nombre Completo</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="EJ: MARÍA GARCÍA"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 outline-none focus:border-[#AA0F16] transition-colors font-bold text-black uppercase tracking-widest text-xs"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Correo Electrónico</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="TU@EMAIL.COM"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 outline-none focus:border-[#AA0F16] transition-colors font-bold text-black uppercase tracking-widest text-xs"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Asunto de la Consulta</label>
                                    <input
                                        type="text"
                                        placeholder="EJ: INFORMACIÓN DE COSTOS"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 outline-none focus:border-[#AA0F16] transition-colors font-bold text-black uppercase tracking-widest text-xs"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Mensaje o Inquietud</label>
                                    <textarea
                                        required
                                        rows={5}
                                        placeholder="ESCRIBE AQUÍ TU MENSAJE..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 outline-none focus:border-[#AA0F16] transition-colors font-bold text-black uppercase tracking-widest text-xs resize-none"
                                    ></textarea>
                                </div>
                                {status === 'error' && (
                                    <p className="text-red-600 text-xs font-black uppercase tracking-widest italic">⚠ Error al enviar el mensaje. Intenta de nuevo más tarde.</p>
                                )}
                                <button
                                    disabled={status === 'loading'}
                                    type="submit"
                                    className="w-full py-5 bg-[#AA0F16] text-white font-black uppercase tracking-[0.3em] text-xs hover:bg-black transition-all shadow-xl disabled:opacity-50"
                                >
                                    {status === 'loading' ? 'Procesando Envío...' : 'Enviar Mensaje Institucional'}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Contact Info Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 p-8 text-white relative overflow-hidden shadow-2xl">
                            <div className="relative z-10">
                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#AA0F16] mb-4">Atención Inmediata</h4>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Línea Telefónica</p>
                                        <p className="text-xl font-black">320-451 89 38</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Correo Oficial</p>
                                        <p className="text-lg font-black text-[#AA0F16] break-words">contacto@americalatina.edu.co</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ubicación</p>
                                        <p className="text-sm font-black uppercase tracking-tighter opacity-80">Av. Principal No. 123, Bogotá</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#AA0F16] p-8 text-white shadow-2xl">
                            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-6">Redes Sociales</h4>
                            <div className="grid grid-cols-2 gap-4">
                                {socialLinks.map((social) => (
                                    <a key={social.name} href={social.url} className="flex items-center gap-3 group">
                                        <div className="w-8 h-8 bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#AA0F16] transition-colors">
                                            {social.icon}
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-widest">{social.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-50 p-8 border-2 border-slate-100">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Horario de Atención</p>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase">
                                    <span>Lunes a Viernes</span>
                                    <span className="text-[#AA0F16]">7:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-black uppercase opacity-40">
                                    <span>Sábados</span>
                                    <span>8:00 AM - 12:00 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

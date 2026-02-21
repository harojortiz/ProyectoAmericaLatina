'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';

export default function Footer() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await apiFetch('/public/settings');
                setSettings(data);
            } catch (error) {
                console.error('Error fetching settings', error);
            }
        };
        fetchSettings();
    }, []);

    return (
        <footer className="bg-slate-50 text-slate-800 border-t border-slate-200">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Columna 1: Información Institucional */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-black text-[#AA0F16] uppercase tracking-tighter italic mb-2">
                                I.E.D América Latina
                            </h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                Fe y Alegría
                            </p>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            Educación de calidad con valores cristianos, formando líderes comprometidos con la transformación social.
                        </p>
                        <div className="h-1.5 w-16 bg-[#AA0F16]"></div>
                    </div>

                    {/* Columna 2: Enlaces Rápidos */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-black">
                            Explorar Sitio
                        </h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Inicio', href: '/' },
                                { name: 'Nosotros', href: '/nosotros/historia' },
                                { name: 'Comunidad Educativa', href: '/comunidad/equipo' },
                                { name: 'Grados Estudiantiles', href: '/comunidad/grados' },
                                { name: 'Pastoral', href: '/pastoral/pastoral-general' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-xs text-slate-700 hover:text-[#AA0F16] transition-colors font-black uppercase tracking-widest"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Columna 3: Contacto */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-black">
                            Atención al Ciudadano
                        </h4>
                        <ul className="space-y-4 text-xs text-slate-600 font-bold uppercase tracking-tight">
                            <li className="flex items-start gap-3">
                                <span className="text-[#AA0F16]">📍</span>
                                <span>Bogotá, Colombia</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#AA0F16]">📞</span>
                                <div>
                                    <p>{settings?.phone || '320-451 89 38'}</p>
                                    {settings?.secondaryPhone && <p>{settings.secondaryPhone}</p>}
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#AA0F16]">✉️</span>
                                <span className="lowercase">{settings?.email || 'info@americalatina.edu.co'}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 4: Redes Sociales */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-black">
                            Comunidad Digital
                        </h4>
                        <div className="flex gap-4 mb-8">
                            {[
                                { name: 'Facebook', icon: 'FB', href: settings?.facebookUrl || '#' },
                                { name: 'Instagram', icon: 'IG', href: settings?.instagramUrl || '#' },
                                { name: 'YouTube', icon: 'YT', href: settings?.youtubeUrl || '#' },
                                { name: 'TikTok', icon: 'TK', href: settings?.tiktokUrl || '#' },
                            ].map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-white border border-slate-200 text-black hover:bg-[#AA0F16] hover:text-white hover:border-[#AA0F16] flex items-center justify-center transition-all duration-300 shadow-sm"
                                    aria-label={social.name}
                                >
                                    <span className="font-black uppercase text-[8px]">
                                        {social.icon}
                                    </span>
                                </a>
                            ))}
                        </div>
                        <p className="text-[10px] text-[#AA0F16] font-black italic uppercase tracking-tighter">
                            &quot;{settings?.slogan || 'Beneficios más allá del salón de clases'}&quot;
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-white py-8 border-t border-slate-100">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <p>
                            © {new Date().getFullYear()} I.E.D América Latina - Fe y Alegría.
                        </p>
                        <div className="flex gap-8">
                            <Link href="/politica-privacidad" className="hover:text-[#AA0F16] transition-colors">
                                Privacidad
                            </Link>
                            <Link href="/terminos" className="hover:text-[#AA0F16] transition-colors">
                                Términos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

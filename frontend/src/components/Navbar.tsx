'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import { apiFetch } from '@/lib/api';

export default function Navbar() {
    const { logout, isAuthenticated } = useAuth();
    const pathname = usePathname();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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

    const navItems = [
        { name: 'INICIO', href: '/' },
        {
            name: 'NOSOTROS',
            href: '/nosotros',
            dropdown: [
                { name: 'HISTORIA', href: '/nosotros/historia' },
                { name: 'MISIÓN Y VISIÓN', href: '/nosotros/mision-vision' },
            ]
        },
        {
            name: 'COMUNIDAD EDUCATIVA',
            href: '/comunidad',
            dropdown: [
                { name: 'EQUIPO HUMANO', href: '/comunidad/equipo' },
                { name: 'GRADOS', href: '/comunidad/grados' },
            ]
        },
        {
            name: 'PLAN DE ESTUDIO',
            href: '/plan-estudio',
            dropdown: [
                { name: 'CASTELLANO', href: '/plan-estudio/castellano' },
                { name: 'MATEMÁTICA', href: '/plan-estudio/matematica' },
                { name: 'CIENCIAS SOCIALES', href: '/plan-estudio/ciencias-sociales' },
                { name: 'CIENCIAS NATURALES', href: '/plan-estudio/ciencias-naturales' },
                { name: 'INGLÉS', href: '/plan-estudio/ingles' },
            ]
        },
        { name: 'PROYECTO TRANSVERSAL', href: '/proyecto-transversal' },
        {
            name: 'ORIENTACION ESCOLAR',
            href: '/orientacion',
            dropdown: [
                { name: 'EJE EXPRESARTE', href: '/orientacion/expresarte' },
                { name: 'EJE CIENTÍFICO TECNOLÓGICO', href: '/orientacion/cientifico-tecnologico' },
            ]
        },
        {
            name: 'PASTORAL',
            href: '/pastoral',
            dropdown: [
                { name: 'COMISIÓN DE LA VERDAD', href: '/pastoral/comision-verdad' },
                { name: 'ORIENTACIÓN ESCOLAR', href: '/pastoral/pastoral-orientacion' },
                { name: 'PASTORAL', href: '/pastoral/pastoral-general' },
            ]
        },
        { name: 'DESCARGAS', href: '/descargas' },
        { name: 'CONTACTANOS', href: '/contacto' },
    ];

    return (
        <header className="w-full">
            {/* Top Header Section */}
            <div className="bg-white py-6 border-b border-slate-100">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Logo & School Name */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="w-12 h-12 md:w-20 md:h-20 bg-slate-50 border border-slate-100 flex items-center justify-center rounded-sm font-bold text-[8px] md:text-[10px] text-slate-400 shrink-0">LOGO</div>
                        <h1 className="text-2xl md:text-6xl font-black text-[#AA0F16] tracking-tight m-0 leading-tight">
                            I.E.D América Latina
                        </h1>
                    </div>

                    {/* Tagline & Contact */}
                    <div className="flex flex-col items-center md:items-end text-center md:text-right">
                        <p className="text-[#AA0F16] italic font-bold mb-1 uppercase text-xs tracking-widest">
                            &quot;{settings?.slogan || 'Beneficios más allá del salón de clases'}&quot;
                        </p>
                        {settings?.phone && (
                            <p className="text-black text-2xl md:text-3xl font-black uppercase tracking-tighter whitespace-nowrap">
                                LLÁMANOS: {settings.phone}
                            </p>
                        )}
                        {settings?.secondaryPhone && (
                            <p className="text-black text-xl md:text-2xl font-black uppercase tracking-tighter whitespace-nowrap">
                                {settings.secondaryPhone}
                            </p>
                        )}
                    </div>

                    {/* Social / Auth Shortcut */}
                    <div className="flex flex-row md:flex-col items-center md:items-end gap-2 shrink-0">
                        <div className="hidden xs:flex w-16 md:w-20 h-6 md:h-8 bg-[#AA0F16] text-white items-center justify-center font-black text-[6px] md:text-[8px] uppercase tracking-widest shrink-0">FE Y ALEGRÍA</div>
                        {isAuthenticated ? (
                            <div className="flex items-center gap-3">
                                <Link href="/admin" className="text-xs font-black text-slate-800 hover:text-[#AA0F16]">PANEL</Link>
                                <button onClick={logout} className="text-xs font-black text-red-600 cursor-pointer">SALIR</button>
                            </div>
                        ) : (
                            <Link href="/login" className="flex items-center gap-1 text-[#AA0F16] font-black text-sm hover:underline">
                                <span className="w-5 h-5 bg-[#AA0F16] rounded-full flex items-center justify-center text-white text-[10px]">👤</span>
                                Iniciar sesión
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <nav className="bg-[#AA0F16] shadow-xl sticky top-0 z-50">
                <div className="container mx-auto px-0 md:px-4">
                    <div className="flex md:hidden items-center justify-between px-4 py-3 text-white border-b border-white/10">
                        <span className="font-black text-[10px] tracking-widest uppercase">Menú Principal</span>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 hover:bg-black/10 transition-colors rounded-sm"
                            aria-label={isMenuOpen ? "Cerrar menú principal" : "Abrir menú principal"}
                        >
                            {isMenuOpen ? (
                                <span className="text-xl">✕</span>
                            ) : (
                                <span className="text-xl">☰</span>
                            )}
                        </button>
                    </div>

                    <ul className={`${isMenuOpen ? 'flex' : 'hidden md:flex'} flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10 border-x border-white/10 bg-[#AA0F16] transition-all duration-300`}>
                        {navItems.map((item) => (
                            <li
                                key={item.name}
                                className="relative group w-full md:w-auto"
                                onMouseEnter={() => item.dropdown && setOpenDropdown(item.name)}
                                onMouseLeave={() => item.dropdown && setOpenDropdown(null)}
                            >
                                <div className="flex items-center justify-between group">
                                    <Link
                                        href={item.href}
                                        onClick={() => !item.dropdown && setIsMenuOpen(false)}
                                        className={`flex-grow block px-4 py-4 md:py-4 text-left md:text-center text-[11px] md:text-xs font-black text-white hover:bg-black/10 transition-colors whitespace-nowrap tracking-wider ${pathname === item.href || (item.dropdown && item.dropdown.some(d => pathname === d.href)) ? 'bg-black/20' : ''
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                    {item.dropdown && (
                                        <button
                                            onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                                            className="md:hidden p-4 text-white hover:bg-black/10 border-l border-white/10"
                                            aria-label={openDropdown === item.name ? `Cerrar submenú de ${item.name}` : `Abrir submenú de ${item.name}`}
                                        >
                                            <span className={`inline-block transition-transform duration-300 ${openDropdown === item.name ? 'rotate-180' : ''}`}>▼</span>
                                        </button>
                                    )}
                                </div>

                                {/* Dropdown Menu */}
                                {item.dropdown && (
                                    <div className={`${openDropdown === item.name ? 'max-h-[500px] opacity-100 visible' : 'max-h-0 md:max-h-none opacity-0 md:opacity-0 invisible md:invisible'} md:group-hover:opacity-100 md:group-hover:visible md:group-hover:scale-y-100 md:absolute md:left-0 w-full md:w-64 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-300 transform origin-top border-t-0 md:border-t-4 border-[#AA0F16] overflow-hidden z-50`}>
                                        <ul className="py-2 bg-slate-50 md:bg-white">
                                            {item.dropdown.map((subItem) => (
                                                <li key={subItem.href}>
                                                    <Link
                                                        href={subItem.href}
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className={`block px-8 md:px-6 py-4 md:py-4 text-[11px] md:text-[10px] font-black text-black hover:bg-slate-100 hover:text-[#AA0F16] transition-colors border-b border-slate-200 md:border-slate-50 last:border-0 ${pathname === subItem.href ? 'text-[#AA0F16] bg-slate-100' : ''
                                                            }`}
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                        <li className="flex items-center justify-center p-4 md:px-4 md:py-0 w-full md:w-auto">
                            <div className="text-white hover:bg-black/10 transition-colors flex items-center w-full">
                                <SearchBar />
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

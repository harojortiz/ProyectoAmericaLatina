'use client';

import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated } = useAuth();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // MOCK USER FOR DEMO PURPOSES
    const demoUser = {
        id: 'demo-123',
        fullName: 'Administrador Demo',
        email: 'admin@demo.com',
        role: 'SUPER_ADMIN'
    };

    // Use Demo user if auth fails (Temporary for visual check)
    const currentUser = isAuthenticated ? user : demoUser;

    // Bypass protection for Demo
    /*
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login');
        }
    }, [loading, isAuthenticated, router]);

    if (loading || !isAuthenticated) {
        return <div className="flex h-screen items-center justify-center">Cargando...</div>;
    }
    */

    const role = currentUser?.role;

    const menuItems = [
        { name: 'Dashboard', href: '/admin', roles: ['SUPER_ADMIN', 'DIRECTIVO', 'DOCENTE', 'ADMINISTRATIVO'] },
        { name: 'Usuarios', href: '/admin/usuarios', roles: ['SUPER_ADMIN'] },
        { name: 'Publicaciones', href: '/admin/publicaciones', roles: ['SUPER_ADMIN', 'DIRECTIVO', 'DOCENTE', 'ADMINISTRATIVO'] },
        { name: 'Eventos', href: '/admin/eventos', roles: ['SUPER_ADMIN', 'DIRECTIVO', 'DOCENTE', 'ADMINISTRATIVO'] },
        { name: 'Personal', href: '/admin/personal', roles: ['SUPER_ADMIN', 'DIRECTIVO', 'ADMINISTRATIVO'] },
        { name: 'Documentos', href: '/admin/documentos', roles: ['SUPER_ADMIN', 'DIRECTIVO', 'ADMINISTRATIVO'] },
        { name: 'Contenido Institucional', href: '/admin/institucion', roles: ['SUPER_ADMIN', 'DIRECTIVO', 'ADMINISTRATIVO'] },
        { name: 'Grados Estudiantiles', href: '/admin/grados', roles: ['SUPER_ADMIN', 'DIRECTIVO', 'ADMINISTRATIVO'] },
        { name: 'Admisiones', href: '/admin/admisiones', roles: ['SUPER_ADMIN', 'DIRECTIVO', 'ADMINISTRATIVO'] },
        { name: 'Mensajes', href: '/admin/mensajes', roles: ['SUPER_ADMIN', 'DIRECTIVO', 'ADMINISTRATIVO'] },
        { name: 'Categorías', href: '/admin/categorias', roles: ['SUPER_ADMIN', 'DIRECTIVO', 'ADMINISTRATIVO'] },
        { name: 'Multimedia', href: '/admin/multimedia', roles: ['SUPER_ADMIN', 'DIRECTIVO', 'ADMINISTRATIVO'] },
        { name: 'Configuración', href: '/admin/configuracion', roles: ['SUPER_ADMIN'] },
    ];

    const filteredMenu = menuItems.filter(item => item.roles.includes(role || ''));

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans">
            {/* Sidebar Moderno */}
            <aside className={`fixed inset-y-0 left-0 w-72 bg-black text-white flex flex-col shadow-[10px_0_30px_rgba(0,0,0,0.05)] z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-8 border-b border-white/10 flex items-center justify-between md:block">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#AA0F16] rounded-sm flex items-center justify-center font-black text-xs shadow-lg shadow-red-900/20">AL</div>
                        <h2 className="text-xl font-black tracking-tighter italic uppercase">Admin<span className="text-[#AA0F16]">Panel</span></h2>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-white/50 hover:text-white">
                        <span className="text-2xl">✕</span>
                    </button>
                </div>

                <div className="p-8 border-b border-white/10 hidden md:block">
                    <div className="bg-white/5 p-4 rounded-sm border border-white/5">
                        <p className="text-[#AA0F16] font-black text-xs uppercase tracking-widest truncate">{currentUser?.fullName}</p>
                        <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest mt-1">Rol: {currentUser?.role.replace('_', ' ')}</p>
                    </div>
                </div>

                <nav className="flex-grow p-6 space-y-1 mt-4 overflow-y-auto">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 pl-4">Menú Principal</p>
                    {filteredMenu.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-4 rounded-none transition-all duration-300 font-black text-[11px] uppercase tracking-widest border-l-4 ${pathname === item.href
                                ? 'bg-[#AA0F16]/10 text-white border-[#AA0F16]'
                                : 'text-slate-400 border-transparent hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-6 border-t border-white/10">
                    <Link href="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[#AA0F16] transition-colors group">
                        <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Regresar al Portal
                    </Link>
                </div>
            </aside>

            {/* Backdrop for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <main className="flex-grow flex flex-col relative w-full overflow-hidden">
                <header className="bg-white border-b border-slate-100 px-4 md:px-10 py-4 md:py-6 flex justify-between items-center sticky top-0 z-10 w-full">
                    <div className="flex items-center gap-3 md:gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 md:hidden hover:bg-slate-50 transition-colors rounded-sm text-black"
                        >
                            <span className="text-xl">☰</span>
                        </button>
                        <div className="h-6 w-1 md:w-1.5 bg-[#AA0F16]"></div>
                        <h1 className="text-lg md:text-2xl font-black text-black uppercase tracking-tighter italic truncate max-w-[150px] xs:max-w-none">
                            {menuItems.find(i => i.href === pathname)?.name || 'Administración'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3 md:gap-6">
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{currentUser?.email}</span>
                            <span className="text-[7px] md:text-[9px] font-bold text-[#AA0F16] uppercase tracking-widest mt-0.5">Sesión Activa</span>
                        </div>
                        <div className="w-8 h-8 md:w-12 md:h-12 bg-slate-100 border border-slate-200 rounded-none flex items-center justify-center text-black font-black text-xs md:text-sm uppercase shadow-inner shrink-0 text-center">
                            {currentUser?.fullName.charAt(0)}
                        </div>
                    </div>
                </header>

                <div className="p-4 md:p-10 overflow-auto max-w-[1600px]">
                    <div className="animate-fade-in-up">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}

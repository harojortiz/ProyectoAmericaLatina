'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';

export default function DashboardPage() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        posts: 0,
        events: 0,
        users: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const posts = await apiFetch('/posts');
                const events = await apiFetch('/events');
                let users = [];
                if (user?.role === 'SUPER_ADMIN') {
                    users = await apiFetch('/users');
                }
                setStats({
                    posts: posts.length,
                    events: events.length,
                    users: users.length,
                });
            } catch (error) {
                console.error('Error fetching stats', error);
            }
        };
        fetchStats();
    }, [user]);

    const cards = [
        { name: 'Publicaciones', value: stats.posts, color: 'bg-red-600', href: '/admin/publicaciones' },
        { name: 'Eventos', value: stats.events, color: 'bg-red-800', href: '/admin/eventos' },
    ];

    if (user?.role === 'SUPER_ADMIN') {
        cards.push({ name: 'Usuarios', value: stats.users, color: 'bg-slate-900', href: '/admin/usuarios' });
    }

    return (
        <div className="space-y-12 max-w-7xl">
            {/* Bienvenida dinámica */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black text-black tracking-tighter uppercase italic leading-none">
                        Panel de <span className="text-[#AA0F16]">Control</span>
                    </h2>
                    <p className="text-slate-500 font-medium italic mt-2">Bienvenido de nuevo, {user?.fullName}. Gestiona la plataforma desde aquí.</p>
                </div>
                <div className="flex gap-2">
                    <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sistema en línea</span>
                </div>
            </div>

            {/* Tarjetas de Estadísticas Reales/Simuladas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cards.map((card) => (
                    <Link
                        key={card.name}
                        href={card.href}
                        className="bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border-b-4 border-slate-100 hover:border-[#AA0F16] transition-all duration-500 group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full translate-x-12 -translate-y-12 group-hover:bg-[#AA0F16]/5 transition-colors duration-500"></div>
                        <div className="relative z-10">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">{card.name}</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-6xl font-black text-black tracking-tighter italic">{card.value}</p>
                                <span className="text-[10px] font-bold text-[#AA0F16] uppercase">Total</span>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <span className="text-[#AA0F16] font-black uppercase text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">Gestionar &rarr;</span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Acciones Rápidas de Gestión */}
            <div className="bg-black p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[#AA0F16]/10 transform skew-x-12 translate-x-24"></div>

                <div className="relative z-10">
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-8">Gestión de Contenido Rápido</h3>
                    <div className="flex flex-wrap gap-6">
                        <Link href="/admin/publicaciones" className="px-10 py-5 bg-[#AA0F16] text-white font-black hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-xs shadow-xl flex items-center gap-3 group">
                            <span className="scale-125 group-hover:rotate-12 transition-transform">➕</span> Nueva Publicación
                        </Link>
                        <Link href="/admin/eventos" className="px-10 py-5 border-2 border-white/20 text-white font-black hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-xs flex items-center gap-3 group">
                            <span className="scale-125 group-hover:-rotate-12 transition-transform">📅</span> Programar Evento
                        </Link>
                    </div>
                </div>
            </div>

            {/* Tips Informativos */}
            <div className="bg-slate-100 p-8 flex items-center gap-6 border-l-8 border-[#AA0F16]">
                <span className="text-3xl">💡</span>
                <p className="text-sm text-slate-600 font-medium italic">
                    <strong className="text-black uppercase text-[10px] block mb-1 tracking-widest">Consejo de Administración:</strong>
                    Recuerda que las publicaciones de <span className="text-[#AA0F16] font-bold">Proyecto Transversal</span> solo son visibles si se asignan a la categoría correcta.
                </p>
            </div>
        </div>
    );
}

'use client';

import { useEffect, useState } from 'react';
import { Post } from '@/types';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';

export default function PostsAdminPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const data = await apiFetch('/posts');
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de que deseas eliminar esta publicación?')) return;
        try {
            await apiFetch(`/posts/${id}`, { method: 'DELETE' });
            setPosts(posts.filter(p => p.id !== id));
        } catch (error: unknown) {
            alert(error instanceof Error ? error.message : 'Error desconocido');
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h2 className="text-3xl font-black text-black uppercase tracking-tighter italic m-0 leading-none">
                        Gestión de <span className="text-[#AA0F16]">Publicaciones</span>
                    </h2>
                    <p className="text-slate-500 font-medium italic mt-4">Control editorial de noticias y contenido institucional.</p>
                </div>
                <Link href="/admin/publicaciones/nueva" className="px-8 py-4 bg-[#AA0F16] text-white font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all shadow-xl">
                    + Crear Nueva
                </Link>
            </div>

            <div className="bg-white border-2 border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b-4 border-slate-50">
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Información del Contenido</th>
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Estado Visibilidad</th>
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Responsable</th>
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Opciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {loading ? (
                            <tr><td colSpan={4} className="px-8 py-20 text-center font-black text-slate-300 uppercase tracking-widest animate-pulse">Cargando datos institucionales...</td></tr>
                        ) : posts.length === 0 ? (
                            <tr><td colSpan={4} className="px-8 py-20 text-center font-black text-slate-300 uppercase tracking-widest italic">No se encontraron registros activos.</td></tr>
                        ) : posts.map((post) => (
                            <tr key={post.id} className="group hover:bg-slate-50 transition-colors">
                                <td className="px-8 py-6">
                                    <p className="font-black text-black uppercase tracking-tighter text-lg group-hover:text-[#AA0F16] transition-colors">{post.title}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="w-2 h-2 bg-[#AA0F16] rounded-full"></span>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.category.name}</p>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`inline-flex items-center px-4 py-1.5 text-[9px] font-black uppercase tracking-widest ${post.published
                                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                        : 'bg-slate-50 text-slate-400 border border-slate-100'
                                        }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${post.published ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                                        {post.published ? 'En Línea' : 'Privado'}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <p className="text-xs font-black text-black uppercase tracking-widest italic opacity-60">{post.author.fullName}</p>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex justify-end gap-6">
                                        <Link href={`/admin/publicaciones/editar/${post.id}`} className="text-[10px] font-black uppercase tracking-widest text-black hover:text-[#AA0F16] transition-colors border-b-2 border-transparent hover:border-[#AA0F16]">
                                            Editar
                                        </Link>
                                        <button onClick={() => handleDelete(post.id)} className="text-[10px] font-black uppercase tracking-widest text-[#AA0F16] hover:text-black transition-colors opacity-40 hover:opacity-100">
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

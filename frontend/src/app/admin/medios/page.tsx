'use client';

import { useState, useEffect, useRef } from 'react';
import { apiFetch, MEDIA_URL } from '@/lib/api';
import Image from 'next/image';

interface Media {
    id: string;
    url: string;
    filename: string;
    type: string;
    title?: string;
    altText?: string;
    createdAt: string;
}

export default function MediaLibraryPage() {
    const [media, setMedia] = useState<Media[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [uploading, setUploading] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
    const [editForm, setEditForm] = useState({ title: '', altText: '' });
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            loadMedia(1, search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    // Cargar imágenes
    const loadMedia = async (pageToLoad = 1, searchQuery = '') => {
        try {
            setLoading(true);
            const queryParams = new URLSearchParams({
                page: pageToLoad.toString(),
                limit: '24',
                type: 'image',
                search: searchQuery
            });
            const response = await apiFetch(`/media/all?${queryParams.toString()}`);
            if (pageToLoad === 1) {
                setMedia(response.data);
            } else {
                setMedia(prev => [...prev, ...response.data]);
            }
            setTotalPages(response.meta.totalPages);
            setPage(response.meta.page);
        } catch (error) {
            console.error('Error loading media:', error);
        } finally {
            setLoading(false);
        }
    };

    // Manejar subida de imagen
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', file);

            const newMedia = await apiFetch('/media/upload', {
                method: 'POST',
                body: formData
            });

            // Recargar la lista
            setMedia(prev => [newMedia, ...prev]);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error al subir la imagen');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    // Actualizar metadatos
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedMedia) return;

        try {
            const updatedMedia = await apiFetch(`/media/${selectedMedia.id}`, {
                method: 'PUT',
                body: JSON.stringify(editForm)
            });

            setMedia(prev => prev.map(item => item.id === updatedMedia.id ? updatedMedia : item));
            setSelectedMedia(null);
        } catch (error) {
            console.error('Error updating media:', error);
            alert('Error al actualizar la imagen');
        }
    };

    // Eliminar imagen
    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar esta imagen? Esta acción no se puede deshacer.')) return;

        try {
            await apiFetch(`/media/${id}`, { method: 'DELETE' });
            setMedia(prev => prev.filter(item => item.id !== id));
            if (selectedMedia?.id === id) setSelectedMedia(null);
        } catch (error) {
            console.error('Error deleting media:', error);
            alert('Error al eliminar la imagen');
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-6 md:p-8 border-l-8 border-[#AA0F16] shadow-sm">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-black tracking-tighter uppercase italic">
                        Galería Multimedia
                    </h2>
                    <p className="text-slate-500 font-medium italic mt-1 md:mt-2 text-xs md:text-sm">
                        Gestiona, busca y optimiza las imágenes de tu plataforma.
                    </p>
                </div>

                <div className="flex-1 w-full lg:max-w-lg">
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 md:py-4 bg-slate-50 border-2 border-slate-100 rounded-xl text-xs md:text-sm focus:border-[#AA0F16] outline-none transition-all placeholder:text-slate-400 font-bold uppercase tracking-wide"
                        />
                    </div>
                </div>

                <div className="w-full lg:w-auto">
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileUpload}
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="w-full lg:w-auto bg-[#AA0F16] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-red-100 disabled:opacity-50 flex items-center justify-center gap-3 transform hover:-translate-y-1"
                    >
                        <span className="text-base md:text-lg">☁️</span> {uploading ? 'Subiendo...' : 'Subir Nueva Imagen'}
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
                {/* Grid de Imágenes */}
                <div className="flex-1 w-full bg-white p-4 md:p-8 min-h-[60vh] shadow-sm">
                    {media.length === 0 && !loading ? (
                        <div className="flex flex-col items-center justify-center py-24 text-slate-300">
                            <span className="text-6xl mb-4">🖼️</span>
                            <p className="text-lg font-bold uppercase tracking-widest">No se encontraron imágenes</p>
                            <p className="text-sm font-medium mt-2">Intenta con otra búsqueda o sube una nueva.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {media.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => {
                                        setSelectedMedia(item);
                                        setEditForm({ title: item.title || '', altText: item.altText || '' });
                                    }}
                                    className={`group relative aspect-square bg-slate-100 rounded-xl overflow-hidden border-4 transition-all shadow-sm hover:shadow-xl cursor-pointer ${selectedMedia?.id === item.id ? 'border-[#AA0F16]' : 'border-transparent hover:border-slate-200'}`}
                                >
                                    <Image
                                        src={`${MEDIA_URL}${item.url}`}
                                        alt={item.altText || item.filename}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                                    />
                                    {/* Indicadores */}
                                    {item.title && (
                                        <div className="absolute top-2 right-2 bg-black/50 text-white text-[8px] font-bold px-2 py-1 rounded backdrop-blur-sm">
                                            SEO OK
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Botón Cargar Más */}
                    {page < totalPages && (
                        <div className="mt-12 text-center">
                            <button
                                onClick={() => loadMedia(page + 1, search)}
                                disabled={loading}
                                className="px-8 py-3 bg-slate-100 text-slate-600 font-bold uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-all rounded-full"
                            >
                                {loading ? 'Cargando...' : '👇 Cargar más imágenes'}
                            </button>
                        </div>
                    )}
                </div>

                {/* Sidebar de Edición - Responsive Drawer/Stack */}
                {selectedMedia ? (
                    <div className="fixed inset-0 lg:relative lg:inset-auto z-[60] lg:z-10 flex flex-col lg:w-96">
                        {/* Backdrop mobile */}
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setSelectedMedia(null)}></div>

                        <div className="relative mt-auto lg:mt-0 bg-white p-6 md:p-8 shadow-2xl lg:shadow-xl border-t lg:border-t-0 lg:border-l border-slate-100 h-[80vh] lg:h-auto lg:sticky lg:top-4 overflow-y-auto animate-in slide-in-from-bottom lg:slide-in-from-right duration-300 rounded-t-3xl lg:rounded-none">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="font-black uppercase text-lg">Detalles</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">ID: {selectedMedia.id}</p>
                                </div>
                                <button onClick={() => setSelectedMedia(null)} className="p-2 bg-slate-100 rounded-full text-slate-400 hover:text-black hover:bg-slate-200 transition-colors">✕</button>
                            </div>

                            <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden mb-6 shadow-inner ring-1 ring-black/5">
                                <Image
                                    src={`${MEDIA_URL}${selectedMedia.url}`}
                                    alt={selectedMedia.filename}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <form onSubmit={handleUpdate} className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">Nombre de Archivo</label>
                                    <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                                        <p className="text-xs font-bold truncate text-slate-600">{selectedMedia.filename}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">Título (SEO / Búsqueda)</label>
                                    <input
                                        type="text"
                                        value={editForm.title}
                                        onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-[#AA0F16] focus:ring-4 focus:ring-[#AA0F16]/5 outline-none transition"
                                        placeholder="Ej: Ceremonia de Graduación 2024"
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">Texto Alternativo (Accesibilidad)</label>
                                    <textarea
                                        value={editForm.altText}
                                        onChange={e => setEditForm({ ...editForm, altText: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:border-[#AA0F16] focus:ring-4 focus:ring-[#AA0F16]/5 outline-none transition h-24 resize-none"
                                        placeholder="Describe qué sucede en la imagen..."
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-black text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#AA0F16] transition shadow-lg shadow-slate-200"
                                    >
                                        Guardar Cambios
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(selectedMedia.id)}
                                        className="p-4 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-main-red hover:text-white transition flex items-center justify-center"
                                        title="Eliminar Imagen"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="hidden lg:flex w-96 bg-slate-50 p-8 border-l border-slate-100 flex-col items-center justify-center text-center text-slate-400 min-h-[60vh] sticky top-4">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
                            <span className="text-2xl">🖼️</span>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">Selecciona una imagen para ver detalles y gestionar SEO</p>
                    </div>
                )}
            </div>
        </div>
    );
}

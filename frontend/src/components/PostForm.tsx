'use client';

import { useState, useEffect } from 'react';
import { apiFetch, MEDIA_URL } from '@/lib/api';
import { useRouter } from 'next/navigation';
import RichTextEditor from './RichTextEditor';
import MediaSelector from './MediaSelector';

interface Category {
    id: string;
    name: string;
}

interface PostFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function PostForm({ initialData, isEditing = false }: PostFormProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [categoryId, setCategoryId] = useState(initialData?.categoryId || '');
    const [published, setPublished] = useState(initialData?.published || false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    // Categorías Demo para previsualización sin DB
    const DEMO_CATEGORIES = [
        { id: 'cat-1', name: 'Noticias Generales' },
        { id: 'cat-2', name: 'Eventos Académicos' },
        { id: 'cat-3', name: 'Pastoral' },
        { id: 'cat-4', name: 'Deportes' },
        { id: 'cat-5', name: 'Avisos Administrativos' },
        { id: 'cat-6', name: 'Logros Estudiantiles' }
    ];

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await apiFetch('/categories');
                if (data && data.length > 0) {
                    setCategories(data);
                } else {
                    setCategories(DEMO_CATEGORIES);
                }
            } catch (error) {
                console.warn('Usando categorías demo por error de conexión');
                setCategories(DEMO_CATEGORIES);
            }
        };
        fetchCategories();
    }, []);

    const [showMediaSelector, setShowMediaSelector] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<any>(initialData?.media?.[0] || null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            title,
            content,
            categoryId,
            published,
            mediaId: selectedMedia?.id  // Enviamos ID de la imagen seleccionada
        };

        try {
            if (isEditing) {
                await apiFetch(`/posts/${initialData.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(payload),
                });
            } else {
                await apiFetch('/posts', {
                    method: 'POST',
                    body: JSON.stringify(payload),
                });
            }
            router.push('/admin/publicaciones');
            router.refresh();
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Título de la Publicación</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition"
                        placeholder="Ej: Gran Recital de Invierno 2024"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Categoría</label>
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition"
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center space-x-3 pt-8">
                        <input
                            type="checkbox"
                            id="published"
                            checked={published}
                            onChange={(e) => setPublished(e.target.checked)}
                            className="w-5 h-5 accent-red-600 rounded"
                        />
                        <label htmlFor="published" className="text-sm font-bold text-slate-700">Publicar inmediatamente</label>
                    </div>
                </div>

                {/* Selección de Imagen Principal */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Imagen Principal</label>

                    {selectedMedia ? (
                        <div className="relative group w-full h-64 bg-slate-100 rounded-xl overflow-hidden border-2 border-slate-200">
                            <img
                                src={`${MEDIA_URL}${selectedMedia.url}`}
                                alt={selectedMedia.altText || selectedMedia.title || 'Imagen de la publicación'}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowMediaSelector(true)}
                                    className="px-4 py-2 bg-white text-black font-bold rounded-lg text-xs uppercase tracking-widest hover:bg-slate-200"
                                >
                                    Cambiar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSelectedMedia(null)}
                                    className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg text-xs uppercase tracking-widest hover:bg-red-700"
                                >
                                    Quitar
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setShowMediaSelector(true)}
                            className="w-full h-32 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-[#AA0F16] hover:text-[#AA0F16] hover:bg-[#AA0F16]/5 transition-all gap-2"
                        >
                            <span className="text-2xl">📷</span>
                            <span className="text-xs font-bold uppercase tracking-widest">Seleccionar Imagen de Galería</span>
                        </button>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Contenido</label>
                    <RichTextEditor
                        value={content}
                        onChange={setContent}
                        placeholder="Escribe el cuerpo de la publicación aquí..."
                    />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-3 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-10 py-3 bg-[#AA0F16] text-white rounded-xl font-bold hover:bg-[#880c12] transition shadow-lg shadow-red-100 disabled:opacity-50"
                    >
                        {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear Publicación')}
                    </button>
                </div>
            </form>

            {/* Modal de Selección de Medios */}
            {showMediaSelector && (
                <MediaSelector
                    onSelect={(media) => {
                        setSelectedMedia(media);
                        setShowMediaSelector(false);
                    }}
                    onClose={() => setShowMediaSelector(false)}
                />
            )}
        </>
    );
}

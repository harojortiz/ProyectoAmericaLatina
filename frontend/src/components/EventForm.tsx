'use client';

import { useState } from 'react';
import { apiFetch, MEDIA_URL } from '@/lib/api';
import { useRouter } from 'next/navigation';
import RichTextEditor from './RichTextEditor';
import MediaSelector from './MediaSelector';

interface EventFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialData?: any;
    isEditing?: boolean;
}

export default function EventForm({ initialData, isEditing = false }: EventFormProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [date, setDate] = useState(initialData?.date ? new Date(initialData.date).toISOString().slice(0, 16) : '');
    const [location, setLocation] = useState(initialData?.location || '');
    const [published, setPublished] = useState(initialData?.published || false);
    const [loading, setLoading] = useState(false);

    // Media Selector State
    const [showMediaSelector, setShowMediaSelector] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedMedia, setSelectedMedia] = useState<any>(initialData?.media?.[0] || null);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            title,
            description,
            date,
            location,
            published,
            mediaId: selectedMedia?.id
        };

        try {
            if (isEditing) {
                await apiFetch(`/events/${initialData.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(payload),
                });
            } else {
                await apiFetch('/events', {
                    method: 'POST',
                    body: JSON.stringify(payload),
                });
            }
            router.push('/admin/eventos');
            router.refresh();
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('Ocurrió un error desconocido');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Título del Evento</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition"
                            placeholder="Ej: Reunión de Padres de Familia"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Fecha y Hora</label>
                        <input
                            type="datetime-local"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Ubicación</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition"
                            placeholder="Ej: Auditorio Principal"
                        />
                    </div>
                    <div className="flex items-center space-x-3 pt-8">
                        <input
                            type="checkbox"
                            id="published"
                            checked={published}
                            onChange={(e) => setPublished(e.target.checked)}
                            className="w-5 h-5 accent-red-600 rounded"
                        />
                        <label htmlFor="published" className="text-sm font-bold text-slate-700">Publicar en el sitio</label>
                    </div>
                </div>

                {/* Selección de Imagen del Evento */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Imagen del Evento</label>

                    {selectedMedia ? (
                        <div className="relative group w-full h-64 bg-slate-100 rounded-xl overflow-hidden border-2 border-slate-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`${MEDIA_URL}${selectedMedia.url}`}
                                alt={selectedMedia.altText || selectedMedia.title || 'Imagen del evento'}
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
                            <span className="text-xs font-bold uppercase tracking-widest">Seleccionar Imagen</span>
                        </button>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Descripción</label>
                    <RichTextEditor
                        value={description}
                        onChange={setDescription}
                        placeholder="Detalles sobre el evento..."
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
                        className="px-10 py-3 bg-[#dc2626] text-white rounded-xl font-bold hover:bg-[#991b1b] transition shadow-lg shadow-red-100 disabled:opacity-50"
                    >
                        {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear Evento')}
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

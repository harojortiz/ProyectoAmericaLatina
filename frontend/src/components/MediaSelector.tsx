import React, { useState, useEffect, useRef } from 'react';
import { apiFetch, MEDIA_URL } from '@/lib/api';
import ImageCropper from './ImageCropper';
import Image from 'next/image';

interface Media {
    id: string;
    url: string;
    filename: string;
    type: string;
    createdAt: string;
}

interface MediaSelectorProps {
    onSelect: (media: Media) => void;
    onClose: () => void;
    title?: string;
}

export default function MediaSelector({ onSelect, onClose, title = 'Seleccionar Imagen' }: MediaSelectorProps) {
    const [media, setMedia] = useState<Media[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [uploading, setUploading] = useState(false);
    const [search, setSearch] = useState('');
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
                limit: '12',
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

    // Estado para recorte
    const [croppingImage, setCroppingImage] = useState<string | null>(null);
    const [fileToCrop, setFileToCrop] = useState<File | null>(null);

    // Manejar selección de archivo
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setFileToCrop(file);
        const reader = new FileReader();
        reader.onload = () => {
            setCroppingImage(reader.result as string);
        };
        reader.readAsDataURL(file);
        // Limpiar input para permitir seleccionar el mismo archivo
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // Confirmar recorte y subir
    const handleCropComplete = async (croppedBlob: Blob) => {
        if (!fileToCrop) return;
        setCroppingImage(null); // Cerrar cropper

        try {
            setUploading(true);
            const formData = new FormData();
            // Crear nuevo archivo con el blob recortado
            const croppedFile = new File([croppedBlob], fileToCrop.name, { type: 'image/jpeg' });
            formData.append('file', croppedFile);

            const newMedia = await apiFetch('/media/upload', {
                method: 'POST',
                body: formData
            });

            // Recargar la lista (o agregar al principio)
            setMedia(prev => [newMedia, ...prev]);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error al subir la imagen');
        } finally {
            setUploading(false);
            setFileToCrop(null);
        }
    };

    // Cancelar recorte
    const handleCropCancel = () => {
        setCroppingImage(null);
        setFileToCrop(null);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-4xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">

                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white z-10 gap-4">
                    <div>
                        <h3 className="text-xl font-black text-black uppercase tracking-tight">{title}</h3>
                        <p className="text-xs text-slate-400 font-medium">Biblioteca Multimedia Centralizada</p>
                    </div>

                    <div className="flex-1 max-w-md mx-4">
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                            <input
                                type="text"
                                placeholder="Buscar archivo..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#AA0F16] outline-none transition-all placeholder:text-slate-400 font-bold"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileSelect}
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="bg-[#AA0F16] text-white px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-black transition-colors disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
                        >
                            {uploading ? 'Subiendo...' : 'Subir Imagen'}
                        </button>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Grid de Imágenes */}
                <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                    {media.length === 0 && !loading ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400">
                            <span className="text-4xl mb-4">🖼️</span>
                            <p className="text-sm font-medium">No hay imágenes en la galería</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {/* Card de Imagen */}
                            {media.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => onSelect(item)}
                                    className="group relative aspect-square bg-slate-200 rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#AA0F16] transition-all shadow-sm hover:shadow-md"
                                >
                                    <Image
                                        src={`${MEDIA_URL}${item.url}`}
                                        alt={item.filename}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                                    />
                                    {/* Overlay al Hover */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2 text-center">
                                        <span className="text-xs font-bold uppercase tracking-widest mb-1">Seleccionar</span>
                                        <span className="text-[8px] opacity-75 truncate w-full">{item.filename}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Botón Cargar Más */}
                    {page < totalPages && (
                        <div className="mt-8 text-center">
                            <button
                                onClick={() => loadMedia(page + 1)}
                                disabled={loading}
                                className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-[#AA0F16] transition-colors"
                            >
                                {loading ? 'Cargando...' : 'Cargar más imágenes'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Image Cropper Modal */}
            {croppingImage && (
                <ImageCropper
                    imageSrc={croppingImage}
                    aspectRatio={16 / 9} // Default, podrí ser dinámico
                    onCropComplete={handleCropComplete}
                    onCancel={handleCropCancel}
                />
            )}
        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { apiFetch, MEDIA_URL } from '@/lib/api';

interface Grade {
    id: string;
    name: string;
    section: string;
    description: string | null;
    order: number;
}

export default function GestionGradosPage() {
    const [grades, setGrades] = useState<Grade[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingGrade, setEditingGrade] = useState<Grade | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        section: 'PRIMARIA',
        description: '',
        order: '0',
        mediaId: ''
    });
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const loadGrades = async () => {
        try {
            const data = await apiFetch('/grades');
            setGrades(data);
        } catch (error) {
            console.error('Error loading grades', error);
        }
    };

    useEffect(() => {
        loadGrades();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingGrade) {
                await apiFetch(`/grades/${editingGrade.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(formData)
                });
            } else {
                await apiFetch('/grades', {
                    method: 'POST',
                    body: JSON.stringify(formData)
                });
            }
            setShowForm(false);
            setEditingGrade(null);
            setPreviewImage(null);
            setFormData({ name: '', section: 'PRIMARIA', description: '', order: '0', mediaId: '' });
            loadGrades();
        } catch (error: unknown) {
            console.error('Error saving grade', error);
            alert('Error al guardar el grado: ' + (error instanceof Error ? error.message : 'Error desconocido'));
        }
    };

    const handleEdit = (grade: Grade) => {
        setEditingGrade(grade);
        setFormData({
            name: grade.name,
            section: grade.section,
            description: grade.description || '',
            order: grade.order.toString(),
            mediaId: (grade as Grade & { media?: { id: string, url: string }[] }).media?.[0]?.id || ''
        });
        setPreviewImage((grade as Grade & { media?: { id: string, url: string }[] }).media?.[0]?.url || null);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Seguro que deseas eliminar este grado?')) return;
        try {
            await apiFetch(`/grades/${id}`, { method: 'DELETE' });
            loadGrades();
        } catch (error) {
            console.error('Error deleting grade', error);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const uploadData = new FormData();
        uploadData.append('file', file);

        try {
            const result = await apiFetch('/media/upload', {
                method: 'POST',
                body: uploadData
            });
            setFormData({ ...formData, mediaId: result.id });
            setPreviewImage(result.url);
        } catch (error) {
            console.error('Error uploading image', error);
            alert('Error al subir la imagen');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="bg-white p-8 border-2 border-slate-100 shadow-sm flex justify-between items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#AA0F16]/5 rounded-full translate-x-12 -translate-y-12"></div>
                <div>
                    <h2 className="text-3xl font-black text-black uppercase tracking-tighter italic">Gestión de <span className="text-[#AA0F16]">Grados</span></h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Niveles Educativos y sus grupos</p>
                </div>
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingGrade(null);
                        setPreviewImage(null);
                        setFormData({ name: '', section: 'PRIMARIA', description: '', order: '0', mediaId: '' });
                    }}
                    className="bg-black text-white px-8 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-[#AA0F16] transition-all relative z-10"
                >
                    {showForm ? 'Cerrar Formulario' : 'Nuevo Grado'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-10 border-2 border-black shadow-2xl space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400">Nombre del Grado</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="EJ: Transición, Segundo primaria, Noveno secundaria"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 outline-none focus:border-[#AA0F16] font-bold text-black uppercase text-xs"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400">Sección Académica</label>
                                <select
                                    value={formData.section}
                                    onChange={e => setFormData({ ...formData, section: e.target.value })}
                                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 outline-none focus:border-[#AA0F16] font-bold text-black uppercase text-xs"
                                >
                                    <option value="PREESCOLAR">PREESCOLAR</option>
                                    <option value="PRIMARIA">PRIMARIA</option>
                                    <option value="SECUNDARIA">SECUNDARIA</option>
                                    <option value="OTRO">OTRO</option>
                                </select>
                            </div>
                        </div>

                        {/* Foto del Grado */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400">Imagen del Grupo / Grado</label>
                            <div className="flex items-start gap-6">
                                <div className="w-48 h-32 bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center relative overflow-hidden group">
                                    {previewImage ? (
                                        <>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={previewImage.startsWith('http') ? previewImage : `${MEDIA_URL}${previewImage}`} className="w-full h-full object-cover" alt="Vista previa" />
                                        </>
                                    ) : (
                                        <span className="text-[8px] font-black text-slate-400 uppercase text-center p-4">Sin Imagen</span>
                                    )}
                                    {uploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center font-black text-[8px] uppercase">Subiendo...</div>}
                                </div>
                                <div className="flex-grow space-y-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="grade-image"
                                    />
                                    <label
                                        htmlFor="grade-image"
                                        className="block w-full text-center py-4 border-2 border-black font-black uppercase text-[10px] cursor-pointer hover:bg-black hover:text-white transition"
                                    >
                                        Subir Foto de Grado
                                    </label>
                                    <p className="text-[8px] font-black uppercase text-slate-400 text-balance">Usa una foto grupal del grado (Ej: 11-A, Progresión 2026)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400">Descripción (Opcional)</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 outline-none focus:border-[#AA0F16] font-medium text-black text-xs"
                        ></textarea>
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={uploading} className="w-full py-5 bg-[#AA0F16] text-white font-black uppercase tracking-widest text-xs hover:bg-black transition-all disabled:opacity-50">
                            {editingGrade ? 'Actualizar Grado' : 'Guardar Nuevo Grado'}
                        </button>
                    </div>
                </form>
            )}

            <div className="bg-white border-2 border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black text-white">
                        <tr>
                            <th className="px-8 py-4 font-black uppercase text-[10px] tracking-widest">Vista</th>
                            <th className="px-8 py-4 font-black uppercase text-[10px] tracking-widest">Nombre del Grado</th>
                            <th className="px-8 py-4 font-black uppercase text-[10px] tracking-widest">Sección</th>
                            <th className="px-8 py-4 font-black uppercase text-[10px] tracking-widest text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {grades.map((grade) => (
                            <tr key={grade.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-8 py-4">
                                    <div className="w-20 h-12 bg-slate-100 border border-slate-200 overflow-hidden">
                                        {(grade as Grade & { media?: { url: string }[] }).media?.[0] ? (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img src={`${MEDIA_URL}${(grade as Grade & { media?: { url: string }[] }).media?.[0]?.url}`} className="w-full h-full object-cover" alt="Grado" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[8px] font-black text-slate-300 uppercase">N/A</div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-8 py-6 font-black uppercase text-xs">{grade.name}</td>
                                <td className="px-8 py-6">
                                    <span className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest bg-slate-100 text-black`}>
                                        {grade.section}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-right space-x-4">
                                    <button onClick={() => handleEdit(grade)} className="text-[10px] font-black uppercase text-black hover:text-[#AA0F16]">Editar</button>
                                    <button onClick={() => handleDelete(grade.id)} className="text-[10px] font-black uppercase text-red-600 hover:text-black">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

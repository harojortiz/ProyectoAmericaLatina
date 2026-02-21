'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';

interface Document {
    id: string;
    title: string;
    description: string | null;
    category: string;
    url: string;
    filename: string;
    visible: boolean;
    createdAt: string;
}

export default function GestionDocumentosPage() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingDoc, setEditingDoc] = useState<Document | null>(null);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'CIRCULAR',
        visible: true
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const categories = ['CIRCULAR', 'MANUAL', 'FORMULARIO', 'PROYECTO', 'OTRO'];

    const loadDocuments = async () => {
        try {
            const data = await apiFetch('/documents');
            setDocuments(data);
        } catch (error) {
            console.error('Error loading documents', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDocuments();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingDoc) {
                // Update metadata
                await apiFetch(`/documents/${editingDoc.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(formData)
                });
            } else {
                // Upload new document
                if (!selectedFile) return alert('Por favor selecciona un archivo PDF');

                setUploading(true);
                const uploadData = new FormData();
                uploadData.append('file', selectedFile);
                uploadData.append('title', formData.title);
                uploadData.append('description', formData.description);
                uploadData.append('category', formData.category);
                uploadData.append('visible', String(formData.visible));

                await apiFetch('/documents/upload', {
                    method: 'POST',
                    body: uploadData
                });
            }

            setShowForm(false);
            setEditingDoc(null);
            setSelectedFile(null);
            setFormData({ title: '', description: '', category: 'CIRCULAR', visible: true });
            loadDocuments();
        } catch (error: unknown) {
            console.error('Error saving document', error);
            const msg = error instanceof Error ? error.message : 'Error desconocido';
            alert('Error al guardar el documento: ' + msg);
        } finally {
            setUploading(false);
        }
    };

    const handleEdit = (doc: Document) => {
        setEditingDoc(doc);
        setFormData({
            title: doc.title,
            description: doc.description || '',
            category: doc.category,
            visible: doc.visible
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Seguro que deseas eliminar este documento? El archivo físico también se borrará.')) return;
        try {
            await apiFetch(`/documents/${id}`, { method: 'DELETE' });
            loadDocuments();
        } catch (error) {
            console.error('Error deleting document', error);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="bg-white p-8 border-2 border-slate-100 shadow-sm flex justify-between items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#AA0F16]/5 rounded-full translate-x-12 -translate-y-12"></div>
                <div>
                    <h2 className="text-3xl font-black text-black uppercase tracking-tighter italic">Gestión de <span className="text-[#AA0F16]">Documentos</span></h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Circulares, Manuales y Formularios PDF</p>
                </div>
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingDoc(null);
                        setFormData({ title: '', description: '', category: 'CIRCULAR', visible: true });
                        setSelectedFile(null);
                    }}
                    className="bg-black text-white px-8 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-[#AA0F16] transition-all relative z-10"
                >
                    {showForm ? 'Cerrar Formulario' : 'Subir Documento'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-10 border-2 border-black shadow-2xl space-y-8 animate-fade-in">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400">Título del Documento</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="EJ: Manual de Convivencia 2026"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 outline-none focus:border-[#AA0F16] font-bold text-black uppercase text-xs"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400">Categoría</label>
                                <select
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 outline-none focus:border-[#AA0F16] font-bold text-black uppercase text-xs"
                                >
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {!editingDoc && (
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400">Archivo PDF</label>
                                    <div className="relative">
                                        <input
                                            required
                                            type="file"
                                            accept=".pdf,application/pdf"
                                            onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                                            className="hidden"
                                            id="doc-file"
                                        />
                                        <label
                                            htmlFor="doc-file"
                                            className={`block w-full text-center py-4 border-2 border-dashed ${selectedFile ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-slate-300 bg-slate-50 text-slate-400'} font-black uppercase text-[10px] cursor-pointer hover:border-black transition`}
                                        >
                                            {selectedFile ? `Archivo: ${selectedFile.name}` : 'Seleccionar PDF (Máx 20MB)'}
                                        </label>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-4 pt-4">
                                <input
                                    type="checkbox"
                                    id="visible-check"
                                    checked={formData.visible}
                                    onChange={e => setFormData({ ...formData, visible: e.target.checked })}
                                    className="w-5 h-5 accent-[#AA0F16]"
                                />
                                <label htmlFor="visible-check" className="text-[10px] font-black uppercase text-slate-700 cursor-pointer">Visibilidad Pública</label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400">Descripción Corta (Opcional)</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            rows={2}
                            placeholder="Breve explicación de qué contiene el documento..."
                            className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 outline-none focus:border-[#AA0F16] font-medium text-black text-xs"
                        ></textarea>
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={uploading} className="w-full py-5 bg-[#AA0F16] text-white font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-2">
                            {uploading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    Subiendo Archivo...
                                </>
                            ) : (
                                editingDoc ? 'Actualizar Información' : 'Publicar Documento'
                            )}
                        </button>
                    </div>
                </form>
            )}

            <div className="bg-white border-2 border-slate-100 overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                    <thead className="bg-black text-white">
                        <tr>
                            <th className="px-8 py-4 font-black uppercase text-[10px] tracking-widest">Tipo</th>
                            <th className="px-8 py-4 font-black uppercase text-[10px] tracking-widest">Título / Nombre</th>
                            <th className="px-8 py-4 font-black uppercase text-[10px] tracking-widest">Visible</th>
                            <th className="px-8 py-4 font-black uppercase text-[10px] tracking-widest">Fecha</th>
                            <th className="px-8 py-4 font-black uppercase text-[10px] tracking-widest text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr><td colSpan={5} className="px-8 py-10 text-center font-black uppercase text-[10px] text-slate-400 italic">Cargando base de datos...</td></tr>
                        ) : documents.length === 0 ? (
                            <tr><td colSpan={5} className="px-8 py-10 text-center font-black uppercase text-[10px] text-slate-400 italic">No hay documentos registrados aún.</td></tr>
                        ) : documents.map((doc) => (
                            <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-8 py-6">
                                    <span className="text-2xl">📄</span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex flex-col">
                                        <span className="font-black uppercase text-xs text-black">{doc.title}</span>
                                        <span className="text-[10px] font-black text-[#AA0F16] tracking-tighter uppercase">{doc.category}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest ${doc.visible ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                                        {doc.visible ? 'SÍ' : 'NO'}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase">
                                    {new Date(doc.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-8 py-6 text-right space-x-4">
                                    <button onClick={() => handleEdit(doc)} className="text-[10px] font-black uppercase text-black hover:text-[#AA0F16]">Editar</button>
                                    <button onClick={() => handleDelete(doc.id)} className="text-[10px] font-black uppercase text-red-600 hover:text-black transition-colors">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

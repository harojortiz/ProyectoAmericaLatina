'use client';

import { useState, useEffect } from 'react';
import { apiFetch, MEDIA_URL } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import MediaSelector from '@/components/MediaSelector';

interface StaffMember {
    id: string;
    name: string;
    title: string;
    type: 'DIRECTIVO' | 'DOCENTE' | 'ADMINISTRATIVO';
    email: string | null;
    order: number;
    user?: {
        id: string;
        username?: string;
        role: string;
        pinCode?: string | null;
    };
}

export default function GestionPersonalPage() {
    const { user: currentUser } = useAuth();
    const [staff, setStaff] = useState<StaffMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        type: 'DOCENTE',
        email: '',
        username: '',
        order: '0',
        mediaId: ''
    });
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [showPinModal, setShowPinModal] = useState(false);
    const [createdUserData, setCreatedUserData] = useState<{ name: string; username: string; pin: string } | null>(null);

    // Media Selector State
    const [showMediaSelector, setShowMediaSelector] = useState(false);

    const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN';

    const loadStaff = async () => {
        try {
            const data = await apiFetch('/staff');
            setStaff(data);
        } catch (error) {
            console.error('Error loading staff', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStaff();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingStaff) {
                await apiFetch(`/staff/${editingStaff.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(formData)
                });
                alert('Información actualizada correctamente');
            } else {
                const result = await apiFetch('/staff', {
                    method: 'POST',
                    body: JSON.stringify(formData)
                });

                // Mostrar modal con PIN generado
                setCreatedUserData({
                    name: result.name,
                    username: result.user.username,
                    pin: result.user.pinCode
                });
                setShowPinModal(true);
            }
            setShowForm(false);
            setEditingStaff(null);
            setPreviewImage(null);
            setFormData({ name: '', title: '', type: 'DOCENTE', email: '', username: '', order: '0', mediaId: '' });
            loadStaff();
        } catch (error: any) {
            console.error('Error saving staff member', error);
            alert('Error al guardar el integrante: ' + error.message);
        }
    };

    const handleEdit = (member: StaffMember) => {
        setEditingStaff(member);
        setFormData({
            name: member.name,
            title: member.title,
            type: member.type,
            email: member.email || '',
            username: member.user?.username || '',
            order: member.order.toString(),
            mediaId: (member as any).media?.[0]?.id || ''
        });
        setPreviewImage((member as any).media?.[0]?.url || null);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Seguro que deseas eliminar a este integrante del equipo? Se eliminará también su cuenta de acceso.')) return;
        try {
            await apiFetch(`/staff/${id}`, { method: 'DELETE' });
            loadStaff();
        } catch (error) {
            console.error('Error deleting staff member', error);
        }
    };

    const handleRegeneratePin = async (id: string, name: string) => {
        if (!confirm(`¿Regenerar PIN de acceso para ${name}? El PIN anterior dejará de funcionar.`)) return;
        try {
            const result = await apiFetch(`/staff/${id}/regenerate-pin`, { method: 'POST' });

            // Mostrar modal con nuevo PIN
            setCreatedUserData({
                name: result.staffName,
                username: result.username,
                pin: result.pin
            });
            setShowPinModal(true);
            loadStaff();
        } catch (error: any) {
            console.error('Error regenerating PIN', error);
            alert('Error al regenerar PIN: ' + error.message);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Modal de PIN Generado */}
            {showPinModal && createdUserData && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-300">
                        <div className="text-center space-y-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-green-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            <div>
                                <h3 className="text-2xl font-black text-black uppercase tracking-tight">¡Usuario Creado!</h3>
                                <p className="text-sm text-slate-500 mt-2">Guarda esta información de acceso</p>
                            </div>

                            <div className="bg-slate-50 p-6 rounded-xl space-y-4 border-2 border-slate-100">
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Nombre</label>
                                    <p className="text-lg font-bold text-black">{createdUserData.name}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Usuario</label>
                                    <p className="text-lg font-bold text-black">{createdUserData.username}</p>
                                </div>
                                <div className="bg-[#AA0F16] p-4 rounded-lg">
                                    <label className="text-[10px] font-black uppercase text-white/80 block mb-1">PIN de Acceso</label>
                                    <p className="text-3xl font-black text-white tracking-widest">{createdUserData.pin}</p>
                                </div>
                            </div>

                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 text-left">
                                <p className="text-[10px] font-bold text-yellow-800 uppercase leading-relaxed">
                                    ⚠️ Importante: Anota este PIN. No se volverá a mostrar por seguridad.
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    setShowPinModal(false);
                                    setCreatedUserData(null);
                                }}
                                className="w-full py-4 bg-black text-white font-black uppercase text-xs tracking-widest hover:bg-[#AA0F16] transition"
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Selección de Medios */}
            {showMediaSelector && (
                <MediaSelector
                    onSelect={(media) => {
                        setFormData({ ...formData, mediaId: media.id });
                        setPreviewImage(media.url);
                        setShowMediaSelector(false);
                    }}
                    onClose={() => setShowMediaSelector(false)}
                />
            )}

            <div className="bg-white p-8 border-2 border-slate-100 shadow-sm flex justify-between items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#AA0F16]/5 rounded-full translate-x-12 -translate-y-12"></div>
                <div>
                    <h2 className="text-3xl font-black text-black uppercase tracking-tighter italic">Gestión de <span className="text-[#AA0F16]">Personal</span></h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Directivos, Docentes y Administrativos del Colegio</p>
                </div>
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingStaff(null);
                        setPreviewImage(null);
                        setFormData({ name: '', title: '', type: 'DOCENTE', email: '', username: '', order: '0', mediaId: '' });
                    }}
                    className="bg-black text-white px-8 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-[#AA0F16] transition-all relative z-10"
                >
                    {showForm ? 'Cerrar Formulario' : 'Nuevo Integrante'}
                </button>
            </div>

            {showForm && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                    <form onSubmit={handleSubmit} className="bg-white p-10 border-2 border-black shadow-2xl space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400">Nombre Completo</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={e => {
                                            const fullName = e.target.value;
                                            setFormData({ ...formData, name: fullName });

                                            // Auto-generar username solo si no estamos editando
                                            if (!editingStaff && fullName.trim()) {
                                                const nameParts = fullName.trim().toLowerCase().split(' ').filter(p => p.length > 0);
                                                let generatedUsername = '';

                                                if (nameParts.length >= 4) {
                                                    // Caso: Nombre1 Nombre2 Apellido1 Apellido2
                                                    // Ejemplo: Maria Alejandra Fernandez Suarez -> mfernandezs
                                                    const firstNameInitial = nameParts[0].charAt(0);
                                                    const firstSurname = nameParts[2];
                                                    const secondSurnameInitial = nameParts[3].charAt(0);
                                                    generatedUsername = firstNameInitial + firstSurname + secondSurnameInitial;
                                                } else if (nameParts.length === 3) {
                                                    // Caso: Nombre Apellido1 Apellido2
                                                    // Ejemplo: Maria Fernandez Lopez -> mfernandezl
                                                    const firstNameInitial = nameParts[0].charAt(0);
                                                    const firstSurname = nameParts[1];
                                                    const secondSurnameInitial = nameParts[2].charAt(0);
                                                    generatedUsername = firstNameInitial + firstSurname + secondSurnameInitial;
                                                } else if (nameParts.length === 2) {
                                                    // Caso: Nombre Apellido
                                                    // Ejemplo: Juan Perez -> jperez
                                                    const firstNameInitial = nameParts[0].charAt(0);
                                                    const surname = nameParts[1];
                                                    generatedUsername = firstNameInitial + surname;
                                                } else if (nameParts.length === 1) {
                                                    // Si solo hay un nombre, usar todo
                                                    generatedUsername = nameParts[0];
                                                }

                                                // Limpiar caracteres especiales y acentos
                                                generatedUsername = generatedUsername
                                                    .normalize('NFD')
                                                    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
                                                    .replace(/[^a-z0-9]/g, ''); // Eliminar caracteres especiales

                                                setFormData(prev => ({ ...prev, username: generatedUsername }));
                                            }
                                        }}
                                        className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 outline-none focus:border-[#AA0F16] font-bold text-black uppercase text-xs"
                                    />
                                    <p className="text-[8px] font-bold text-slate-400 uppercase">Ej: María Fernández López → mfernandezl</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400">Cargo / Título</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.title}
                                        placeholder="EJ: Rector, Director de Grupo 11°A"
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 outline-none focus:border-[#AA0F16] font-bold text-black uppercase text-xs"
                                    />
                                </div>
                            </div>

                            {/* Foto de Perfil */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400">Foto de Perfil</label>
                                <div className="flex items-start gap-6">
                                    <div className="w-32 h-32 bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center relative overflow-hidden group">
                                        {previewImage ? (
                                            <img src={previewImage.startsWith('http') ? previewImage : `${MEDIA_URL}${previewImage}`} className="w-full h-full object-cover" alt="Foto de perfil" />
                                        ) : (
                                            <span className="text-[8px] font-black text-slate-400 uppercase text-center p-4">Sin Imagen</span>
                                        )}
                                    </div>
                                    <div className="flex-grow space-y-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowMediaSelector(true)}
                                            className="block w-full text-center py-4 border-2 border-black font-black uppercase text-[10px] cursor-pointer hover:bg-black hover:text-white transition"
                                        >
                                            Seleccionar Foto
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFormData({ ...formData, mediaId: '' });
                                                setPreviewImage(null);
                                            }}
                                            className="block w-full text-center text-[10px] text-red-600 hover:text-red-800 font-bold uppercase"
                                        >
                                            Quitar Foto
                                        </button>
                                        <p className="text-[8px] font-black uppercase text-slate-400">Recomendado: 400x400px</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400">Categoría</label>
                                <select
                                    value={formData.type}
                                    onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 outline-none focus:border-[#AA0F16] font-bold text-black uppercase text-xs"
                                >
                                    <option value="DIRECTIVO">DIRECTIVO</option>
                                    <option value="DOCENTE">DOCENTE</option>
                                    <option value="ADMINISTRATIVO">ADMINISTRATIVO</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400">
                                    Nombre de Usuario (Para iniciar sesión)
                                    {!editingStaff && <span className="text-green-600 ml-2">✓ Auto-generado</span>}
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={formData.username}
                                    placeholder="ej: jperez"
                                    onChange={e => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/\s/g, '') })}
                                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 outline-none focus:border-[#AA0F16] font-bold text-black text-xs"
                                />
                                <p className="text-[8px] font-bold text-slate-400 uppercase">Puedes editarlo si lo deseas</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400">Correo Electrónico (Opcional)</label>
                            <input
                                type="email"
                                value={formData.email}
                                placeholder="ejemplo@colegio.com"
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 outline-none focus:border-[#AA0F16] font-bold text-black text-xs"
                            />
                        </div>

                        {!editingStaff && (
                            <div className="bg-red-50 p-4 border-l-4 border-[#AA0F16]">
                                <p className="text-[10px] font-bold text-[#AA0F16] uppercase tracking-widest leading-relaxed">
                                    <span className="font-black">Nota:</span> Al registrar un nuevo integrante, el sistema generará automáticamente una cuenta de acceso con un PIN de 6 dígitos.
                                </p>
                            </div>
                        )}

                        <div className="pt-4">
                            <button type="submit" disabled={uploading} className="w-full py-5 bg-[#AA0F16] text-white font-black uppercase tracking-widest text-xs hover:bg-black transition-all disabled:opacity-50">
                                {editingStaff ? 'Actualizar Información' : 'Registrar y Crear Cuenta'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white border-2 border-slate-100 overflow-hidden shadow-xl">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-black text-white">
                        <tr>
                            <th className="px-8 py-6 font-black uppercase text-[10px] tracking-widest">Foto</th>
                            <th className="px-8 py-6 font-black uppercase text-[10px] tracking-widest">Identificación y Contacto</th>
                            <th className="px-8 py-6 font-black uppercase text-[10px] tracking-widest">Cargo</th>
                            <th className="px-8 py-6 font-black uppercase text-[10px] tracking-widest">Tipo</th>
                            {isSuperAdmin && <th className="px-8 py-6 font-black uppercase text-[10px] tracking-widest">PIN de Acceso</th>}
                            <th className="px-8 py-6 font-black uppercase text-[10px] tracking-widest text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {staff.map((member) => (
                            <tr key={member.id} className="hover:bg-slate-50/80 transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="w-14 h-14 bg-slate-100 border-2 border-slate-200 overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                                        {(member as any).media?.[0] ? (
                                            <img src={`${MEDIA_URL}${(member as any).media[0].url}`} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[8px] font-black text-slate-300 uppercase">Sin Foto</div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <p className="font-black uppercase text-xs text-black">{member.name}</p>
                                    <p className="text-[10px] text-slate-400 font-bold mt-1 tracking-tight">{member.email}</p>
                                </td>
                                <td className="px-8 py-6 italic text-slate-500 font-medium text-xs tracking-tight">{member.title}</td>
                                <td className="px-8 py-6">
                                    <span className={`px-4 py-1.5 text-[8px] font-black uppercase tracking-widest border ${member.type === 'DIRECTIVO' ? 'bg-[#AA0F16]/5 text-[#AA0F16] border-[#AA0F16]/20' :
                                        member.type === 'DOCENTE' ? 'bg-slate-100 text-black border-slate-200' : 'bg-black text-white border-black'
                                        }`}>
                                        {member.type}
                                    </span>
                                </td>
                                {isSuperAdmin && (
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-slate-50 p-2 border-2 border-dashed border-slate-200 inline-block">
                                                <span className="font-mono text-xs font-black text-[#AA0F16] tracking-[0.2em]">
                                                    {member.user?.pinCode || '------'}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => handleRegeneratePin(member.id, member.name)}
                                                className="text-[10px] font-black uppercase text-slate-400 hover:text-[#AA0F16] transition"
                                                title="Regenerar PIN"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                )}
                                <td className="px-8 py-6 text-right space-x-4">
                                    <button onClick={() => handleEdit(member)} className="text-[10px] font-black uppercase text-black hover:text-[#AA0F16] border-b-2 border-transparent hover:border-[#AA0F16] pb-1 transition-all">Editar</button>
                                    <button onClick={() => handleDelete(member.id)} className="text-[10px] font-black uppercase text-red-600 hover:text-black border-b-2 border-transparent hover:border-black pb-1 transition-all">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {staff.length === 0 && !loading && (
                    <div className="p-24 text-center">
                        <div className="w-16 h-1 w-16 bg-slate-200 mx-auto mb-6"></div>
                        <p className="italic text-slate-400 font-black uppercase text-xs tracking-[0.2em]">
                            No hay personal registrado en este momento.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

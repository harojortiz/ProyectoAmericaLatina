'use client';

import { useEffect, useState } from 'react';
import { User, Role } from '@/types';
import { apiFetch } from '@/lib/api';

export default function UsersAdminPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // Form state
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<Role>('DOCENTE');
    const [creating, setCreating] = useState(false);

    const fetchUsers = async () => {
        try {
            const data = await apiFetch('/users');
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        try {
            await apiFetch('/users', {
                method: 'POST',
                body: JSON.stringify({ email, fullName, password, role }),
            });
            setShowForm(false);
            setEmail('');
            setFullName('');
            setPassword('');
            fetchUsers();
        } catch (error: unknown) {
            alert(error instanceof Error ? error.message : 'Error desconocido');
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Seguro que deseas eliminar este usuario?')) return;
        try {
            await apiFetch(`/users/${id}`, { method: 'DELETE' });
            setUsers(users.filter(u => u.id !== id));
        } catch (error: unknown) {
            alert(error instanceof Error ? error.message : 'Error desconocido');
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h2 className="text-3xl font-black text-black uppercase tracking-tighter italic m-0 leading-none">
                        Control de <span className="text-[#AA0F16]">Accesos</span>
                    </h2>
                    <p className="text-slate-500 font-medium italic mt-4">Administración de roles y permisos del equipo institucional.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className={`px-8 py-4 font-black uppercase text-[10px] tracking-widest transition-all shadow-xl ${showForm ? 'bg-black text-white' : 'bg-[#AA0F16] text-white hover:bg-black'}`}
                >
                    {showForm ? '✕ Cerrar Formulario' : '+ Nuevo Usuario'}
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-10 border-2 border-[#AA0F16]/20 shadow-2xl animate-fade-in-up">
                    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
                        <div className="col-span-2">
                            <h3 className="text-sm font-black text-[#AA0F16] uppercase tracking-[0.3em] mb-2">Registro de Nuevo Integrante</h3>
                            <div className="h-1 w-20 bg-[#AA0F16]"></div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nombre Completo</label>
                            <input
                                type="text" placeholder="EJ: JUAN PÉREZ" value={fullName} onChange={(e) => setFullName(e.target.value)} required
                                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 outline-none focus:border-[#AA0F16] transition-colors font-bold text-black uppercase tracking-tighter"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Correo Electrónico</label>
                            <input
                                type="email" placeholder="EMAIL@INSTITUCION.EDU.CO" value={email} onChange={(e) => setEmail(e.target.value)} required
                                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 outline-none focus:border-[#AA0F16] transition-colors font-bold text-black uppercase tracking-tighter"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Contraseña Inicial</label>
                            <input
                                type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required
                                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 outline-none focus:border-[#AA0F16] transition-colors font-bold text-black"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rol de Acceso</label>
                            <select
                                value={role} onChange={(e) => setRole(e.target.value as Role)} required
                                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 outline-none focus:border-[#AA0F16] transition-colors font-black text-black uppercase tracking-widest text-xs cursor-pointer"
                            >
                                <option value="DOCENTE">DOCENTE</option>
                                <option value="ADMINISTRATIVO">ADMINISTRATIVO</option>
                                <option value="DIRECTIVO">DIRECTIVO</option>
                                <option value="SUPER_ADMIN">SUPER ADMIN</option>
                            </select>
                        </div>
                        <div className="col-span-2 flex justify-end mt-4">
                            <button type="submit" disabled={creating} className="px-12 py-5 bg-black text-white font-black uppercase tracking-widest text-xs hover:bg-[#AA0F16] transition-all shadow-2xl disabled:opacity-50">
                                {creating ? 'PROCESANDO...' : 'CONFIRMAR REGISTRO'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white border-2 border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b-4 border-slate-50">
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Identidad del Usuario</th>
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Nivel de Acceso</th>
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {loading ? (
                            <tr><td colSpan={3} className="px-8 py-20 text-center font-black text-slate-300 uppercase tracking-widest animate-pulse">Consultando base de usuarios...</td></tr>
                        ) : users.length === 0 ? (
                            <tr><td colSpan={3} className="px-8 py-20 text-center font-black text-slate-300 uppercase tracking-widest italic">No hay registros de personal activos.</td></tr>
                        ) : users.map((u) => (
                            <tr key={u.id} className="group hover:bg-slate-50 transition-colors">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-xs text-black group-hover:bg-[#AA0F16] group-hover:text-white transition-colors">
                                            {u.fullName.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-black text-black uppercase tracking-tighter text-lg">{u.fullName}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{u.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`inline-flex px-4 py-1.5 text-[9px] font-black uppercase tracking-widest border ${u.role === 'SUPER_ADMIN' ? 'bg-black text-white border-black' :
                                        u.role === 'DIRECTIVO' || u.role === 'ADMINISTRATIVO' ? 'bg-[#AA0F16] text-white border-[#AA0F16]' :
                                            'bg-slate-50 text-slate-600 border-slate-200'
                                        }`}>
                                        {u.role.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <button onClick={() => handleDelete(u.id)} className="text-[10px] font-black uppercase tracking-widest text-[#AA0F16] hover:text-black transition-colors opacity-40 hover:opacity-100 border-b-2 border-transparent hover:border-black">
                                        Eliminar Acceso
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

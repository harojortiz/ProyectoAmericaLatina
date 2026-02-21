'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await apiFetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
            });

            login(data.token, data.user);
            router.push('/admin');
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="p-8 md:p-12">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-slate-900 italic">Bienvenido</h1>
                        <p className="text-slate-500 mt-2">Ingresa tus credenciales para acceder al panel</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
                            <p className="text-red-700 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Usuario</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                                placeholder="Nombre de usuario"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-[#dc2626] text-white rounded-xl font-bold hover:bg-[#991b1b] transition shadow-lg shadow-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Cargando...' : 'Iniciar Sesión'}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-400">
                        <p>Si olvidaste tu contraseña, contacta al administrador del sistema.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

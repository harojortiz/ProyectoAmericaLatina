'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';

export default function ConfiguracionAdminPage() {
    const [settings, setSettings] = useState({
        phone: '',
        secondaryPhone: '',
        email: '',
        slogan: '',
        facebookUrl: '',
        instagramUrl: '',
        tiktokUrl: '',
        youtubeUrl: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const data = await apiFetch('/management/settings');
                setSettings(data || settings);
            } catch (error) {
                console.error('Error loading settings', error);
            } finally {
                setLoading(false);
            }
        };
        loadSettings();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');
        try {
            await apiFetch('/management/settings', {
                method: 'PUT',
                body: JSON.stringify(settings)
            });
            setMessage('Configuración guardada correctamente ✨');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error saving settings', error);
            setMessage('Error al guardar ❌');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-20 text-center font-black animate-pulse">Cargando Configuración...</div>;

    return (
        <div className="max-w-4xl space-y-8 animate-fade-in-up">
            <div className="bg-white p-10 border-2 border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#AA0F16]/5 rounded-full translate-x-12 -translate-y-12"></div>
                <h2 className="text-3xl font-black text-black uppercase tracking-tighter italic">Configuración <span className="text-[#AA0F16]">Global</span></h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Control de identidad y canales de contacto oficial</p>
            </div>

            <form onSubmit={handleSave} className="bg-white border-2 border-slate-100 shadow-2xl p-10 space-y-10">
                {/* Identidad */}
                <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#AA0F16] border-b pb-4">Marca e Identidad</h3>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Slogan Institucional</label>
                        <input
                            type="text"
                            value={settings.slogan || ''}
                            onChange={e => setSettings({ ...settings, slogan: e.target.value })}
                            className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 outline-none focus:border-[#AA0F16] font-bold text-black uppercase tracking-widest text-xs"
                        />
                    </div>
                </div>

                {/* Contacto */}
                <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#AA0F16] border-b pb-4">Canales de Contacto</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Teléfono Principal</label>
                            <input
                                type="text"
                                value={settings.phone || ''}
                                onChange={e => setSettings({ ...settings, phone: e.target.value })}
                                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 outline-none focus:border-[#AA0F16] font-bold text-black text-xs"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Correo Institucional</label>
                            <input
                                type="email"
                                value={settings.email || ''}
                                onChange={e => setSettings({ ...settings, email: e.target.value })}
                                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 outline-none focus:border-[#AA0F16] font-bold text-black text-xs"
                            />
                        </div>
                    </div>
                </div>

                {/* Redes Sociales */}
                <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#AA0F16] border-b pb-4">Vínculos Digitales</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Facebook URL</label>
                            <input
                                type="text"
                                value={settings.facebookUrl || ''}
                                onChange={e => setSettings({ ...settings, facebookUrl: e.target.value })}
                                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 outline-none focus:border-[#AA0F16] font-bold text-black text-[10px]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Instagram URL</label>
                            <input
                                type="text"
                                value={settings.instagramUrl || ''}
                                onChange={e => setSettings({ ...settings, instagramUrl: e.target.value })}
                                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 outline-none focus:border-[#AA0F16] font-bold text-black text-[10px]"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6 pt-4">
                    <button
                        disabled={saving}
                        type="submit"
                        className="px-12 py-5 bg-[#AA0F16] text-white font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl disabled:opacity-50"
                    >
                        {saving ? 'Guardando...' : 'Aplicar Cambios Globales'}
                    </button>
                    {message && <span className="text-[10px] font-black uppercase text-emerald-600 animate-bounce">{message}</span>}
                </div>
            </form>
        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string | null;
    message: string;
    status: string;
    createdAt: string;
}

export default function MensajesAdminPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);

    const loadMessages = async () => {
        try {
            const data = await apiFetch('/management/messages');
            setMessages(data);
        } catch (error) {
            console.error('Error loading messages', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // En un entorno real, aquí llamaríamos a la API
        // Por ahora, simulamos que cargamos los datos que acabamos de habilitar en el backend
        loadMessages();
    }, []);

    return (
        <div className="space-y-8">
            <div className="bg-white p-8 border-2 border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#AA0F16]/5 rounded-full translate-x-12 -translate-y-12"></div>
                <h2 className="text-3xl font-black text-black uppercase tracking-tighter italic">Bandeja de <span className="text-[#AA0F16]">Mensajes</span></h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Gestión de consultas y contacto ciudadano</p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-32 bg-slate-100 animate-pulse border-2 border-slate-50"></div>
                    ))}
                </div>
            ) : messages.length === 0 ? (
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-20 text-center">
                    <div className="text-4xl mb-4 opacity-20">📩</div>
                    <p className="font-black text-slate-400 uppercase tracking-widest text-xs italic">No hay mensajes nuevos en este momento</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {messages.map((msg) => (
                        <div key={msg.id} className="bg-white p-8 border-l-[10px] border-[#AA0F16] border-y-2 border-r-2 border-slate-100 shadow-xl group hover:border-[#AA0F16] transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="text-[9px] font-black text-[#AA0F16] uppercase tracking-[0.3em] mb-2 block">{new Date(msg.createdAt).toLocaleDateString()}</span>
                                    <h3 className="text-xl font-black text-black uppercase m-0">{msg.subject || 'Sin Asunto'}</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">De: <span className="text-black">{msg.name}</span> ({msg.email})</p>
                                </div>
                                <span className={`px-4 py-1 text-[8px] font-black uppercase tracking-widest ${msg.status === 'PENDING' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                                    {msg.status}
                                </span>
                            </div>
                            <div className="bg-slate-50 p-6 border-l-4 border-slate-200 italic text-slate-600 font-medium">
                                "{msg.message}"
                            </div>
                            <div className="mt-8 flex gap-4">
                                <button className="px-6 py-3 bg-black text-white font-black uppercase text-[9px] tracking-widest hover:bg-[#AA0F16] transition-colors">Marcar como Leído</button>
                                <button className="px-6 py-3 border-2 border-black text-black font-black uppercase text-[9px] tracking-widest hover:bg-black hover:text-white transition-colors">Responder</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

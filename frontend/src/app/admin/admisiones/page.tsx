'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';

interface AdmissionRequest {
    id: string;
    studentName: string;
    parentName: string;
    grade: string;
    phone: string;
    email: string;
    status: string;
    createdAt: string;
}

export default function AdmisionesAdminPage() {
    const [requests, setRequests] = useState<AdmissionRequest[]>([]);
    const [loading, setLoading] = useState(true);

    const loadRequests = async () => {
        try {
            const data = await apiFetch('/management/admissions');
            setRequests(data);
        } catch (error) {
            console.error('Error loading admissions', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRequests();
    }, []);

    return (
        <div className="space-y-8">
            <div className="bg-white p-8 border-2 border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#AA0F16]/5 rounded-full translate-x-12 -translate-y-12"></div>
                <h2 className="text-3xl font-black text-black uppercase tracking-tighter italic">Gestión de <span className="text-[#AA0F16]">Admisiones</span></h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Aspirantes registrados para el año lectivo 2026</p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-64 bg-slate-100 animate-pulse border-2 border-slate-50"></div>
                    ))}
                </div>
            ) : requests.length === 0 ? (
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-20 text-center">
                    <div className="text-4xl mb-4 opacity-20">🎓</div>
                    <p className="font-black text-slate-400 uppercase tracking-widest text-xs italic">No hay solicitudes de admisión todavía</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {requests.map((req) => (
                        <div key={req.id} className="bg-white border-2 border-slate-100 shadow-lg group hover:border-[#AA0F16] transition-all flex flex-col relative overflow-hidden">
                            <div className="h-2 w-full bg-[#AA0F16]"></div>
                            <div className="p-8 flex-grow">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="bg-black text-white px-3 py-1 font-black text-[8px] uppercase tracking-widest">Grado: {req.grade}</span>
                                    <span className="text-[8px] font-black text-[#AA0F16] uppercase tracking-widest">{new Date(req.createdAt).toLocaleDateString()}</span>
                                </div>
                                <h3 className="text-xl font-black text-black uppercase tracking-tighter italic mb-4">{req.studentName}</h3>
                                <div className="space-y-4 pt-4 border-t border-slate-50">
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Acudiente</p>
                                        <p className="text-xs font-black uppercase">{req.parentName}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Teléfono</p>
                                            <p className="text-xs font-black text-[#AA0F16]">{req.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estado</p>
                                            <p className="text-[9px] font-black uppercase text-amber-500">{req.status}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-slate-50 flex gap-2 border-t border-slate-100">
                                <button className="flex-grow py-3 bg-[#AA0F16] text-white font-black uppercase text-[8px] tracking-widest hover:bg-black transition-colors">Ver Detalles</button>
                                <button className="p-3 border-2 border-slate-200 text-slate-400 hover:border-[#AA0F16] hover:text-[#AA0F16] transition-colors">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

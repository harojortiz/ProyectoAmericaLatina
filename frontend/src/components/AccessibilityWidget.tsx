'use client';

import { useState } from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';

export default function AccessibilityWidget() {
    const {
        fontSize,
        highContrast,
        grayscale,
        increaseFontSize,
        decreaseFontSize,
        toggleHighContrast,
        toggleGrayscale,
        resetaccessibility
    } = useAccessibility();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="fixed bottom-6 left-6 z-50 flex flex-col items-start font-sans group"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >

            {/* Menu Options - Using max-h for proper hit-area collapse */}
            <div className={`bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300 origin-bottom-left ${isOpen ? 'max-h-96 opacity-100 mb-4 translate-y-0' : 'max-h-0 opacity-0 mb-0 translate-y-4 pointer-events-none'}`}>
                <div className="p-4 w-64">
                    <h3 className="text-[#AA0F16] font-black uppercase text-xs tracking-widest mb-4 border-b border-slate-100 pb-2">Herramientas de Accesibilidad</h3>

                    <div className="space-y-3">
                        {/* Font Size */}
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-700">Tamaño Texto</span>
                            <div className="flex gap-1">
                                <button
                                    onClick={decreaseFontSize}
                                    disabled={fontSize === 0}
                                    className="w-8 h-8 rounded bg-slate-100 text-slate-800 hover:bg-[#AA0F16] hover:text-white transition disabled:opacity-50 font-bold"
                                >
                                    A-
                                </button>
                                <button
                                    onClick={increaseFontSize}
                                    disabled={fontSize === 2}
                                    className="w-8 h-8 rounded bg-slate-100 text-slate-800 hover:bg-[#AA0F16] hover:text-white transition disabled:opacity-50 font-bold"
                                >
                                    A+
                                </button>
                            </div>
                        </div>

                        {/* Contrast */}
                        <button
                            onClick={toggleHighContrast}
                            className={`w-full py-2 px-3 rounded text-xs font-bold tracking-wide flex items-center justify-between transition ${highContrast ? 'bg-yellow-400 text-black ring-2 ring-black' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                        >
                            <span>Alto Contraste</span>
                            <span className="text-base">Contrast</span>
                        </button>

                        {/* Grayscale */}
                        <button
                            onClick={toggleGrayscale}
                            className={`w-full py-2 px-3 rounded text-xs font-bold tracking-wide flex items-center justify-between transition ${grayscale ? 'bg-gray-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                        >
                            <span>Escala de Grises</span>
                            <span className="text-base">BW</span>
                        </button>

                        {/* Reset */}
                        <button
                            onClick={resetaccessibility}
                            className="w-full mt-2 py-2 px-3 rounded text-[10px] font-black tracking-widest uppercase text-[#AA0F16] hover:bg-red-50 transition border border-transparent hover:border-red-100"
                        >
                            Restablecer Todo
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 bg-[#AA0F16] hover:bg-black text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-200"
                aria-label="Abrir menú de accesibilidad"
                title="Opciones de Accesibilidad"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="8" r="1.5" />
                    <path d="M9 13.5c1.5-1 3-1.5 3-1.5s1.5.5 3 1.5" />
                    <path d="M12 12v5" />
                    <path d="M10 20l2-3 2 3" />
                </svg>
            </button>

        </div>
    );
}

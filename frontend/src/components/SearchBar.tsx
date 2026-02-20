'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Definimos los tipos de contenido buscable
interface SearchItem {
    type: 'page' | 'post' | 'event' | 'area' | 'NOTICIA' | 'EVENTO' | 'FAQ' | 'INSTITUCIONAL' | 'PASTORAL';
    title: string;
    description: string;
    url: string;
    keywords?: string[];
}

// Datos estáticos mínimos (fallback)
const SITE_CONTENT: SearchItem[] = [
    { type: 'page', title: 'Inicio', description: 'Página principal', url: '/' },
    { type: 'page', title: 'Contacto', description: 'Información de contacto', url: '/contacto' },
];

export default function SearchBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchItem[]>([]);
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Cerrar al hacer click fuera
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Enfocar input al abrir
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Lógica de búsqueda
    const handleSearch = async (text: string) => {
        setQuery(text);
        if (text.length < 2) {
            setResults([]);
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/api/search?q=${encodeURIComponent(text)}`);
            if (response.ok) {
                const data = await response.json();
                setResults(data);
            } else {
                // Fallback a búsqueda local si falla API
                const lowerQuery = text.toLowerCase();
                const filtered = SITE_CONTENT.filter(item =>
                    item.title.toLowerCase().includes(lowerQuery) ||
                    item.description.toLowerCase().includes(lowerQuery)
                );
                setResults(filtered);
            }
        } catch (error) {
            console.error('Search error', error);
            // Fallback en caso de error de red
            const lowerQuery = text.toLowerCase();
            const filtered = SITE_CONTENT.filter(item =>
                item.title.toLowerCase().includes(lowerQuery) ||
                item.description.toLowerCase().includes(lowerQuery)
            );
            setResults(filtered);
        }
    };

    const handleSelect = (url: string) => {
        setIsOpen(false);
        setQuery('');
        router.push(url);
    };

    return (
        <div ref={containerRef} className="relative z-50">
            {/* Botón de Lupa */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 text-slate-600 hover:text-[#AA0F16] transition-colors"
                    aria-label="Buscar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            )}

            {/* Input Expandido */}
            <div
                className={`absolute right-0 top-0 bg-white shadow-xl border border-slate-200 rounded-lg overflow-hidden transition-all duration-300 origin-right ${isOpen ? 'w-[300px] opacity-100' : 'w-0 opacity-0 pointer-events-none'
                    }`}
            >
                <div className="flex items-center p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Buscar en el sitio..."
                        className="w-full p-2 outline-none text-sm text-black placeholder:text-slate-400"
                    />
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1 text-slate-400 hover:text-[#AA0F16]"
                    >
                        ✕
                    </button>
                </div>

                {/* Resultados */}
                {results.length > 0 && isOpen && (
                    <div className="border-t border-slate-100 max-h-[300px] overflow-y-auto">
                        {results.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelect(item.url)}
                                className="w-full text-left p-3 hover:bg-slate-50 border-b border-slate-50 last:border-0 transition-colors group"
                            >
                                <div className="text-xs font-bold text-[#AA0F16] uppercase tracking-wider mb-1">
                                    {item.type}
                                </div>
                                <div className="font-bold text-slate-800 text-sm">{item.title}</div>
                                <div className="text-xs text-slate-500 truncate">{item.description}</div>
                            </button>
                        ))}
                    </div>
                )}

                {/* Mensaje Sin Resultados */}
                {query.length > 1 && results.length === 0 && isOpen && (
                    <div className="p-4 text-center text-xs text-slate-400 italic">
                        No se encontraron resultados para &quot;{query}&quot;
                    </div>
                )}
            </div>
        </div>
    );
}

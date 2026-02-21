'use client';

import { useState, useEffect } from 'react';
import { apiFetch, MEDIA_URL } from '@/lib/api';
import RichTextEditor from '@/components/RichTextEditor';
import MediaSelector from '@/components/MediaSelector';
import Image from 'next/image';

interface InstitutionPage {
    id: string;
    title: string;
    slug: string;
    section: string;
    description: string | null;
    content: string | null;
}

export default function GestionInstitucionPage() {
    const [pages, setPages] = useState<InstitutionPage[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [showMediaFor, setShowMediaFor] = useState<{ field: string, index?: number } | null>(null);

    // Estado del formulario simplificado
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        section: 'nosotros',
        description: '',
        // Campos para Misión/Visión
        mision: '',
        vision: '',
        historia_hitos: [] as { titulo: string; texto: string }[],
        // Campos para Home (Inicio)
        inicio_slides: [] as { title: string; subtitle: string; image: string; tag: string }[],
        inicio_equipo: { gesto: '', titulo: '', tituloHighlight: '', subtitulo: '', descripcion: '', statNum: '', statText: '', image: '' },
        inicio_accesos: [
            { icon: '🎓', perfil: 'Perfil 01', title: 'Soy Estudiante', description: '', linkText: 'Ingresar al Portal', linkHref: '/estudiantes' },
            { icon: '👪', perfil: 'Perfil 02', title: 'Soy Acudiente', description: '', linkText: 'Gestión Familiar', linkHref: '/padres' },
            { icon: '📝', perfil: 'Perfil 03', title: 'Busco Cupo', description: '', linkText: 'Iniciar Proceso', linkHref: '/admisiones' }
        ],
        // Campo general para otras páginas
        general_content: ''
    });

    const loadPages = async () => {
        try {
            const data = await apiFetch('/pages');
            setPages(data);
        } catch (error) {
            console.error('Error loading pages', error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadPages();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Estructurar el contenido según el tipo de página
        let structuredContent = '';
        if (formData.slug === 'mision-vision') {
            structuredContent = JSON.stringify({
                mision: formData.mision,
                vision: formData.vision
            });
        } else if (formData.slug === 'historia') {
            structuredContent = JSON.stringify({
                hitos: formData.historia_hitos
            });
        } else if (formData.slug === 'inicio') {
            structuredContent = JSON.stringify({
                slides: formData.inicio_slides,
                equipo: formData.inicio_equipo,
                accesos: formData.inicio_accesos
            });
        } else {
            structuredContent = formData.general_content;
        }

        try {
            await apiFetch('/pages', {
                method: 'POST',
                body: JSON.stringify({
                    title: formData.title,
                    slug: formData.slug,
                    section: formData.section,
                    description: formData.description,
                    content: structuredContent
                })
            });
            setShowForm(false);
            loadPages();
        } catch (error) {
            console.error('Error saving page', error);
            alert('Error al guardar la página');
        }
    };

    const handleEdit = (page: InstitutionPage) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let contentObj: Record<string, any> = {};
        try {
            if (page.content?.startsWith('{')) {
                contentObj = JSON.parse(page.content || '{}');
            }
        } catch {
            console.log('Contenido no es JSON, usando como texto plano');
        }

        setFormData({
            title: page.title,
            slug: page.slug,
            section: page.section,
            description: page.description || '',
            mision: contentObj.mision || '',
            vision: contentObj.vision || '',
            historia_hitos: contentObj.hitos || [],
            inicio_slides: contentObj.slides || [],
            inicio_equipo: contentObj.equipo || { gesto: '', titulo: '', tituloHighlight: '', subtitulo: '', descripcion: '', statNum: '', statText: '', image: '' },
            inicio_accesos: contentObj.accesos || [
                { icon: '🎓', perfil: 'Perfil 01', title: 'Soy Estudiante', description: '', linkText: 'Ingresar al Portal', linkHref: '/estudiantes' },
                { icon: '👪', perfil: 'Perfil 02', title: 'Soy Acudiente', description: '', linkText: 'Gestión Familiar', linkHref: '/padres' },
                { icon: '📝', perfil: 'Perfil 03', title: 'Busco Cupo', description: '', linkText: 'Iniciar Proceso', linkHref: '/admisiones' }
            ],
            general_content: !page.content?.startsWith('{') ? page.content || '' : ''
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Seguro que deseas eliminar esta página?')) return;
        try {
            await apiFetch(`/pages/${id}`, { method: 'DELETE' });
            loadPages();
        } catch (error) {
            console.error('Error deleting page', error);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="bg-white p-8 border-2 border-slate-100 shadow-sm flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-black text-black uppercase tracking-tighter italic">Lectoría de <span className="text-[#AA0F16]">Secciones</span></h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Dinamización Institucional sin Código</p>
                </div>
                <button
                    onClick={() => { setShowForm(!showForm); setFormData({ title: '', slug: '', section: 'nosotros', description: '', mision: '', vision: '', historia_hitos: [], inicio_slides: [], inicio_equipo: { gesto: '', titulo: '', tituloHighlight: '', subtitulo: '', descripcion: '', statNum: '', statText: '', image: '' }, inicio_accesos: [], general_content: '' }); }}
                    className="bg-black text-white px-8 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-[#AA0F16] transition-all"
                >
                    {showForm ? 'Cerrar' : 'Editar Secciones'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-10 border-2 border-black shadow-2xl space-y-10">
                    <div className="bg-slate-50 p-6 border-l-8 border-[#AA0F16]">
                        <h4 className="font-black uppercase text-xs">Página Seleccionada: <span className="text-[#AA0F16]">{formData.title || 'Nueva'}</span></h4>
                        <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest italic">Solo edita los textos, yo me encargo del diseño.</p>
                    </div>

                    {/* Misión y Visión - Editor Estructurado */}
                    {formData.slug === 'mision-vision' && (
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase text-[#AA0F16] tracking-widest">Contenido de la Misión</label>
                                <RichTextEditor
                                    value={formData.mision}
                                    onChange={(val) => setFormData({ ...formData, mision: val })}
                                    placeholder="Escribe aquí el propósito del colegio..."
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase text-black tracking-widest">Contenido de la Visión</label>
                                <RichTextEditor
                                    value={formData.vision}
                                    onChange={(val) => setFormData({ ...formData, vision: val })}
                                    placeholder="Escribe aquí hacia dónde va el colegio..."
                                />
                            </div>
                        </div>
                    )}

                    {/* Historia - Editor Estructurado Dinámico */}
                    {formData.slug === 'historia' && (
                        <div className="space-y-12">
                            <div className="flex justify-between items-center">
                                <h3 className="font-black uppercase tracking-widest text-sm">Línea de Tiempo</h3>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newHitos = [...(formData.historia_hitos || [])];
                                        newHitos.push({ titulo: '', texto: '' });
                                        setFormData({ ...formData, historia_hitos: newHitos });
                                    }}
                                    className="bg-black text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-[#AA0F16] transition"
                                >
                                    + Agregar Hito
                                </button>
                            </div>

                            {formData.historia_hitos?.map((hito: { titulo: string; texto: string }, index: number) => (
                                <div key={index} className="grid md:grid-cols-12 gap-8 p-8 border-2 border-slate-100 bg-slate-50/50 relative group">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newHitos = formData.historia_hitos.filter((_, i) => i !== index);
                                            setFormData({ ...formData, historia_hitos: newHitos });
                                        }}
                                        className="absolute top-4 right-4 text-slate-300 hover:text-red-600 transition"
                                        title="Eliminar Hito"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    <div className="md:col-span-8 space-y-4">
                                        <label className="text-[10px] font-black uppercase text-slate-400">Título / Año (Ej: 1985 - Fundación)</label>
                                        <input
                                            type="text"
                                            value={hito.titulo}
                                            onChange={e => {
                                                const newHitos = [...formData.historia_hitos];
                                                newHitos[index].titulo = e.target.value;
                                                setFormData({ ...formData, historia_hitos: newHitos });
                                            }}
                                            className="w-full px-4 py-3 bg-white border border-slate-200 font-bold outline-none focus:border-black transition"
                                            placeholder="Escribe el título del hito..."
                                        />
                                        <label className="text-[10px] font-black uppercase text-slate-400">Relato Histórico</label>
                                        <RichTextEditor
                                            value={hito.texto}
                                            onChange={(val) => {
                                                const newHitos = [...formData.historia_hitos];
                                                newHitos[index].texto = val;
                                                setFormData({ ...formData, historia_hitos: newHitos });
                                            }}
                                            placeholder="Describe los acontecimientos de este periodo..."
                                        />
                                    </div>
                                    <div className="md:col-span-4 flex flex-col justify-center">
                                        <div className="aspect-video bg-white border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:border-[#AA0F16] hover:bg-red-50 transition group/upload">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-slate-300 mb-2 group-hover/upload:text-[#AA0F16] transition">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                            </svg>
                                            <span className="text-[10px] font-black uppercase text-slate-400 group-hover/upload:text-[#AA0F16]">Cargar Imagen</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Inicio - Editor Estructurado Dinámico */}
                    {formData.slug === 'inicio' && (
                        <div className="space-y-16">
                            {/* Slides Editor */}
                            <div className="space-y-6">
                                <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                                    <h3 className="font-black uppercase tracking-[0.3em] text-[#AA0F16] text-xs">1. Carrusel Principal (Hero)</h3>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newSlides = [...(formData.inicio_slides || [])];
                                            newSlides.push({ title: '', subtitle: '', image: '', tag: '' });
                                            setFormData({ ...formData, inicio_slides: newSlides });
                                        }}
                                        className="bg-black text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-[#AA0F16] transition"
                                    >
                                        + Agregar Diapositiva
                                    </button>
                                </div>

                                {formData.inicio_slides?.map((slide: { title: string; subtitle: string; tag: string; image: string }, index: number) => (
                                    <div key={index} className="grid md:grid-cols-12 gap-8 p-8 border-2 border-slate-100 bg-slate-50/50 relative">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newSlides = formData.inicio_slides.filter((_, i) => i !== index);
                                                setFormData({ ...formData, inicio_slides: newSlides });
                                            }}
                                            className="absolute top-4 right-4 text-slate-300 hover:text-red-600 transition"
                                        >
                                            ✕
                                        </button>
                                        <div className="md:col-span-8 grid grid-cols-2 gap-4">
                                            <div className="col-span-2 space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400">Título Principal</label>
                                                <input
                                                    type="text"
                                                    value={slide.title}
                                                    onChange={e => {
                                                        const newSlides = [...formData.inicio_slides];
                                                        newSlides[index].title = e.target.value;
                                                        setFormData({ ...formData, inicio_slides: newSlides });
                                                    }}
                                                    className="w-full px-4 py-3 bg-white border border-slate-200 font-bold outline-none focus:border-black text-sm"
                                                />
                                            </div>
                                            <div className="col-span-2 space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400">Subtítulo Descriptivo</label>
                                                <input
                                                    type="text"
                                                    value={slide.subtitle}
                                                    onChange={e => {
                                                        const newSlides = [...formData.inicio_slides];
                                                        newSlides[index].subtitle = e.target.value;
                                                        setFormData({ ...formData, inicio_slides: newSlides });
                                                    }}
                                                    className="w-full px-4 py-3 bg-white border border-slate-200 font-bold outline-none focus:border-black text-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400">Etiqueta Sup. (Ej: ESTUDIANTES)</label>
                                                <input
                                                    type="text"
                                                    value={slide.tag}
                                                    onChange={e => {
                                                        const newSlides = [...formData.inicio_slides];
                                                        newSlides[index].tag = e.target.value;
                                                        setFormData({ ...formData, inicio_slides: newSlides });
                                                    }}
                                                    className="w-full px-4 py-3 bg-white border border-slate-200 font-bold outline-none focus:border-black text-sm uppercase"
                                                />
                                            </div>
                                        </div>
                                        <div className="md:col-span-4 flex flex-col justify-center">
                                            {slide.image ? (
                                                <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-slate-200 group">
                                                    <Image src={slide.image.startsWith('http') ? slide.image : `${MEDIA_URL}${slide.image}`} alt="slide" fill className="object-cover" />
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <button type="button" onClick={() => setShowMediaFor({ field: 'slide', index })} className="px-4 py-2 bg-white text-black text-[10px] font-black uppercase">Cambiar FOTO</button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div onClick={() => setShowMediaFor({ field: 'slide', index })} className="aspect-video bg-white border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:border-[#AA0F16] hover:bg-red-50 transition">
                                                    <span className="text-[10px] font-black uppercase text-slate-400">Añadir Imagen (16:9)</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Accesos Rápidos (Solo se edita el texto y link) */}
                            <div className="space-y-6">
                                <h3 className="font-black uppercase tracking-[0.3em] text-[#AA0F16] text-xs border-b border-slate-200 pb-4">2. Accesos Rápidos</h3>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {formData.inicio_accesos?.map((acceso: { perfil: string; title: string; description: string; linkText: string; linkHref: string }, index: number) => (
                                        <div key={index} className="p-6 border-2 border-slate-100 bg-white space-y-4">
                                            <h4 className="text-sm font-black text-black uppercase">{acceso.perfil} - {acceso.title}</h4>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400">Descripción Breve</label>
                                                <textarea
                                                    rows={3}
                                                    value={acceso.description}
                                                    onChange={e => {
                                                        const newAcc = [...formData.inicio_accesos];
                                                        newAcc[index].description = e.target.value;
                                                        setFormData({ ...formData, inicio_accesos: newAcc });
                                                    }}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-xs font-bold outline-none focus:border-black"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400">Texto del Enlace</label>
                                                <input
                                                    type="text"
                                                    value={acceso.linkText}
                                                    onChange={e => {
                                                        const newAcc = [...formData.inicio_accesos];
                                                        newAcc[index].linkText = e.target.value;
                                                        setFormData({ ...formData, inicio_accesos: newAcc });
                                                    }}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-xs font-bold outline-none focus:border-black uppercase"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Sección Equipo IDEAL */}
                            <div className="space-y-6">
                                <h3 className="font-black uppercase tracking-[0.3em] text-[#AA0F16] text-xs border-b border-slate-200 pb-4">3. Visión Educativa (Equipo IDEAL)</h3>
                                <div className="grid md:grid-cols-2 gap-8 bg-slate-50/50 p-8 border-2 border-slate-100">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Gesto (Línea Superior)</label>
                                            <input
                                                type="text"
                                                value={formData.inicio_equipo.gesto}
                                                onChange={e => setFormData({ ...formData, inicio_equipo: { ...formData.inicio_equipo, gesto: e.target.value } })}
                                                className="w-full px-4 py-3 bg-white border border-slate-200 text-xs font-bold outline-none focus:border-black"
                                                placeholder="Nuestro Gesto Institucional"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400">Título</label>
                                                <input
                                                    type="text"
                                                    value={formData.inicio_equipo.titulo}
                                                    onChange={e => setFormData({ ...formData, inicio_equipo: { ...formData.inicio_equipo, titulo: e.target.value } })}
                                                    className="w-full px-4 py-3 bg-white border border-slate-200 text-xs font-bold outline-none focus:border-black"
                                                    placeholder="Equipo"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-[#AA0F16]">Resaltado</label>
                                                <input
                                                    type="text"
                                                    value={formData.inicio_equipo.tituloHighlight}
                                                    onChange={e => setFormData({ ...formData, inicio_equipo: { ...formData.inicio_equipo, tituloHighlight: e.target.value } })}
                                                    className="w-full px-4 py-3 bg-white border border-slate-200 text-xs font-bold outline-none focus:border-[#AA0F16]"
                                                    placeholder="IDEAL"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Subtítulo</label>
                                            <input
                                                type="text"
                                                value={formData.inicio_equipo.subtitulo}
                                                onChange={e => setFormData({ ...formData, inicio_equipo: { ...formData.inicio_equipo, subtitulo: e.target.value } })}
                                                className="w-full px-4 py-3 bg-white border border-slate-200 text-xs font-bold outline-none focus:border-black"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Párrafo Descriptivo</label>
                                            <textarea
                                                rows={4}
                                                value={formData.inicio_equipo.descripcion}
                                                onChange={e => setFormData({ ...formData, inicio_equipo: { ...formData.inicio_equipo, descripcion: e.target.value } })}
                                                className="w-full px-4 py-3 bg-white border border-slate-200 text-sm font-bold outline-none focus:border-black leading-relaxed"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Imagen Principal de Sección</label>
                                            {formData.inicio_equipo.image ? (
                                                <div className="relative aspect-square md:aspect-auto md:h-64 rounded-lg overflow-hidden border-2 border-slate-200 group">
                                                    <Image src={formData.inicio_equipo.image.startsWith('http') ? formData.inicio_equipo.image : `${MEDIA_URL}${formData.inicio_equipo.image}`} alt="equipo" fill className="object-cover" />
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <button type="button" onClick={() => setShowMediaFor({ field: 'equipo' })} className="px-4 py-2 bg-white text-black text-[10px] font-black uppercase">Cambiar IMAGEN</button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div onClick={() => setShowMediaFor({ field: 'equipo' })} className="aspect-video bg-white border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:border-[#AA0F16] hover:bg-red-50 transition">
                                                    <span className="text-[10px] font-black uppercase text-slate-400">Añadir Imagen Principal</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400">Dato (Ej. +50)</label>
                                                <input
                                                    type="text"
                                                    value={formData.inicio_equipo.statNum}
                                                    onChange={e => setFormData({ ...formData, inicio_equipo: { ...formData.inicio_equipo, statNum: e.target.value } })}
                                                    className="w-full px-4 py-3 bg-white border border-slate-200 text-xs font-black outline-none focus:border-black"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400">Texto del Dato</label>
                                                <input
                                                    type="text"
                                                    value={formData.inicio_equipo.statText}
                                                    onChange={e => setFormData({ ...formData, inicio_equipo: { ...formData.inicio_equipo, statText: e.target.value } })}
                                                    className="w-full px-4 py-3 bg-white border border-slate-200 text-xs font-bold outline-none focus:border-black uppercase"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Editor General para otras páginas */}
                    {formData.slug !== 'mision-vision' && formData.slug !== 'historia' && formData.slug !== 'inicio' && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black uppercase text-slate-400">Contenido de la Página</label>
                                <span className="bg-slate-100 px-3 py-1 text-[8px] font-black uppercase">Editor de Texto Libre</span>
                            </div>
                            <RichTextEditor
                                value={formData.general_content}
                                onChange={(val) => setFormData({ ...formData, general_content: val })}
                            />
                        </div>
                    )}

                    <div className="pt-8 border-t border-slate-100">
                        <button type="submit" className="w-full py-5 bg-black text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-[#AA0F16] transition-all">
                            Guardar Cambios en {formData.title}
                        </button>
                    </div>
                </form>
            )}

            <div className="grid md:grid-cols-2 gap-6">
                {pages.map((page) => (
                    <div key={page.id} className="bg-white p-10 border-2 border-slate-100 shadow-sm hover:border-[#AA0F16] transition group relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition">
                            <span className="text-4xl">📝</span>
                        </div>
                        <h3 className="text-2xl font-black text-black uppercase tracking-tighter italic m-0">{page.title}</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Personalización Activa</p>
                        <div className="mt-8 flex gap-6">
                            <button onClick={() => handleEdit(page)} className="bg-black text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#AA0F16] transition">Configurar</button>
                            <button onClick={() => handleDelete(page.id)} className="text-[10px] font-black uppercase text-slate-300 hover:text-red-600 transition">Eliminar</button>
                        </div>
                    </div>
                ))}
                {showMediaFor && (
                    <MediaSelector
                        onClose={() => setShowMediaFor(null)}
                        onSelect={(media) => {
                            if (showMediaFor.field === 'slide' && typeof showMediaFor.index === 'number') {
                                const newSlides = [...formData.inicio_slides];
                                newSlides[showMediaFor.index].image = media.url;
                                setFormData({ ...formData, inicio_slides: newSlides });
                            } else if (showMediaFor.field === 'equipo') {
                                setFormData({ ...formData, inicio_equipo: { ...formData.inicio_equipo, image: media.url } });
                            }
                            setShowMediaFor(null);
                        }}
                    />
                )}
            </div>
        </div>
    );
}

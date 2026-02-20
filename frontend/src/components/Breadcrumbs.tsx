'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
    label: string;
    href: string;
}

export default function Breadcrumbs() {
    const pathname = usePathname();

    // No mostrar breadcrumbs en la página de inicio
    if (pathname === '/') return null;

    const pathSegments = pathname.split('/').filter(Boolean);

    const breadcrumbs: BreadcrumbItem[] = [
        { label: 'Inicio', href: '/' },
    ];

    // Mapeo de rutas a nombres legibles
    const routeNames: Record<string, string> = {
        'nosotros': 'Nosotros',
        'historia': 'Historia',
        'mision-vision': 'Misión y Visión',
        'comunidad': 'Comunidad Educativa',
        'equipo': 'Equipo Humano',
        'grados': 'Grados',
        'plan-estudio': 'Plan de Estudio',
        'castellano': 'Castellano',
        'matematica': 'Matemática',
        'ciencias-sociales': 'Ciencias Sociales',
        'ciencias-naturales': 'Ciencias Naturales',
        'ingles': 'Inglés',
        'orientacion': 'Orientación Escolar',
        'expresarte': 'Eje Expresarte',
        'cientifico-tecnologico': 'Eje Científico Tecnológico',
        'pastoral': 'Pastoral',
        'comision-verdad': 'Comisión de la Verdad',
        'pastoral-orientacion': 'Orientación Escolar',
        'pastoral-general': 'Pastoral General',
        'proyecto-transversal': 'Proyecto Transversal',
        'contacto': 'Contáctanos',
    };

    let currentPath = '';
    pathSegments.forEach((segment) => {
        currentPath += `/${segment}`;
        breadcrumbs.push({
            label: routeNames[segment] || segment,
            href: currentPath,
        });
    });

    return (
        <nav className="bg-slate-50 border-b border-slate-200 py-4" aria-label="Breadcrumb">
            <div className="container mx-auto px-4">
                <ol className="flex items-center gap-2 text-sm">
                    {breadcrumbs.map((crumb, index) => (
                        <li key={crumb.href} className="flex items-center gap-2">
                            {index > 0 && (
                                <span className="text-slate-400 font-black">/</span>
                            )}
                            {index === breadcrumbs.length - 1 ? (
                                <span className="text-[#AA0F16] font-black uppercase tracking-wider">
                                    {crumb.label}
                                </span>
                            ) : (
                                <Link
                                    href={crumb.href}
                                    className="text-black hover:text-[#AA0F16] transition-colors font-bold uppercase tracking-wider text-xs"
                                >
                                    {crumb.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    );
}

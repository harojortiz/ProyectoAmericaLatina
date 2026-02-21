import prisma from './utils/prisma';

async function main() {
    const existing = await prisma.institutionPage.findUnique({ where: { slug: 'inicio' } });
    if (!existing) {
        await prisma.institutionPage.create({
            data: {
                title: 'Portada',
                slug: 'inicio',
                section: 'inicio',
                content: JSON.stringify({
                    slides: [
                        {
                            title: "Promoción 2025",
                            subtitle: "Liderando con Fe y Alegría",
                            image: "https://images.unsplash.com/photo-1523050853064-0097f5737604?q=80&w=2070&auto=format&fit=crop",
                            tag: "ESTUDIANTES"
                        }
                    ],
                    accesos: [
                        { icon: '🎓', perfil: 'Perfil 01', title: 'Soy Estudiante', description: 'Accede a notas, aula virtual, horarios y calendario académico.', linkText: 'Ingresar al Portal', linkHref: '/estudiantes' },
                        { icon: '👪', perfil: 'Perfil 02', title: 'Soy Acudiente', description: 'Consulta circulares, estado de cuenta, citaciones y contacto directo.', linkText: 'Gestión Familiar', linkHref: '/padres' },
                        { icon: '📝', perfil: 'Perfil 03', title: 'Busco Cupo', description: 'Conoce nuestro proyecto educativo, costos y proceso de admisión 2026.', linkText: 'Iniciar Proceso', linkHref: '/admisiones' }
                    ],
                    equipo: {
                        gesto: "Nuestro Gesto Institucional",
                        titulo: "Equipo",
                        tituloHighlight: "IDEAL",
                        subtitulo: "Pasión por la enseñanza y el progreso educativo",
                        descripcion: "Contamos con profesionales altamente calificados, comprometidos con los valores de Fe y Alegría para guiar a nuestros estudiantes.",
                        statNum: "+50",
                        statText: "Docentes Comprometidos",
                        image: "https://images.unsplash.com/photo-1544717297-fa15739a544e?q=80&w=2070&auto=format&fit=crop"
                    }
                })
            }
        });
        console.log('Inicio page created!');
    } else {
        console.log('Inicio page already exists.');
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());

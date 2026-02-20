import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const areas = [
        {
            name: 'Castellano',
            slug: 'castellano',
            description: 'Área de Lengua Castellana y Literatura, enfocada en la expresión y análisis crítico.',
            content: 'El área de Castellano busca desarrollar en los estudiantes habilidades comunicativas integrales (leer, escribir, hablar y escuchar) a través del estudio de la literatura y la gramática proyectada hacia la comprensión del mundo.',
        },
        {
            name: 'Matemática',
            slug: 'matematica',
            description: 'Pensamiento lógico y resolución de problemas aplicados a la vida real.',
            content: 'Las matemáticas en nuestra institución son vistas como un lenguaje universal que permite al estudiante modelar situaciones, analizar datos y tomar decisiones fundamentadas en el rigor lógico.',
        },
        {
            name: 'Ciencias Sociales',
            slug: 'ciencias-sociales',
            description: 'Estudio de la realidad histórica, geográfica y ciudadana.',
            content: 'Buscamos formar ciudadanos críticos que comprendan su pasado para transformar su presente, promoviendo valores democráticos y el respeto por la diversidad cultural.',
        },
        {
            name: 'Ciencias Naturales',
            slug: 'ciencias-naturales',
            description: 'Exploración del método científico y la preservación del medio ambiente.',
            content: 'Desde la biología, física y química, fomentamos la curiosidad científica y el compromiso con la sostenibilidad ambiental y el cuidado de la casa común.',
        },
        {
            name: 'Inglés',
            slug: 'ingles',
            description: 'Formación en lengua extranjera para la comunicación global.',
            content: 'Nuestro programa de inglés se orienta a la adquisición de una segunda lengua como herramienta de apertura cultural y competitividad académica en un mundo interconectado.',
        }
    ];

    console.log('Seeding areas...');

    for (const area of areas) {
        await prisma.area.upsert({
            where: { slug: area.slug },
            update: area,
            create: area,
        });
    }

    console.log('Areas seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

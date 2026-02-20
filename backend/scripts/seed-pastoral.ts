import prisma from '../src/utils/prisma';
import dotenv from 'dotenv';
dotenv.config();

// const prisma = new PrismaClient(); // REMOVED

async function main() {
    const pastoralItems = [
        {
            title: 'Comisión de la Verdad',
            slug: 'comision-verdad',
            section: 'pastoral',
            description: 'Espacio de memoria, justicia y reparación desde la fe y la esperanza.',
            content: 'La Comisión de la Verdad en nuestra institución es un compromiso con la reconstrucción del tejido social. A través del diálogo y la memoria, buscamos formar ciudadanos conscientes de su historia y constructores de paz.'
        },
        {
            title: 'Orientación Escolar (Pastoral)',
            slug: 'pastoral-orientacion',
            section: 'pastoral',
            description: 'Acompañamiento integral para el bienestar emocional y espiritual de la comunidad.',
            content: 'La orientación escolar desde la pastoral integra el cuidado del alma con el desarrollo psicopedagógico. Ofrecemos un oído atento y guía profesional para nuestros estudiantes y familias.'
        },
        {
            title: 'Pastoral General',
            slug: 'pastoral-general',
            section: 'pastoral',
            description: 'El corazón de nuestra misión evangelizadora y educativa.',
            content: 'Nuestra pastoral general coordina las actividades de fe, servicio y comunidad. Desde las asambleas hasta los proyectos de solidaridad, todo lo hacemos bajo el lema de Fe y Alegría.'
        }
    ];

    console.log('Seeding Pastoral items...');

    for (const item of pastoralItems) {
        await prisma.institutionPage.upsert({
            where: { slug: item.slug },
            update: item,
            create: item,
        });
    }

    console.log('Pastoral items seeded successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

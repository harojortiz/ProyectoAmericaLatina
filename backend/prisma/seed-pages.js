const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const connectionString = process.env.DATABASE_URL;

async function run() {
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    const pages = [
        {
            title: 'Nuestra Historia',
            slug: 'historia',
            section: 'nosotros',
            description: 'Desde 1955 construyendo esperanza',
            content: JSON.stringify({
                hitos: [
                    {
                        titulo: 'José María Vélaz, s.j.',
                        texto: 'Nacido en Chile, el Padre Vélaz soñó con una red de escuelas en los lugares más olvidados. Su motivación le llevó a buscar aliados en jóvenes universitarios e iniciar su trabajo con las comunidades en 1960. Los colaboradores iban con Fe y regresaban con Alegría.'
                    },
                    {
                        titulo: 'Abraham Reyes y Patricia García',
                        texto: 'Esta pareja de esposos cedió su propio hogar, un pequeño ranchito que estaban construyendo con esfuerzo, para que se convirtiera en la primera escuela de lo que hoy es un movimiento internacional de educación popular.'
                    }
                ]
            })
        },
        {
            title: 'Misión y Visión',
            slug: 'mision-vision',
            section: 'nosotros',
            description: 'Identidad Institucional',
            content: JSON.stringify({
                mision: 'Fe y Alegría es un Movimiento de Educación Popular Integral y Promoción Social, cuya acción se dirige a sectores empobrecidos y excluidos. Formamos personas libres, críticas y comprometidas con la transformación de su realidad.',
                vision: 'Seremos reconocidos como una institución líder en educación de calidad, cimentada en el amor y el servicio. Proyectamos un colegio donde cada estudiante sea protagonista de su proyecto de vida.'
            })
        }
    ];

    console.log('Sincronizando contenidos protegidos...');
    for (const page of pages) {
        await prisma.institutionPage.upsert({
            where: { slug: page.slug },
            update: {
                title: page.title,
                section: page.section,
                description: page.description,
                content: page.content
            },
            create: page
        });
    }
    console.log('Exito');
    await prisma.$disconnect();
    await pool.end();
}

run().catch(console.error);

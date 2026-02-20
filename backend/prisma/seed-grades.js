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

    const grades = [
        { name: 'Transición A', section: 'PREESCOLAR', description: 'Nuestros pequeños gigantes iniciando su camino.', order: 1 },
        { name: 'Grado 5°B', section: 'PRIMARIA', description: 'Liderazgo y compañerismo en el cierre de la etapa primaria.', order: 2 },
        { name: 'Once 2026', section: 'SECUNDARIA', description: 'Próximos bachilleres, constructores de sociedad.', order: 3 }
    ];

    console.log('Sembrando grados...');
    for (const g of grades) {
        await prisma.grade.upsert({
            where: { id: 'temp-' + g.name }, // Dummy fallback
            update: {},
            create: g
        }).catch(() => {
            // Si el upsert por ID falla porque no existe, forzamos creación simple
            return prisma.grade.create({ data: g });
        });
    }
    console.log('Exito');
    await prisma.$disconnect();
    await pool.end();
}

run().catch(console.error);

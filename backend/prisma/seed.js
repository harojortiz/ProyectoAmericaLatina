const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const superAdminEmail = 'superadmin@school.edu';
    const hashedPassword = await bcrypt.hash('admin1234', 10);

    const superAdmin = await prisma.user.upsert({
        where: { email: superAdminEmail },
        update: {},
        create: {
            email: superAdminEmail,
            password: hashedPassword,
            fullName: 'Super Administrator',
            role: 'SUPER_ADMIN',
        },
    });

    console.log('SuperAdmin creado:', superAdmin.email);

    const categories = ['Institucional', 'Docentes', 'Eventos', 'Gerencia', 'Académico'];
    for (const name of categories) {
        await prisma.category.upsert({
            where: { name },
            update: {},
            create: { name },
        });
    }
    console.log('Categorías inicializadas.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
        await pool.end();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        await pool.end();
        process.exit(1);
    });


import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Role } from './src/utils/roles';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const username = 'SADMINVH';
    const password = 'V995dvtihEdfbrR1';
    const fullName = 'Super Admin Institucional';

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                fullName,
                role: Role.SUPER_ADMIN,
                pinCode: '000000'
            }
        });

        console.log('✅ Usuario Super Admin creado exitosamente:');
        console.log(`   Usuario: ${user.username}`);
        console.log(`   Password: ${password}`);
        console.log(`   Role: ${user.role}`);
    } catch (error) {
        console.error('❌ Error al crear el usuario:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();

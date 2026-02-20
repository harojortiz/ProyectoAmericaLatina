import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

import 'dotenv/config';

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    // 1. Crear SADMINVH (Super Admin solicitado)
    const sadminUsername = 'SADMINVH';
    const sadminPassword = await bcrypt.hash('V995dvtihEdfbrR1', 10);

    await prisma.user.upsert({
        where: { username: sadminUsername },
        update: {},
        create: {
            username: sadminUsername,
            email: 'sadminvh@americalatina.edu.co', // Opcional pero útil tenerlo
            password: sadminPassword,
            fullName: 'Super Admin Institucional',
            role: Role.SUPER_ADMIN,
        },
    });

    console.log('✅ Usuario SADMINVH restaurado/creado.');

    // 2. Crear categorías base
    const categories = ['Institucional', 'Docentes', 'Eventos', 'Administrativo', 'Académico', 'Pastoral'];
    for (const name of categories) {
        await prisma.category.upsert({
            where: { name },
            update: {},
            create: { name },
        });
    }
    console.log('✅ Categorías base restauradas.');

    // 3. Restaurar Páginas Institucionales (Misión, Visión, Historia)

    // Misión y Visión
    const misionVisionData = {
        title: 'Misión y Visión',
        slug: 'mision-vision',
        section: 'nosotros',
        description: 'Identidad Institucional',
        content: JSON.stringify({
            mision: "<p>Ser un actor de construcción de paz y ciudadanía, que contribuye a la movilidad social, la equidad y la vida digna para las personas en condiciones de vulnerabilidad, pobreza y exclusión. Para lograr este propósito, Fe y Alegría trabaja por mejorar la educación pública y por generar y potenciar capacidades en los niños, niñas, adolescentes y personas adultas para que sean agentes de cambio de sus propias vidas y de sus entornos.</p>",
            vision: "<p>Fe y Alegría Colombia será reconocida como un actor que lidera, ejecuta y articula iniciativas con el Estado, la sociedad civil y las empresas, educando, formando y motivando a la población más vulnerable y excluida en el país. Habrá fortalecido sus alianzas y definido nuevas iniciativas de trabajo conjunto con actores de fortalezas y experticias complementarias. Fe y Alegría se destacará por innovar en su oferta de servicios, incursionado en la educación terciaria y expandiendo su accionar hacia nuevos territorios, priorizando zonas rurales, con baja presencia del Estado y alta incidencia de conflicto. Fe y Alegría será un referente por su historia, sus logros y su misión, posicionándose como una organización ejemplar por su amplia trayectoria, la calidad de su trabajo y la vocación, rigurosidad y preparación de su equipo humano.</p>"
        })
    };

    await prisma.institutionPage.upsert({
        where: { slug: 'mision-vision' },
        update: misionVisionData,
        create: misionVisionData
    });

    // Historia
    const historiaData = {
        title: 'Nuestra Historia',
        slug: 'historia',
        section: 'nosotros',
        description: 'Un legado de servicio',
        content: JSON.stringify({
            hitos: [
                {
                    titulo: "1971 - Fundación",
                    texto: "<p><strong>1 de junio de 1971.</strong> Se obtiene la Personería Jurídica 4277 el 10 de diciembre. Fe y Alegría comienza su obra como parte de la Compañía de Jesús.</p>"
                },
                {
                    titulo: "1971–1972: P. Armando Aguilar S.J.",
                    texto: "<p>Fundador de las oficinas de Bogotá, Medellín, Cúcuta y Cali. Inició la famosa rifa nacional y la Campaña del Corazoncito. Logró comprometer a comunidades religiosas para dirigir los centros educativos.</p>"
                },
                {
                    titulo: "1973–1974: P. Antonio Bernal S.J.",
                    texto: "<p>Acompañó los procesos iniciados por las comunidades religiosas en la dirección de los centros, consolidando la estructura operativa.</p>"
                },
                {
                    titulo: "1974: P. Luis Guillermo Vélez S.J.",
                    texto: "<p>Dio un gran impulso al movimiento, logrando el mayor crecimiento con el inicio de nuevos centros. Se fundaron las actuales Regionales de Antioquia, Cali, Cartagena y Costa.</p>"
                },
                {
                    titulo: "1983: P. Roberto Caro S.J.",
                    texto: "<p>Impulsó el <strong>Ideario Internacional</strong> con participación de los trabajadores y consolidó la identidad del movimiento. Logró el convenio con el Ministerio de Educación para la administración de centros y creó el boletín 'Compartir con Fe y Alegría'.</p>"
                },
                {
                    titulo: "1989–1994: P. Adán Londoño S.J.",
                    texto: "<p>Implementó la modernización administrativa y el <strong>Proyecto Educativo Comunitario</strong>. Creó los equipos pedagógicos nacionales y regionales, organizó las Olimpiadas de Fe y Alegría y adquirió la sede nacional actual.</p>"
                },
                {
                    titulo: "1995–2007: Manuel Uribe Ramón S.J.",
                    texto: "<p>Promovió el primer Plan de Acción Institucional y la incursión en la administración de <strong>Colegios en Concesión</strong>. Diseñó propuestas pedagógicas clave y el plan estratégico 'Apuestas y desafíos 2005-2009'.</p>"
                },
                {
                    titulo: "2008: Fernando Mendoza S.J.",
                    texto: "<p>Impulsó la participación en licitaciones de colegios en concesión y avanzó en el diseño del Sistema de Gestión de la Mejora Continua para garantizar servicios de calidad.</p>"
                },
                {
                    titulo: "2009: Carlos Vázquez S.J.",
                    texto: "<p>Abrió nuevas fronteras llevando a Fe y Alegría al departamento del Guainía en colaboración con la Vicaría de Inírida, apoyando programas de educación inicial.</p>"
                },
                {
                    titulo: "2010–2022: Víctor Murillo",
                    texto: "<p>Primer Director laico. Impulsó la <strong>Dirección Democrática y Participativa</strong>. Fortaleció la calidad educativa, la educación técnica y el Sistema de Mejora. Creó la 'Nueva Partitura de Fe y Alegría' para responder a nuevas necesidades sociales.</p>"
                },
                {
                    titulo: "2022 – Actualidad: P. Juan Manuel Montoya, S.J.",
                    texto: "<p>Con amplia formación en filosofía, teología y administración (MBA), 'Juma' asume el liderazgo aportando su experiencia como Director de Pastoral y docente. Continúa fortaleciendo la misión educativa y evangelizadora del movimiento con un enfoque integral.</p>"
                }
            ]
        })
    };

    await prisma.institutionPage.upsert({
        where: { slug: 'historia' },
        update: historiaData,
        create: historiaData
    });

    console.log('✅ Páginas institucionales (Misión, Visión, Historia) restauradas.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    console.error('DATABASE_URL no encontrada en .env');
    process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const pages = [
        {
            title: 'Nuestra Historia',
            slug: 'historia',
            section: 'nosotros',
            description: 'Desde 1955 construyendo esperanza',
            content: `
                <div class="space-y-12">
                    <div class="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 class="text-4xl font-black text-[#AA0F16] uppercase italic m-0">José María Vélaz, s.j.</h2>
                            <h4 class="text-black font-black uppercase tracking-widest text-xs mt-2">El fundador y visionario</h4>
                            <p class="text-slate-700 leading-relaxed text-lg font-medium italic border-l-4 border-[#AA0F16] pl-6 py-2 bg-slate-50 mt-6">
                                "Quien por vivir en el amor sirve a sus hermanos por amor, vive ya en la tierra la felicidad."
                            </p>
                            <p class="text-slate-600 mt-6 leading-relaxed">Nacido en Chile, el Padre Vélaz soñó con una red de escuelas en los lugares más olvidados. Su motivación le llevó a buscar aliados en jóvenes universitarios e iniciar su trabajo con las comunidades en 1960.</p>
                        </div>
                        <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" class="w-full grayscale border-8 border-slate-50 shadow-xl" />
                    </div>
                    <div class="grid md:grid-cols-2 gap-12 items-center">
                        <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" class="w-full border-8 border-slate-50 shadow-xl md:order-2" />
                        <div class="md:order-1">
                            <h2 class="text-4xl font-black text-[#AA0F16] uppercase italic m-0">Abraham Reyes y Patricia García</h2>
                            <h4 class="text-black font-black uppercase tracking-widest text-xs mt-2">Los auténticos gestores</h4>
                            <blockquote class="text-xl text-black italic font-black leading-tight border-b-2 border-[#AA0F16] pb-4 mt-6">
                                "Si me quedo con ella, será la casa de mis ocho hijos. Pero si la hacemos escuela, será la casa de todos los hijos del barrio"
                            </blockquote>
                            <p class="text-slate-600 mt-6 leading-relaxed">Esta pareja de esposos cedió su propio hogar, un pequeño ranchito que estaban construyendo con esfuerzo, para que se convirtiera en la primera escuela de lo que hoy es un movimiento internacional de educación popular.</p>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: 'Misión y Visión',
            slug: 'mision-vision',
            section: 'nosotros',
            description: 'Identidad Institucional',
            content: `
                <div class="space-y-24">
                    <section class="grid md:grid-cols-2 gap-12 items-center">
                        <div class="space-y-6">
                            <h2 class="text-5xl font-black text-black italic uppercase m-0">Nuestra Misión</h2>
                            <p class="text-xl text-slate-700 leading-relaxed font-medium">Fe y Alegría es un Movimiento de Educación Popular Integral y Promoción Social, cuya acción se dirige a sectores empobrecidos y excluidos.</p>
                            <div class="p-8 bg-slate-50 border-l-4 border-[#AA0F16]">
                                <p class="text-slate-600 italic">"Formamos personas libres, críticas y comprometidas con la transformación de su realidad, inspiradas en los valores del Evangelio."</p>
                            </div>
                        </div>
                        <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop" class="w-full aspect-square object-cover grayscale brightness-50 shadow-2xl" />
                    </section>
                    <section class="bg-black text-white p-16 -mx-16 text-center space-y-8">
                        <h2 class="text-6xl font-black text-[#AA0F16] italic uppercase m-0">Nuestra Visión</h2>
                        <p class="text-2xl leading-tight max-w-3xl mx-auto">Seremos reconocidos como una institución líder en educación de calidad, cimentada en el amor y el servicio.</p>
                        <p class="text-white/60 text-lg">Proyectamos un colegio donde cada estudiante sea protagonista de su proyecto de vida en los próximos 10 años.</p>
                    </section>
                </div>
            `
        },
        {
            title: 'Proyecto Transversal',
            slug: 'proyecto-transversal',
            section: 'otros',
            description: 'Cátedra de Paz y Formación Ciudadana',
            content: `
                <div class="space-y-12">
                    <div class="bg-slate-50 p-12 border-l-[16px] border-[#AA0F16] shadow-xl">
                        <h2 class="text-4xl font-black text-black uppercase italic m-0">Cátedra de Paz</h2>
                        <p class="text-lg text-slate-700 mt-4">Nuestra Cátedra de Paz no es solo una materia; es un compromiso vivo con la convivencia y la justicia social en el barrio.</p>
                    </div>
                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="space-y-4">
                            <h3 class="text-2xl font-black text-[#AA0F16] uppercase">Objetivo General</h3>
                            <p class="text-slate-600">Formar ciudadanos capaces de resolver conflictos de manera pacífica, promoviendo el respeto mutuo.</p>
                        </div>
                        <div class="space-y-4">
                            <h3 class="text-2xl font-black text-black uppercase">Impacto Social</h3>
                            <p class="text-slate-600">El proyecto trasciende las paredes del colegio, llevando valores de paz a las familias del entorno.</p>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: 'Orientación Escolar',
            slug: 'orientacion',
            section: 'orientacion',
            description: 'Acompañamiento Psicosocial',
            content: `
                <div class="space-y-12 text-center">
                    <h2 class="text-5xl font-black text-black italic uppercase m-0">Bienestar Estudiantil</h2>
                    <p class="text-2xl italic text-slate-500">"Un espacio de escucha, apoyo y crecimiento para estudiantes y familias."</p>
                    <div class="grid md:grid-cols-2 gap-6 text-left mt-12">
                        <div class="p-10 border-2 border-slate-100 bg-white shadow-xl hover:border-[#AA0F16] transition group">
                            <h4 class="text-2xl font-black text-black uppercase mb-4 group-hover:text-[#AA0F16]">Apoyo Psicoemocional</h4>
                            <p class="text-slate-600 leading-relaxed">Brindamos herramientas para el manejo de emociones, resolución de conflictos y salud mental.</p>
                        </div>
                        <div class="p-10 border-2 border-slate-100 bg-white shadow-xl hover:border-[#AA0F16] transition group">
                            <h4 class="text-2xl font-black text-black uppercase mb-4 group-hover:text-[#AA0F16]">Proyecto de Vida</h4>
                            <p class="text-slate-600 leading-relaxed">Acompañamos a nuestros jóvenes en la definición de sus metas académicas y personales.</p>
                        </div>
                    </div>
                </div>
            `
        }
    ];

    console.log('Iniciando sincronización de contenido...');

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
        console.log(\`Pagina "\${page.title}" sincronizada exitosamente.\`);
    }
}

main()
    .catch((e) => {
        console.error('Error durante la sincronizacion:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });

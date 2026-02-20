'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { Post, Event } from '@/types';
import { apiFetch, MEDIA_URL } from '@/lib/api';
import { PostsGridSkeleton } from '@/components/SkeletonLoaders';
import Image from 'next/image';

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  // Auto-rotar noticias cada 6 segundos
  useEffect(() => {
    if (posts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % posts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [posts.length]);

  const slides = [
    {
      title: "Promoción 2025",
      subtitle: "Liderando con Fe y Alegría",
      image: "https://images.unsplash.com/photo-1523050853064-0097f5737604?q=80&w=2070&auto=format&fit=crop",
      tag: "ESTUDIANTES"
    },
    {
      title: "Equipo IDEAL",
      subtitle: "Pasión por la enseñanza y el progreso",
      image: "https://images.unsplash.com/photo-1544717297-fa15739a544e?q=80&w=2070&auto=format&fit=crop",
      tag: "DOCENTES"
    },
    {
      title: "Excelencia Académica",
      subtitle: "Construyendo el futuro de nuestra comunidad",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop",
      tag: "ACADEMIA"
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Datos de demostración para visualización inmediata
  const DEMO_POSTS: Post[] = [
    {
      id: 'demo-1',
      title: 'Inauguración del Nuevo Laboratorio de Ciencias',
      content: 'Gracias al apoyo de la comunidad y la gestión directiva, hoy abrimos las puertas de nuestro moderno laboratorio de biología y química, equipado con tecnología de punta para potenciar el aprendizaje científico de nuestros estudiantes.',
      published: true,
      author: { fullName: 'Dirección Académica', role: 'SUPER_ADMIN' },
      category: { name: 'Infraestructura' },
      media: [{ id: 'm1', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2000&auto=format&fit=crop', type: 'image', filename: 'lab.jpg' }],
      createdAt: new Date().toISOString()
    },
    {
      id: 'demo-2',
      title: 'Feria de Emprendimiento Escolar 2025',
      content: 'Nuestros estudiantes de media técnica presentaron sus proyectos de emprendimiento ante jurados externos. Desde soluciones tecnológicas hasta productos artesanales, el talento de Fe y Alegría brilló con luz propia.',
      published: true,
      author: { fullName: 'Coordinación Técnica', role: 'DOCENTE' },
      category: { name: 'Eventos' },
      media: [{ id: 'm2', url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000&auto=format&fit=crop', type: 'image', filename: 'feria.jpg' }],
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 'demo-3',
      title: 'Jornada de Paz y Reconciliación',
      content: 'Toda la comunidad educativa se unió en una jornada reflexiva sobre la importancia del diálogo y la convivencia pacífica. Talleres, puestas en escena y conversatorios marcaron este día especial.',
      published: true,
      author: { fullName: 'Pastoral', role: 'DOCENTE' },
      category: { name: 'Pastoral' },
      media: [{ id: 'm3', url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2000&auto=format&fit=crop', type: 'image', filename: 'paz.jpg' }],
      createdAt: new Date(Date.now() - 172800000).toISOString()
    },
    {
      id: 'demo-4',
      title: 'Campeones Intercolegiados de Fútbol',
      content: '¡Orgullo institucional! Nuestra selección masculina sub-17 se coronó campeona en los juegos intercolegiados distritales tras una emocionante final. Felicitaciones a nuestros deportistas.',
      published: true,
      author: { fullName: 'Deportes', role: 'DOCENTE' },
      category: { name: 'Deportes' },
      media: [{ id: 'm4', url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2000&auto=format&fit=crop', type: 'image', filename: 'futbol.jpg' }],
      createdAt: new Date(Date.now() - 259200000).toISOString()
    },
    {
      id: 'demo-5',
      title: 'Abiertas Inscripciones Año Lectivo 2026',
      content: 'Iniciamos el proceso de admisión para nuevos estudiantes. Invitamos a las familias interesadas a acercarse a secretaría académica para conocer los requisitos y fechas clave.',
      published: true,
      author: { fullName: 'Secretaría', role: 'SUPER_ADMIN' },
      category: { name: 'Admisiones' },
      media: [{ id: 'm5', url: 'https://images.unsplash.com/photo-1427504746696-ea5abd7dfe88?q=80&w=2000&auto=format&fit=crop', type: 'image', filename: 'admisiones.jpg' }],
      createdAt: new Date(Date.now() - 345600000).toISOString()
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await apiFetch('/posts/public');
        const eventsData = await apiFetch('/events/public');

        // Si hay datos reales, usarlos. Si no, usar DEMO.
        if (postsData && postsData.length > 0) {
          setPosts(postsData);
        } else {
          console.log('Usando datos de demostración para noticias'); // Debug
          setPosts(DEMO_POSTS);
        }

        setEvents(eventsData.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data', error);
        // En caso de error de conexión, también usar DEMO
        setPosts(DEMO_POSTS);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section con Carrusel Interactivo e Iluminado */}
      <section className="relative h-[500px] md:h-[650px] w-full overflow-hidden bg-white">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${index === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10"></div>
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-center">
              <div className={`transition-all duration-1000 delay-300 transform ${index === currentSlide ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
                }`}>
                <span className="bg-[#AA0F16] text-white text-xs font-black px-4 py-1 tracking-[0.3em] uppercase mb-4 inline-block shadow-lg">
                  {slide.tag}
                </span>
                <h2 className="text-white text-4xl sm:text-6xl md:text-9xl font-black mb-4 tracking-tighter italic m-0 drop-shadow-2xl leading-none">
                  {slide.title}
                </h2>
                <p className="text-white font-bold text-lg md:text-3xl mb-8 md:mb-12 max-w-2xl drop-shadow-lg">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap gap-4 md:gap-6">
                  <Link href="/noticias" className="px-8 md:px-12 py-4 md:py-5 bg-[#AA0F16] text-white font-black rounded-none hover:bg-black transition uppercase tracking-widest text-[10px] md:text-sm shadow-2xl">
                    Ver Más
                  </Link>
                  <Link href="/contacto" className="px-8 md:px-12 py-4 md:py-5 border-2 border-white text-white font-black rounded-none hover:bg-white hover:text-black transition uppercase tracking-widest text-[10px] md:text-sm backdrop-blur-sm">
                    Contáctanos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Controles del Carrusel Suavizados */}
        <div className="absolute bottom-6 md:bottom-12 right-6 md:right-12 z-30 flex gap-2 md:gap-4">
          <button onClick={prevSlide} className="w-10 h-10 md:w-14 md:h-14 border border-white/40 text-white flex items-center justify-center hover:bg-[#AA0F16] hover:border-[#AA0F16] transition rounded-full backdrop-blur-md cursor-pointer text-sm">
            &larr;
          </button>
          <button onClick={nextSlide} className="w-10 h-10 md:w-14 md:h-14 border border-white/40 text-white flex items-center justify-center hover:bg-[#AA0F16] hover:border-[#AA0F16] transition rounded-full backdrop-blur-md cursor-pointer text-sm">
            &rarr;
          </button>
        </div>
      </section>

      {/* Accesos Rápidos por Perfil */}
      <section className="bg-[#AA0F16] py-12 border-b border-red-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-16 md:-mt-24 relative z-40">
            {/* Estudiantes */}
            <div className="bg-white p-6 md:p-8 shadow-2xl rounded-sm border-l-8 border-black transform transition hover:-translate-y-2 group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <span className="text-3xl md:text-4xl">🎓</span>
                <span className="text-[#AA0F16] font-black text-[10px] uppercase tracking-widest opacity-50">Perfil 01</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2 group-hover:text-[#AA0F16] transition-colors uppercase">Soy Estudiante</h3>
              <p className="text-slate-500 text-xs md:text-sm font-medium mb-6 leading-relaxed">Accede a notas, aula virtual, horarios y calendario académico.</p>
              <Link href="/estudiantes" className="inline-flex items-center text-[10px] font-black text-black uppercase tracking-widest group-hover:underline">
                Ingresar al Portal <span className="ml-2 text-[#AA0F16]">&rarr;</span>
              </Link>
            </div>

            {/* Padres */}
            <div className="bg-white p-6 md:p-8 shadow-2xl rounded-sm border-l-8 border-black transform transition hover:-translate-y-2 group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <span className="text-3xl md:text-4xl">👪</span>
                <span className="text-[#AA0F16] font-black text-[10px] uppercase tracking-widest opacity-50">Perfil 02</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2 group-hover:text-[#AA0F16] transition-colors uppercase">Soy Acudiente</h3>
              <p className="text-slate-500 text-xs md:text-sm font-medium mb-6 leading-relaxed">Consulta circulares, estado de cuenta, citaciones y contacto directo.</p>
              <Link href="/padres" className="inline-flex items-center text-[10px] font-black text-black uppercase tracking-widest group-hover:underline">
                Gestión Familiar <span className="ml-2 text-[#AA0F16]">&rarr;</span>
              </Link>
            </div>

            {/* Aspirantes */}
            <div className="bg-white p-6 md:p-8 shadow-2xl rounded-sm border-l-8 border-black transform transition hover:-translate-y-2 group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <span className="text-3xl md:text-4xl">📝</span>
                <span className="text-[#AA0F16] font-black text-[10px] uppercase tracking-widest opacity-50">Perfil 03</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2 group-hover:text-[#AA0F16] transition-colors uppercase">Busco Cupo</h3>
              <p className="text-slate-500 text-xs md:text-sm font-medium mb-6 leading-relaxed">Conoce nuestro proyecto educativo, costos y proceso de admisión 2026.</p>
              <Link href="/admisiones" className="inline-flex items-center text-[10px] font-black text-black uppercase tracking-widest group-hover:underline">
                Iniciar Proceso <span className="ml-2 text-[#AA0F16]">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Franja Institucional (Separador) - Modificada a Blanca para limpiar */}
      <div className="h-12 w-full bg-white"></div>

      {/* Secciones Pilares */}
      <section className="py-24 bg-white border-b border-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-[#AA0F16] uppercase tracking-tighter italic">Nuestros Pilares</h2>
            <h4 className="text-black font-black mt-2 uppercase tracking-widest">Excelencia y Compromiso</h4>
            <div className="h-1.5 w-24 bg-[#AA0F16] mt-6"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { title: 'PROYECTO TRANSVERSAL', icon: '🎨', href: '/proyecto-transversal' },
              { title: 'COMUNIDAD EDUCATIVA', icon: '👪', href: '/comunidad/equipo' },
              { title: 'PLAN DE ESTUDIO', icon: '📚', href: '/plan-estudio/matematica' },
              { title: 'PASTORAL', icon: '🕊️', href: '/pastoral/pastoral-general' },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="bg-white border-2 border-slate-100 p-6 md:p-10 flex flex-col items-center text-center shadow-lg hover:bg-[#AA0F16] hover:border-[#AA0F16] hover:-translate-y-3 transition-all duration-500 group no-underline"
              >
                <span className="text-4xl md:text-5xl mb-4 md:mb-6 group-hover:scale-110 group-hover:filter group-hover:brightness-0 group-hover:invert transition-transform">
                  {item.icon}
                </span>
                <h3 className="font-black text-base md:text-lg text-[#AA0F16] group-hover:text-white leading-tight mb-4 uppercase tracking-tighter transition-colors">
                  {item.title}
                </h3>
                <p className="text-black font-black text-[9px] md:text-[10px] uppercase opacity-40 group-hover:text-white group-hover:opacity-100 transition-all tracking-widest">
                  Saber más &rarr;
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Equipo IDEAL - Tema Blanco/Rojo */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 lg:items-center gap-16">
            <div className="space-y-8">
              <span className="text-black font-black tracking-[0.4em] uppercase text-sm border-l-4 border-[#AA0F16] pl-4">Nuestro Gesto Institucional</span>
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter italic leading-none text-[#AA0F16] m-0">
                Equipo <br /> <span className="text-black">IDEAL</span>
              </h2>
              <h4 className="text-black font-black text-lg md:text-xl uppercase tracking-tighter">Pasión por la enseñanza y el progreso educativo</h4>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-lg">
                Contamos con profesionales altamente calificados, comprometidos con los valores de Fe y Alegría para guiar a nuestros estudiantes.
              </p>
              <div className="pt-6">
                <Link href="/nosotros" className="px-10 py-5 bg-[#AA0F16] text-white font-black hover:bg-red-800 transition duration-300 uppercase tracking-widest text-xs inline-block">
                  Conoce al Equipo
                </Link>
              </div>
            </div>
            <div className="relative border-[8px] md:border-[16px] border-slate-50 shadow-2xl h-[300px] md:h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1544717297-fa15739a544e?q=80&w=2070&auto=format&fit=crop"
                fill
                className="object-cover rounded-none grayscale hover:grayscale-0 transition duration-1000"
                alt="Personal Docente"
              />
              <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 bg-[#AA0F16] p-6 md:p-10 z-20 text-white shadow-xl">
                <p className="text-2xl md:text-4xl font-black italic">+50</p>
                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest opacity-90 mt-1 md:mt-2">Docentes Comprometidos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Noticias - Tema Blanco/Rojo - Diseño Editorial Premium */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        {/* Adornos de Fondo */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#AA0F16]/5 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/5 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[#AA0F16] font-black tracking-[0.4em] uppercase text-xs mb-2 block">Actualidad</span>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter m-0 leading-none">
                Noticias <span className="text-[#AA0F16] italic serif">Recientes</span>
              </h2>
            </div>
            <Link href="/noticias" className="group flex items-center gap-2 text-xs font-black text-black uppercase tracking-widest hover:text-[#AA0F16] transition-colors">
              Explorar Todo
              <span className="w-8 h-[2px] bg-black group-hover:bg-[#AA0F16] transition-colors"></span>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 h-[600px] md:h-[500px]">
            {posts.length > 0 ? (() => {
              // Lógica circular para obtener las 3 noticias a mostrar
              const displayPosts = [
                posts[currentNewsIndex % posts.length],
                posts[(currentNewsIndex + 1) % posts.length],
                posts[(currentNewsIndex + 2) % posts.length]
              ].filter(Boolean); // Filtrar si hay menos de 3 posts totales

              return (
                <>
                  {/* Noticia Principal (Grande) */}
                  <article
                    key={displayPosts[0]?.id + '-main'}
                    className="md:col-span-2 group relative bg-white rounded-3xl overflow-hidden shadow-2xl cursor-pointer h-full animate-fade-in"
                  >
                    <div className="absolute inset-0">
                      {displayPosts[0]?.media?.[0] ? (
                        <Image
                          src={displayPosts[0].media[0].url.startsWith('http') ? displayPosts[0].media[0].url : `${MEDIA_URL}${displayPosts[0].media[0].url}`}
                          alt={displayPosts[0].title}
                          fill
                          className="object-cover transition duration-1000 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-200"></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    </div>

                    <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-14">
                      <span className="bg-[#AA0F16] text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest w-fit mb-4">
                        {displayPosts[0]?.category.name}
                      </span>
                      <h3 className="text-2xl md:text-5xl font-black text-white leading-none mb-4 md:mb-6 line-clamp-3">
                        {displayPosts[0]?.title}
                      </h3>
                      <p className="text-slate-300 text-xs md:text-base line-clamp-2 max-w-xl mb-6 md:mb-8">
                        {displayPosts[0]?.content}
                      </p>
                      <Link
                        href={`/noticias/${displayPosts[0]?.id}`}
                        className="text-white font-black text-xs uppercase tracking-[0.2em] hover:underline"
                      >
                        Leer Historia Completa →
                      </Link>
                    </div>
                  </article>

                  {/* Noticias Secundarias (Columna Derecha) */}
                  <div className="flex flex-col gap-8 h-full">
                    {displayPosts.slice(1).map((post, idx) => (
                      <article
                        key={post?.id || idx}
                        className="flex-1 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-slate-100 flex group/small cursor-pointer animate-fade-in-right"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <div className="w-1/3 relative overflow-hidden h-full">
                          {post?.media?.[0] ? (
                            <Image
                              src={post.media[0].url.startsWith('http') ? post.media[0].url : `${MEDIA_URL}${post.media[0].url}`}
                              alt={post.title}
                              fill
                              className="object-cover group-hover/small:scale-110 transition duration-700"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-100"></div>
                          )}
                        </div>
                        <div className="w-2/3 p-6 flex flex-col justify-center">
                          <div className="text-[#AA0F16] text-[10px] font-black uppercase tracking-widest mb-2">
                            {new Date(post?.createdAt || new Date()).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })}
                          </div>
                          <h4 className="font-bold text-slate-900 leading-tight line-clamp-2 group-hover/small:text-[#AA0F16] transition-colors mb-2">
                            {post?.title}
                          </h4>
                          <Link href={`/noticias/${post?.id}`} className="text-[10px] font-bold text-slate-400 uppercase mt-auto">
                            Leer más
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              );
            })() : (
              // Custom Skeleton for new layout
              <>
                <div className="md:col-span-2 bg-slate-200 rounded-2xl h-96 animate-pulse"></div>
                <div className="flex flex-col gap-8 h-full">
                  <div className="flex-1 bg-slate-200 rounded-2xl animate-pulse"></div>
                  <div className="flex-1 bg-slate-200 rounded-2xl animate-pulse"></div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer CTA - Rojo Intenso */}
      <section className="py-16 md:py-24 bg-[#AA0F16] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-black italic tracking-tighter mb-8 m-0 uppercase leading-none">
            Fe y Alegría <br className="md:hidden" /> Es Esperanza
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            <Link href="/contacto" className="px-8 md:px-12 py-4 md:py-5 bg-white text-[#AA0F16] font-black rounded-none shadow-2xl hover:bg-slate-100 transition duration-300 uppercase tracking-widest text-[10px] md:text-sm">
              Inscríbete Hoy
            </Link>
            <Link href="/nosotros" className="px-8 md:px-12 py-4 md:py-5 border-2 border-white text-white font-black rounded-none hover:bg-white/10 transition duration-300 uppercase tracking-widest text-[10px] md:text-sm">
              Conoce el Proyecto
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Post } from '@/types';
import { apiFetch } from '@/lib/api';

export default function PublicNewsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await apiFetch('/posts/public');
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Noticias Institucionales</h1>
                <p className="text-slate-500 max-w-2xl mx-auto">Mantente al día con los comunicados oficiales, logros académicos y novedades de nuestra comunidad.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                    <div className="col-span-3 text-center py-20">Cargando noticias...</div>
                ) : posts.length === 0 ? (
                    <div className="col-span-3 text-center py-20 text-slate-500 italic">No hay noticias publicadas.</div>
                ) : posts.map((post) => (
                    <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col hover:shadow-lg transition">
                        <div className="aspect-video bg-slate-100">
                            {post.media?.[0] && (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img src={post.media[0].url} alt={post.title} className="w-full h-full object-cover" />
                            )}
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <span className="text-xs font-bold text-red-600 uppercase mb-2">{post.category.name}</span>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">{post.title}</h2>
                            <div className="text-slate-600 text-sm mb-6 flex-grow line-clamp-3 prose-sm" dangerouslySetInnerHTML={{ __html: post.content }} />
                            <div className="flex items-center justify-between text-xs text-slate-400 border-t pt-4">
                                <span className="font-semibold text-slate-700">{post.author.fullName}</span>
                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

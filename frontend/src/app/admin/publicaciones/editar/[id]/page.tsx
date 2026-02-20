'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import PostForm from '@/components/PostForm';

export default function EditPostPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await apiFetch(`/posts`);
                const found = data.find((p: any) => p.id === id);
                setPost(found);
            } catch (error) {
                console.error('Error fetching post', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) return <div>Cargando...</div>;
    if (!post) return <div>Publicación no encontrada</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Editar Publicación</h2>
                <p className="text-slate-500">Actualiza el contenido de tu publicación.</p>
            </div>
            <PostForm initialData={post} isEditing={true} />
        </div>
    );
}

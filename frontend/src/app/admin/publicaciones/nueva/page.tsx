'use client';

import PostForm from '@/components/PostForm';

export default function NewPostPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Nueva Publicación</h2>
                <p className="text-slate-500">Comparte información, noticias o recursos con la comunidad.</p>
            </div>
            <PostForm />
        </div>
    );
}

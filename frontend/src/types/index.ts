export type Role = 'SUPER_ADMIN' | 'DIRECTIVO' | 'DOCENTE' | 'ADMINISTRATIVO';

export interface User {
    id: string;
    email: string;
    fullName: string;
    role: Role;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    published: boolean;
    author: { fullName: string; role: Role };
    category: { name: string };
    media: Media[];
    createdAt: string;
}

export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location?: string;
    published: boolean;
    creator: { fullName: string; role: Role };
    media: Media[];
    createdAt: string;
}

export interface Media {
    id: string;
    url: string;
    type: string;
    filename: string;
}

export interface Area {
    id: string;
    name: string;
    slug: string;
    description: string;
    content?: string;
    leader?: { fullName: string; id: string };
    media: Media[];
    createdAt: string;
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
export const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL || 'http://localhost:3001';

export async function apiFetch<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
    } as any;

    // Don't set Content-Type if it's FormData
    if (options.body instanceof FormData) {
        delete headers['Content-Type'];
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'API error' }));
        throw new Error(error.message || 'Something went wrong');
    }

    return response.json();
}

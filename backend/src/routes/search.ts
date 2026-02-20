import { Router } from 'express';
import prisma from '../utils/prisma';

const router = Router();

router.get('/', async (req, res) => {
    const { q } = req.query;

    if (!q || typeof q !== 'string' || q.length < 2) {
        return res.json([]);
    }

    const query = q.toLowerCase();

    try {
        // Search in parallel across different models
        // Using simple Promise.all without transactional consistency is fine for search
        const [posts, events, faqs, pages] = await Promise.all([
            // Search Posts
            prisma.post.findMany({
                where: {
                    published: true,
                    OR: [
                        { title: { contains: query, mode: 'insensitive' } },
                        { content: { contains: query, mode: 'insensitive' } },
                    ],
                },
                take: 3,
                select: { id: true, title: true, content: true },
            }),
            // Search Events
            prisma.event.findMany({
                where: {
                    OR: [
                        { title: { contains: query, mode: 'insensitive' } },
                        { description: { contains: query, mode: 'insensitive' } },
                    ],
                },
                take: 3,
                select: { id: true, title: true, description: true },
            }),
            // Search FAQs - Cast to any as FAQ model might be missing types until migration
            (prisma as any).fAQ.findMany({
                where: {
                    visible: true,
                    OR: [
                        { question: { contains: query, mode: 'insensitive' } },
                        { answer: { contains: query, mode: 'insensitive' } },
                    ],
                },
                take: 3,
            }),
            // Search Institution Pages
            prisma.institutionPage.findMany({
                where: {
                    OR: [
                        { title: { contains: query, mode: 'insensitive' } },
                        { content: { contains: query, mode: 'insensitive' } },
                    ],
                },
                take: 3,
                select: { title: true, slug: true, section: true },
            }),
        ]);

        // Format results
        const results = [
            ...posts.map(p => ({
                type: 'NOTICIA',
                title: p.title,
                description: p.content.substring(0, 100) + '...',
                url: `/noticias/${p.id}`,
            })),
            ...events.map(e => ({
                type: 'EVENTO',
                title: e.title,
                description: e.description ? e.description.substring(0, 100) + '...' : '',
                url: `/calendario`,
            })),
            ...(faqs as any[]).map(f => ({
                type: 'FAQ',
                title: f.question,
                description: f.answer.substring(0, 100) + '...',
                url: `/faq`,
            })),
            ...pages.map(p => ({
                type: p.section === 'PASTORAL' ? 'PASTORAL' : 'INSTITUCIONAL',
                title: p.title,
                description: 'Página institucional',
                url: `/pastoral/${p.slug}`,
            })),
        ];

        res.json(results);

    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'Error performing search' });
    }
});

export default router;

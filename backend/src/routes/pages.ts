import { Router } from 'express';
import prisma from '../utils/prisma';
import { authenticate, authorize } from '../middleware/auth';
import { Role } from '../utils/roles';

const router = Router();
// Páginas institucionales

// Public: Get page by slug
router.get('/public/:slug', async (req, res) => {
    const { slug } = req.params;
    try {
        const page = await prisma.institutionPage.findUnique({
            where: { slug },
            include: { media: true }
        });
        if (!page) return res.status(404).json({ message: 'Page not found' });
        res.json(page);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching page', error });
    }
});

// Protected routes
router.use(authenticate);

// Get all institutional pages
router.get('/', async (req, res) => {
    try {
        const pages = await prisma.institutionPage.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(pages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pages', error });
    }
});

// Create or Update page (Admin only)
router.post('/', authorize([Role.SUPER_ADMIN, Role.DIRECTIVO, Role.ADMINISTRATIVO]), async (req, res) => {
    const { title, slug, section, description, content } = req.body;

    try {
        const page = await prisma.institutionPage.upsert({
            where: { slug },
            update: { title, section, description, content },
            create: { title, slug, section, description, content }
        });
        res.status(201).json(page);
    } catch (error) {
        res.status(500).json({ message: 'Error saving page', error });
    }
});

// Delete page
router.delete('/:id', authorize([Role.SUPER_ADMIN, Role.DIRECTIVO, Role.ADMINISTRATIVO]), async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.institutionPage.delete({ where: { id: id as string } });
        res.json({ message: 'Page deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting page', error });
    }
});

export default router;

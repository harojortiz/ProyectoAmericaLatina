import { Router } from 'express';
import prisma from '../utils/prisma';
import { authenticate, authorize } from '../middleware/auth';
import { Role } from '../utils/roles';

const router = Router();
// Rutas de áreas académicas

// Public: Get all areas
router.get('/public', async (req, res) => {
    try {
        const areas = await prisma.area.findMany({
            include: {
                media: true,
                leader: { select: { fullName: true } }
            },
            orderBy: { name: 'asc' }
        });
        res.json(areas);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching areas', error });
    }
});

// Public: Get area by slug
router.get('/public/:slug', async (req, res) => {
    const { slug } = req.params;
    try {
        const area = await prisma.area.findUnique({
            where: { slug },
            include: {
                media: true,
                leader: { select: { fullName: true } }
            }
        });
        if (!area) return res.status(404).json({ message: 'Area not found' });
        res.json(area);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching area', error });
    }
});

// Protected routes
router.use(authenticate);

// Get all areas (Admin/SuperAdmin view)
router.get('/', async (req, res) => {
    try {
        const areas = await prisma.area.findMany({
            include: {
                leader: { select: { fullName: true, id: true } }
            }
        });
        res.json(areas);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching areas', error });
    }
});

// Create area (Admin/SuperAdmin/Directivo/Administrativo only)
router.post('/', authorize([Role.SUPER_ADMIN, Role.DIRECTIVO, Role.ADMINISTRATIVO]), async (req, res) => {
    const { name, slug, description, content, leaderId } = req.body;

    try {
        const area = await prisma.area.create({
            data: { name, slug, description, content, leaderId }
        });
        res.status(201).json(area);
    } catch (error) {
        res.status(500).json({ message: 'Error creating area', error });
    }
});

// Update area (Admin/SuperAdmin or Leader)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, slug, description, content, leaderId } = req.body;
    const userContext = (req as any).user;

    try {
        const existingArea = await prisma.area.findUnique({ where: { id } });
        if (!existingArea) return res.status(404).json({ message: 'Area not found' });

        // Authorization check: Admin/Directivo/Administrativo or Leader of the area
        const canEdit = [Role.SUPER_ADMIN, Role.DIRECTIVO, Role.ADMINISTRATIVO].includes(userContext.role) ||
            existingArea.leaderId === userContext.id;

        if (!canEdit) {
            return res.status(403).json({ message: 'Unauthorized to edit this area' });
        }

        const area = await prisma.area.update({
            where: { id },
            data: { name, slug, description, content, leaderId }
        });
        res.json(area);
    } catch (error) {
        res.status(500).json({ message: 'Error updating area', error });
    }
});

export default router;

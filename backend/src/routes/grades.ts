import { Router } from 'express';
import prisma from '../utils/prisma';
import { authenticate, authorize } from '../middleware/auth';
import { Role } from '../utils/roles';

const router = Router();

// GET /api/grades - Obtener todos los grados (Público)
router.get('/', async (req, res) => {
    try {
        const grades = await prisma.grade.findMany({
            include: { media: true },
            orderBy: { order: 'asc' }
        });
        res.json(grades);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Rutas protegidas para administración
router.use(authenticate, authorize([Role.SUPER_ADMIN, Role.DIRECTIVO, Role.ADMINISTRATIVO]));

// POST /api/grades - Crear grado
router.post('/', async (req, res) => {
    try {
        const { name, section, description, order, mediaId } = req.body;
        const newGrade = await prisma.grade.create({
            data: {
                name,
                section,
                description,
                order: parseInt(order) || 0
            }
        });

        if (mediaId && mediaId.trim() !== '') {
            await prisma.media.update({
                where: { id: mediaId },
                data: { gradeId: newGrade.id }
            });
        }

        res.status(201).json(newGrade);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/grades/:id - Actualizar grado
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, section, description, order, mediaId } = req.body;

        const updated = await prisma.grade.update({
            where: { id },
            data: {
                name,
                section,
                description,
                order: parseInt(order) || 0
            }
        });

        if (mediaId && mediaId.trim() !== '') {
            await prisma.media.update({
                where: { id: mediaId },
                data: { gradeId: id }
            });
        }

        res.json(updated);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/grades/:id - Eliminar grado
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.grade.delete({ where: { id } });
        res.json({ message: 'Grado eliminado correctamente' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;

import { Router } from 'express';
import prisma from '../utils/prisma';
import { authenticate, authorize } from '../middleware/auth';
import { Role } from '../utils/roles';

const router = Router();

// Public: Get visible FAQs
router.get('/public', async (req, res) => {
    try {
        // Cast to any because FAQ model might not be generated yet if migration hasn't run
        const faqs = await prisma.fAQ.findMany({
            where: { visible: true },
            orderBy: { order: 'asc' },
        });
        res.json(faqs);
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        res.status(500).json({ error: 'Error fetching FAQs' });
    }
});

// Admin: Create FAQ
router.post('/', authenticate, authorize([Role.SUPER_ADMIN, Role.DIRECTIVO, Role.ADMINISTRATIVO]), async (req, res) => {
    try {
        const { question, answer, order } = req.body;
        const faq = await prisma.fAQ.create({
            data: { question, answer, order: order || 0 },
        });
        res.status(201).json(faq);
    } catch (error) {
        res.status(500).json({ error: 'Error creating FAQ' });
    }
});

// Admin: Update FAQ
router.put('/:id', authenticate, authorize([Role.SUPER_ADMIN, Role.DIRECTIVO, Role.ADMINISTRATIVO]), async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer, order, visible } = req.body;
        const faq = await prisma.fAQ.update({
            where: { id: Number(id) },
            data: { question, answer, order, visible },
        });
        res.json(faq);
    } catch (error) {
        res.status(500).json({ error: 'Error updating FAQ' });
    }
});

// Admin: Delete FAQ
router.delete('/:id', authenticate, authorize([Role.SUPER_ADMIN, Role.DIRECTIVO, Role.ADMINISTRATIVO]), async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.fAQ.delete({
            where: { id: Number(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting FAQ' });
    }
});

export default router;

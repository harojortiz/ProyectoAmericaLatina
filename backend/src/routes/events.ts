import { Router } from 'express';
import prisma from '../utils/prisma';
import { authenticate, authorize } from '../middleware/auth';
import { Role } from '../utils/roles';

const router = Router();

// Public: Get published events
router.get('/public', async (req, res) => {
    try {
        const events = await prisma.event.findMany({
            where: { published: true },
            include: {
                creator: { select: { fullName: true, role: true } },
                media: true
            },
            orderBy: { date: 'asc' }
        });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching public events', error });
    }
});

// Protected routes below
router.use(authenticate);

// Get all events
router.get('/', async (req, res) => {
    const user = (req as any).user;

    const where: any = {};
    if (user.role === Role.DOCENTE) {
        where.creatorId = user.id;
    }

    try {
        const events = await prisma.event.findMany({
            where,
            include: {
                creator: { select: { fullName: true, role: true } },
                media: true
            },
            orderBy: { date: 'asc' }
        });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
});

// Create event
router.post('/', async (req, res) => {
    const { title, description, date, location, published } = req.body;
    const user = (req as any).user;

    if (!title || !description || !date) {
        return res.status(400).json({ message: 'Title, description and date are required' });
    }

    try {
        const event = await prisma.event.create({
            data: {
                title,
                description,
                date: new Date(date),
                location,
                creatorId: user.id,
                published: published ?? false
            }
        });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error });
    }
});

// Update event
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, date, location, published } = req.body;
    const user = (req as any).user;

    try {
        const existingEvent = await prisma.event.findUnique({ where: { id } });

        if (!existingEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Authorization check
        if (
            user.role !== Role.SUPER_ADMIN &&
            user.role !== Role.DIRECTIVO &&
            user.role !== Role.ADMINISTRATIVO &&
            existingEvent.creatorId !== user.id
        ) {
            return res.status(403).json({ message: 'Unauthorized to edit this event' });
        }

        const event = await prisma.event.update({
            where: { id },
            data: {
                title,
                description,
                date: date ? new Date(date) : undefined,
                location,
                published
            }
        });

        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error });
    }
});

// Delete event
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const user = (req as any).user;

    try {
        const existingEvent = await prisma.event.findUnique({ where: { id } });

        if (!existingEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Authorization check
        if (
            user.role !== Role.SUPER_ADMIN &&
            user.role !== Role.DIRECTIVO &&
            user.role !== Role.ADMINISTRATIVO &&
            existingEvent.creatorId !== user.id
        ) {
            return res.status(403).json({ message: 'Unauthorized to delete this event' });
        }

        await prisma.event.delete({ where: { id } });
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error });
    }
});

export default router;

import { Router } from 'express';
import prisma from '../utils/prisma';

const router = Router();

// POST /api/public/contact
router.post('/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const newMessage = await prisma.contactMessage.create({
            data: { name, email, subject, message }
        });
        res.status(201).json(newMessage);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/public/admissions
router.post('/admissions', async (req, res) => {
    try {
        const { studentName, parentName, grade, phone, email } = req.body;
        const newRequest = await prisma.admissionRequest.create({
            data: { studentName, parentName, grade, phone, email }
        });
        res.status(201).json(newRequest);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/public/settings
router.get('/settings', async (req, res) => {
    try {
        const settings = await prisma.institutionSettings.findFirst({
            where: { id: 1 }
        });
        res.json(settings);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;

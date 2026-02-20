import { Router } from 'express';
import prisma from '../utils/prisma';
import { authenticate, authorize } from '../middleware/auth';
import { Role } from '../utils/roles';

const router = Router();

// Probar que el usuario sea SUPER_ADMIN o ADMIN para estas rutas
router.use(authenticate, authorize([Role.SUPER_ADMIN, Role.DIRECTIVO, Role.ADMINISTRATIVO]));

// GET /api/messages - Listar mensajes de contacto
router.get('/messages', async (req, res) => {
    try {
        const messages = await prisma.contactMessage.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(messages);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/admissions - Listar solicitudes de admisión
router.get('/admissions', async (req, res) => {
    try {
        const admissions = await prisma.admissionRequest.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(admissions);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/management/settings - Obtener configuración
router.get('/settings', async (req, res) => {
    try {
        let settings = await prisma.institutionSettings.findFirst({
            where: { id: 1 }
        });
        if (!settings) {
            settings = await prisma.institutionSettings.create({
                data: { id: 1, slogan: 'Formando Líderes para un Mundo Mejor' }
            });
        }
        res.json(settings);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/management/settings - Actualizar configuración
router.put('/settings', async (req, res) => {
    try {
        const data = req.body;
        const updated = await prisma.institutionSettings.update({
            where: { id: 1 },
            data
        });
        res.json(updated);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;

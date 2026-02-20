import { Router } from 'express';
import prisma from '../utils/prisma';
import { authenticate, authorize } from '../middleware/auth';
import { Role } from '../utils/roles';
import { StaffType } from '@prisma/client';
import { generatePin, hashPassword } from '../utils/auth';

const router = Router();

// GET /api/staff/public - Obtener todo el equipo (Vista pública, sin PINs)
router.get('/public', async (req, res) => {
    try {
        const staff = await prisma.staff.findMany({
            include: {
                media: true
            },
            orderBy: { order: 'asc' }
        });

        res.json(staff);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/staff - Obtener todo el equipo (Admin, con PINs si es SUPER_ADMIN)
router.get('/', authenticate, async (req, res) => {
    try {
        const staff = await prisma.staff.findMany({
            include: {
                media: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        role: true,
                        pinCode: true
                    }
                }
            },
            orderBy: { order: 'asc' }
        });

        // Filtrar pinCode si no es Super Admin
        const user = (req as any).user;
        console.log('🔍 DEBUG - User role:', user?.role, 'Is SUPER_ADMIN?', user?.role === Role.SUPER_ADMIN);
        const processedStaff = staff.map(s => {
            if (!user || user.role !== Role.SUPER_ADMIN) {
                if (s.user) s.user.pinCode = null;
            }
            return s;
        });

        res.json(processedStaff);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Rutas protegidas para administración
router.use(authenticate, authorize([Role.SUPER_ADMIN, Role.DIRECTIVO]));

// POST /api/staff - Crear integrante y su cuenta de usuario
router.post('/', async (req, res) => {
    try {
        const { name, title, type, email, username, order, mediaId } = req.body;

        if (!username) {
            return res.status(400).json({ message: 'El nombre de usuario es obligatorio para crear una cuenta de acceso.' });
        }

        // Generar PIN y Password
        const pin = generatePin();
        const hashedPassword = await hashPassword(pin);

        // Mapear StaffType a Role
        let role: Role = Role.DOCENTE;
        if (type === StaffType.DIRECTIVO) role = Role.DIRECTIVO;
        else if (type === StaffType.ADMINISTRATIVO) role = Role.ADMINISTRATIVO;

        const newStaff = await prisma.staff.create({
            data: {
                name,
                title,
                type: type as StaffType,
                email: email || null,
                order: parseInt(order) || 0,
                user: {
                    create: {
                        username,
                        email: email || null,
                        password: hashedPassword,
                        fullName: name,
                        role,
                        pinCode: pin
                    }
                }
            },
            include: { user: true }
        });

        if (mediaId && mediaId.trim() !== '') {
            await prisma.media.update({
                where: { id: mediaId },
                data: { staffId: newStaff.id }
            });
        }

        res.status(201).json(newStaff);
    } catch (error: any) {
        if (error.code === 'P2002') {
            return res.status(400).json({ message: 'Ya existe un usuario con este correo electrónico.' });
        }
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/staff/:id - Actualizar integrante y sincronizar con usuario
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, title, type, email, username, order, mediaId } = req.body;

        // Mapear StaffType a Role
        let role: Role = Role.DOCENTE;
        if (type === StaffType.DIRECTIVO) role = Role.DIRECTIVO;
        else if (type === StaffType.ADMINISTRATIVO) role = Role.ADMINISTRATIVO;

        const staffData: any = {
            name,
            title,
            type: type as StaffType,
            email: email || null,
            order: parseInt(order) || 0,
            user: {
                update: {
                    email: email || null,
                    fullName: name,
                    role
                }
            }
        };

        // Si se envía username, actualizamos también
        if (username) {
            staffData.user.update.username = username;
        }

        const updated = await prisma.staff.update({
            where: { id },
            data: staffData
        });

        if (mediaId && mediaId.trim() !== '') {
            await prisma.media.update({
                where: { id: mediaId },
                data: { staffId: id }
            });
        }

        res.json(updated);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/staff/:id/regenerate-pin - Regenerar PIN (Solo SUPER_ADMIN)
router.post('/:id/regenerate-pin', authorize([Role.SUPER_ADMIN]), async (req, res) => {
    try {
        const id = String(req.params.id);

        const staff = await prisma.staff.findUnique({
            where: { id },
            include: { user: true }
        });

        if (!staff || !staff.user) {
            return res.status(404).json({ message: 'Personal o usuario no encontrado' });
        }

        // Generar nuevo PIN
        const newPin = generatePin();
        const hashedPassword = await hashPassword(newPin);

        // Actualizar usuario con nuevo PIN
        const updatedUser = await prisma.user.update({
            where: { id: staff.user.id },
            data: {
                password: hashedPassword,
                pinCode: newPin
            }
        });

        res.json({
            message: 'PIN regenerado correctamente',
            pin: newPin,
            username: updatedUser.username,
            staffName: staff.name
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/staff/:id - Eliminar integrante y su usuario
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // El usuario se eliminará en cascada si se configuró en la DB, 
        // pero Prisma por defecto no lo hace a menos que se especifique.
        // Aquí lo haremos manual para estar seguros.

        const staff = await prisma.staff.findUnique({
            where: { id },
            include: { user: true }
        });

        if (staff?.user) {
            await prisma.user.delete({ where: { id: staff.user.id } });
        }

        await prisma.staff.delete({ where: { id } });

        res.json({ message: 'Personal y cuenta de usuario eliminados correctamente' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;

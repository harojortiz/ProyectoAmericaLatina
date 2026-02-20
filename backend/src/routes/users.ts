import { Router } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../utils/prisma';
import { authenticate, authorize } from '../middleware/auth';
import { Role } from '../utils/roles';

const router = Router();

// Only Super Admin can manage users
router.use(authenticate, authorize([Role.SUPER_ADMIN]));

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                fullName: true,
                role: true,
                createdAt: true
            }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// Create user
router.post('/', async (req, res) => {
    const { username, email, password, fullName, role } = req.body;

    if (!username || !password || !fullName || !role) {
        return res.status(400).json({ message: 'Username, password, name and role are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                username,
                email: email || null,
                password: hashedPassword,
                fullName,
                role
            }
        });

        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            role: user.role
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// Update user
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, fullName, role, password } = req.body;

    try {
        const data: any = { username, email, fullName, role };
        if (password) {
            data.password = await bcrypt.hash(password, 10);
        }

        const user = await prisma.user.update({
            where: { id },
            data
        });

        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            role: user.role
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});

// Delete user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.user.delete({ where: { id } });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

export default router;

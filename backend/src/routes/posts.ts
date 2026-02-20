import { Router } from 'express';
import prisma from '../utils/prisma';
import { authenticate, authorize } from '../middleware/auth';
import { Role } from '../utils/roles';

const router = Router();

// Public: Get published posts
router.get('/public', async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            where: { published: true },
            include: {
                author: { select: { fullName: true, role: true } },
                category: true,
                media: true
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching public posts', error });
    }
});

// Protected routes below
router.use(authenticate);

// Get all posts (filtered by ownership if not Admin/SuperAdmin)
router.get('/', async (req, res) => {
    const user = (req as any).user;

    const where: any = {};
    if (user.role === Role.DOCENTE) {
        where.authorId = user.id;
    }

    try {
        const posts = await prisma.post.findMany({
            where,
            include: {
                author: { select: { fullName: true, role: true } },
                category: true,
                media: true
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
});

// Create post
router.post('/', async (req, res) => {
    const { title, content, categoryId, published } = req.body;
    const user = (req as any).user;

    if (!title || !content || !categoryId) {
        return res.status(400).json({ message: 'Title, content and category are required' });
    }

    try {
        const post = await prisma.post.create({
            data: {
                title,
                content,
                categoryId,
                authorId: user.id,
                published: published ?? false
            }
        });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
});

// Update post
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, categoryId, published } = req.body;
    const user = (req as any).user;

    try {
        const existingPost = await prisma.post.findUnique({ where: { id } });

        if (!existingPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Authorization check
        if (
            user.role !== Role.SUPER_ADMIN &&
            user.role !== Role.DIRECTIVO &&
            user.role !== Role.ADMINISTRATIVO &&
            existingPost.authorId !== user.id
        ) {
            return res.status(403).json({ message: 'Unauthorized to edit this post' });
        }

        const post = await prisma.post.update({
            where: { id },
            data: { title, content, categoryId, published }
        });

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error });
    }
});

// Delete post
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const user = (req as any).user;

    try {
        const existingPost = await prisma.post.findUnique({ where: { id } });

        if (!existingPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Authorization check
        if (
            user.role !== Role.SUPER_ADMIN &&
            user.role !== Role.DIRECTIVO &&
            user.role !== Role.ADMINISTRATIVO &&
            existingPost.authorId !== user.id
        ) {
            return res.status(403).json({ message: 'Unauthorized to delete this post' });
        }

        await prisma.post.delete({ where: { id } });
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error });
    }
});

export default router;

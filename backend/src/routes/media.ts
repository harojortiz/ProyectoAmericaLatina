import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';
import prisma from '../utils/prisma';
import { authenticate } from '../middleware/auth';

const router = Router();

// Configure Multer for temporary storage
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes') as any, false);
        }
    }
});

// Protected media routes
router.use(authenticate);

// GET /api/media/all - Obtener todas las imágenes (con paginación y búsqueda)
router.get('/all', async (req, res) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const skip = (page - 1) * limit;
        const type = req.query.type as string; // 'image', 'document', etc.
        const search = req.query.search as string;

        const where: any = {};

        if (type) {
            where.type = { startsWith: type };
        }

        if (search) {
            where.OR = [
                { filename: { contains: search, mode: 'insensitive' } },
                { title: { contains: search, mode: 'insensitive' } },
                { altText: { contains: search, mode: 'insensitive' } }
            ];
        }

        const [media, total] = await Promise.all([
            prisma.media.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit
            }),
            prisma.media.count({ where })
        ]);

        res.json({
            data: media,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Upload media with auto-processing and metadata
router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Los IDs son opcionales ahora, permitiendo "standalone uploads"
    const { postId, eventId, staffId, gradeId, areaId, pageId, title, altText } = req.body;
    const filename = `processed-${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
    const outputPath = path.join('uploads', filename);

    try {
        // Asegurar que la carpeta uploads existe
        await fs.mkdir('uploads', { recursive: true });

        // Procesar imagen con SHARP
        await sharp(req.file.buffer)
            .resize(1000, 1000, { fit: 'inside', withoutEnlargement: true }) // Aumenté un poco la calidad base
            .toFormat('webp', { quality: 85 })
            .toFile(outputPath);

        const media = await prisma.media.create({
            data: {
                url: `/uploads/${filename}`,
                type: 'image/webp',
                filename: req.file.originalname,
                title: title || null,
                altText: altText || null,
                postId: postId || null,
                eventId: eventId || null,
                staffId: staffId || null,
                gradeId: gradeId || null,
                areaId: areaId || null,
                pageId: pageId || null
            }
        });
        res.status(201).json(media);
    } catch (error: any) {
        console.error('Error processing image:', error);
        res.status(500).json({ message: 'Error al procesar la imagen', error: error.message });
    }
});

// Update media details (Title, AltText)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, altText } = req.body;

    try {
        const media = await prisma.media.update({
            where: { id },
            data: {
                title,
                altText
            }
        });
        res.json(media);
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating media', error: error.message });
    }
});

// Delete media
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const media = await prisma.media.findUnique({ where: { id } });
        if (!media) return res.status(404).json({ message: 'Media not found' });

        // Delete file from filesystem
        const filePath = path.join(process.cwd(), media.url.startsWith('/') ? media.url.slice(1) : media.url);
        try {
            await fs.unlink(filePath);
        } catch (err) {
            console.error('Error deleting file:', err);
        }

        await prisma.media.delete({ where: { id } });
        res.json({ message: 'Media and file deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting media', error });
    }
});

export default router;

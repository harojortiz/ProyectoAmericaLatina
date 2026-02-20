import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';
import prisma from '../utils/prisma';
import { authenticate } from '../middleware/auth';

const router = Router();

// Configure Multer for PDF storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(process.cwd(), 'uploads/documents');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `doc-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos PDF') as any, false);
        }
    }
});

/**
 * PUBLIC ROUTES
 */

// GET /api/documents/public - List visible documents
router.get('/public', async (req, res) => {
    try {
        const { category } = req.query;
        const where: any = { visible: true };

        if (category) {
            where.category = category;
        }

        const documents = await prisma.document.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching public documents', error });
    }
});

/**
 * PROTECTED ROUTES
 */
router.use(authenticate);

// GET /api/documents - List all documents for management
router.get('/', async (req, res) => {
    try {
        const documents = await prisma.document.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching documents', error });
    }
});

// POST /api/documents/upload - Upload a new document
router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No document uploaded' });
    }

    const { title, description, category, visible } = req.body;

    if (!title || !category) {
        return res.status(400).json({ message: 'Title and category are required' });
    }

    try {
        const document = await prisma.document.create({
            data: {
                title,
                description: description || null,
                category,
                url: `/uploads/documents/${req.file.filename}`,
                filename: req.file.originalname,
                visible: visible === 'true' || visible === true
            }
        });
        res.status(201).json(document);
    } catch (error) {
        res.status(500).json({ message: 'Error creating document record', error });
    }
});

// PUT /api/documents/:id - Update document metadata
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, category, visible } = req.body;

    try {
        const document = await prisma.document.update({
            where: { id },
            data: {
                title,
                description,
                category,
                visible: visible === 'true' || visible === true
            }
        });
        res.json(document);
    } catch (error) {
        res.status(500).json({ message: 'Error updating document', error });
    }
});

// DELETE /api/documents/:id - Delete document and file
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const document = await prisma.document.findUnique({ where: { id } });
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        // Delete file from disk
        const relativePath = document.url.startsWith('/') ? document.url.slice(1) : document.url;
        const filePath = path.join(process.cwd(), relativePath);

        try {
            if (fs.existsSync(filePath)) {
                await fsp.unlink(filePath);
            }
        } catch (err) {
            console.error('Error deleting document file from disk:', err);
        }

        await prisma.document.delete({ where: { id } });
        res.json({ message: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting document', error });
    }
});

export default router;

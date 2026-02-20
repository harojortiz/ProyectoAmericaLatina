import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import postRoutes from './routes/posts';
import eventRoutes from './routes/events';
import categoryRoutes from './routes/categories';
import mediaRoutes from './routes/media';
import areaRoutes from './routes/areas';
import pageRoutes from './routes/pages';
import faqRoutes from './routes/faqs';
import searchRoutes from './routes/search';
import publicRoutes from './routes/public';
import managementRoutes from './routes/management';
import staffRoutes from './routes/staff';
import gradeRoutes from './routes/grades';
import documentRoutes from './routes/documents';

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(helmet({
    crossOriginResourcePolicy: false, // Permitir que las imágenes se carguen desde otros orígenes
    crossOriginEmbedderPolicy: false
}));
app.use(cors());
app.use(express.json());

// Static folder for media
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/areas', areaRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/management', managementRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/documents', documentRoutes);

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'School Institutional API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

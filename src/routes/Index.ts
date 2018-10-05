import express from 'express';
import authRoutes from './Auth';
import homeRoutes from './Home';

// Create router instance
const router: express.Router = express.Router();

// Publish Home Routes
router.use('/', homeRoutes);

// Publish Auth Routes
router.use('/auth', authRoutes);

export default router;

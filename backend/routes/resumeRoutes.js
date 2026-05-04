import express from 'express';
import { 
    optimizeResume, 
    optimizeSummary, 
    getResumes, 
    saveResume, 
    deleteResume 
} from '../controllers/resumeController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes for AI optimization (could be protected too)
router.post('/optimize', optimizeResume);
router.post('/optimize-summary', optimizeSummary);

// Protected CRUD routes
router.get('/', protect, getResumes);
router.post('/', protect, saveResume);
router.delete('/:id', protect, deleteResume);

export default router;

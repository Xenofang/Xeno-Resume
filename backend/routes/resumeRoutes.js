import express from 'express';
import { optimizeResume } from '../controllers/resumeController.js';
// import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Removed protect middleware temporarily for easier testing
router.post('/optimize', optimizeResume);

export default router;

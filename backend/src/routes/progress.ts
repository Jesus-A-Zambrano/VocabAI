import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { updateProgress, getUserProgress } from '../controllers/progressController';

const router = Router();

/**
 * @swagger
 * /api/progress/update:
 *   post:
 *     summary: Update user progress
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProgressUpdate'
 *     responses:
 *       200:
 *         description: Progress updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 updatedProgress:
 *                   $ref: '#/components/schemas/ProgressUpdate'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/update', requireAuth({}), updateProgress);

/**
 * @swagger
 * /api/progress/me:
 *   get:
 *     summary: Get authenticated user progress
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User progress data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 progress:
 *                   $ref: '#/components/schemas/ProgressUpdate'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User progress not found (if not returning default)
 *       500:
 *         description: Internal server error
 */
router.get('/me', requireAuth({}), getUserProgress);

export default router;

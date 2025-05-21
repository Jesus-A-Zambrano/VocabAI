import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { getSuggestions } from '../controllers/vocabularyController'; // Import the controller function

const router = Router();

/**
 * @swagger
 * /api/vocabulary/suggestions:
 *   get:
 *     summary: Get word suggestions based on user level
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *         required: true
 *         description: User's English level
 *     responses:
 *       200:
 *         description: A list of word suggestions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Suggestion'
 *       400:
 *         description: Invalid level provided
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/suggestions', requireAuth({}), getSuggestions);

export default router;

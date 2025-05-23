import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { getSuggestions } from '../controllers/vocabularyController'; // Import the controller function

const router = Router();

/**
 * @swagger
 * /api/vocabulary/suggestions:
 *   get:
 *     summary: Get word suggestions based on user level (fetched from profile)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       # Removed level query parameter as it's now fetched from user profile
 *     responses:
 *       200:
 *         description: A list of word suggestions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Suggestion' # Reference to the updated schema including id
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User profile not found
 *       500:
 *         description: Internal server error
 */
router.get('/suggestions', requireAuth({}), getSuggestions);

export default router;

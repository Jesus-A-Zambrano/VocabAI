import { Request, Response, NextFunction } from 'express';
import { z } from 'zod'; // Keep z if needed for other schemas
import { BadRequestError, ApiError, InternalServerError } from '../utils/errors'; // Import custom errors
import { getSuggestionsService, saveLearnedWords } from '../services/vocabularyService';


export const getSuggestions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).auth.userId; // Get user ID from Clerk auth

    const suggestions = await getSuggestionsService(userId);
    res.status(200).json(suggestions);
  } catch (error) {
      if (error instanceof z.ZodError) {
        // Catch Zod errors and pass a BadRequestError to the error middleware
        next(new BadRequestError(`Validation failed: ${JSON.stringify(error.errors)}`));
      } else if (error instanceof ApiError) {
          // Pass custom API errors to the error middleware
          next(error);
      } else {
        // Wrap other errors in a generic InternalServerError
        next(new InternalServerError('Failed to get word suggestions'));
      }
  }
};

// You could add other vocabulary-related controller functions here
// export const addLearnedWord = async (req: Request, res: Response, next: NextFunction) => { ... };

export const addLearnedWord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).auth.userId;
    const registros = Array.isArray(req.body) ? req.body : [req.body];

    const resultados = await saveLearnedWords(userId, registros);

    res.status(201).json({ message: 'Registros guardados', resultados });
  } catch (error) {
    next(error);
  }
};
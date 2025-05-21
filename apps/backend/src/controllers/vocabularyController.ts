import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { getWordSuggestions } from '../services/pythonService'; // Import the service
import { AppDataSource } from '../data-source'; // Import data source if saving to DB
import { Vocabulary } from '../entity/Vocabulary'; // Import entity if saving to DB
import { BadRequestError, ApiError, InternalServerError } from '../utils/errors'; // Import custom errors

// Define a Zod schema for the suggestion request query parameters
const suggestionRequestSchema = z.object({
  level: z.string().min(1, 'Level is required'),
});

// Get the Vocabulary repository (if saving suggestions)
const vocabularyRepository = AppDataSource.getRepository(Vocabulary);

export const getSuggestions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate and parse query parameters with Zod
    const { level } = suggestionRequestSchema.parse(req.query);
    const userId = (req as any).auth.userId; // Get user ID from Clerk auth

    // Call the Python microservice via the service layer
    const suggestions = await getWordSuggestions(level, userId);

    // Optional: Save suggestions to the database
    // for (const suggestion of suggestions) {
    //     const existingWord = await vocabularyRepository.findOneBy({ word: suggestion.word });
    //     if (!existingWord) {
    //         const newWord = vocabularyRepository.create(suggestion);
    //         await vocabularyRepository.save(newWord);
    //     }
    // }

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

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod'; // Keep z if needed for other schemas
import { getWordSuggestions } from '../services/pythonService'; // Import the service
import { createUserProfile, findUserProfileById } from '../services/userService'; // Import the user service
import { AppDataSource } from '../data-source'; // Import data source if saving to DB
import { Vocabulary } from '../entity/Vocabulary'; // Import entity if saving to DB
import { UserVocabulary } from '../entity/UserVocabulary'; // Import UserVocabulary entity
import { BadRequestError, ApiError, InternalServerError, NotFoundError } from '../utils/errors'; // Import custom errors
import { saveLearnedWords } from '../services/vocabularyService';

// Removed suggestionRequestSchema as level query parameter is no longer used for this endpoint.

// Get the Vocabulary repository (if saving suggestions)
const vocabularyRepository = AppDataSource.getRepository(Vocabulary);

const userVocabularyRepository = AppDataSource.getRepository(UserVocabulary);


export const getSuggestions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).auth.userId; // Get user ID from Clerk auth

    // Fetch user profile to get the level
    let userProfile = await findUserProfileById(userId);

      if (!userProfile) {
    
      userProfile = await createUserProfile(userId);
      if (!userProfile) {
        return next(new InternalServerError('No se pudo crear el perfil de usuario.'));
      }
    }

    // Get the user's level from the userProfile object. Provide a default if not set.
    const userLevel = userProfile.level || 'Principiante'; // Using a default level

    // Call the Python microservice via the service layer
    // Pass the fetched userLevel to the service

    
    const suggestions = await getWordSuggestions(userLevel, userId);

    // Optional: Save suggestions to the database
    // Note: Uncomment and adjust if you want to save suggestions to your database
    /*
    for (const suggestion of suggestions) {
        const existingWord = await vocabularyRepository.findOneBy({ id: suggestion.id }); // Check by id now
        if (!existingWord) {
            const newWord = vocabularyRepository.create({
                id: suggestion.id, // Include id when creating
                word: suggestion.word,
                translation: suggestion.translation,
                description: suggestion.description,
                types: suggestion.types,
                level: suggestion.level,
            });
            await vocabularyRepository.save(newWord);
        }
    }
    */

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
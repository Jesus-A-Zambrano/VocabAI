import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppDataSource } from '../data-source'; // Import the data source
import { UserProgress } from '../entity/UserProgress'; // Import the entity
import { BadRequestError, NotFoundError } from '../utils/errors'; // Import custom errors

// Define a Zod schema for the progress update request body
const progressUpdateSchema = z.object({
  level: z.string().min(1, 'Level is required'),
  score: z.number().int().min(0, 'Score must be a non-negative integer'),
  completedTopics: z.array(z.string()).optional(),
});

// Define a type based on the Zod schema
type ProgressUpdateInput = z.infer<typeof progressUpdateSchema>;

// Get the UserProgress repository
const userProgressRepository = AppDataSource.getRepository(UserProgress);

export const updateProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const progressData: ProgressUpdateInput = progressUpdateSchema.parse(req.body); // Validate and parse with Zod
    const userId = (req as any).auth.userId; // Get user ID from Clerk auth

    // Create a new UserProgress entity instance or find existing
    let userProgress = await userProgressRepository.findOneBy({ userId });

    if (!userProgress) {
        // If no progress exists, create a new one
        userProgress = userProgressRepository.create({ userId, ...progressData });
    } else {
        // If progress exists, update it
        userProgressRepository.merge(userProgress, progressData);
    }

    // Use TypeORM repository to save the user progress (handles insert or update)
    const savedProgress = await userProgressRepository.save(userProgress);

    res.status(200).json({
      message: 'Progress updated successfully',
      userId,
      updatedProgress: savedProgress,
    });
  } catch (error) {
     // If ZodError, it will be caught by the global error handler
     // If other errors from TypeORM, they will also be caught by the global handler
    next(error); // Pass errors to the error handling middleware
  }
};

export const getUserProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).auth.userId;

        // Use TypeORM repository to find the user progress
        const userProgress = await userProgressRepository.findOneBy({ userId });

        if (!userProgress) {
            // Throw a NotFoundError if the user progress doesn't exist
            throw new NotFoundError('User progress not found');
        }

        res.status(200).json({ message: 'User progress data', userId, progress: userProgress });

    } catch (error) {
        next(error); // Pass errors to the error handling middleware
    }
};

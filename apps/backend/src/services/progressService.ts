import { AppDataSource } from '../data-source';
import { UserProgress } from '../entity/UserProgress';
import { NotFoundError } from '../utils/errors';
import { z } from 'zod';

// Define a Zod schema for the progress update input
const progressUpdateSchema = z.object({
  level: z.string().min(1, 'Level is required'),
  score: z.number().int().min(0, 'Score must be a non-negative integer'),
  completedTopics: z.array(z.string()).optional(),
});

// Define a type based on the Zod schema
export type ProgressUpdateInput = z.infer<typeof progressUpdateSchema>;

// Get the UserProgress repository
const userProgressRepository = AppDataSource.getRepository(UserProgress);

export const findUserProgressById = async (userId: string): Promise<UserProgress | null> => {
    // Use TypeORM repository to find the user progress
    const userProgress = await userProgressRepository.findOneBy({ userId });
    return userProgress;
};

export const saveUserProgress = async (userId: string, progressData: ProgressUpdateInput): Promise<UserProgress> => {
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
    return savedProgress;
};

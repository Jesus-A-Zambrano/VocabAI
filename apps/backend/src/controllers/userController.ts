import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { findUserProfileById, saveUserProfile, UserProfileInput } from '../services/userService'; // Import service functions and types
import { BadRequestError, NotFoundError } from '../utils/errors';

// Define a Zod schema for a sample request body (still used for validation in controller)
const userProfileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  age: z.number().int().positive('Age must be a positive integer').optional(),
});

export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).auth.userId;

        // Use service function to find the user profile
        const userProfile = await findUserProfileById(userId);

        if (!userProfile) {
            // Throw a NotFoundError if the user profile doesn't exist
            throw new NotFoundError('User profile not found');
        }

        res.status(200).json({ message: 'User profile data', userId, profile: userProfile });

    } catch (error) {
        next(error); // Pass errors to the error handli
    }
};

export const createUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validate and parse with Zod
        const userProfileInput: UserProfileInput = userProfileSchema.parse(req.body);
        const userId = (req as any).auth.userId; // Get user ID from Clerk auth

        // Use service function to save the user profile
        const savedProfile = await saveUserProfile(userId, userProfileInput);

        res.status(200).json({ message: 'User profile processed', profile: savedProfile });
    } catch (error) {
        // If ZodError, it will be caught by the global error handler
        // If other errors from service, they will also be caught by the global handler
        next(error); // Pass errors to the error handling middleware
    }
};

import { AppDataSource } from '../data-source';
import { UserProfile } from '../entity/UserProfile';
import { NotFoundError } from '../utils/errors';
import { z } from 'zod';

// Define a Zod schema for a sample user profile input
const userProfileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  age: z.number().int().positive('Age must be a positive integer').optional(),
  level: z.string().optional(), // Added level to the schema, making it optional
});

// Define a type based on the Zod schema
export type UserProfileInput = z.infer<typeof userProfileSchema>;

// Get the UserProfile repository
const userProfileRepository = AppDataSource.getRepository(UserProfile);

export const findUserProfileById = async (userId: string): Promise<UserProfile | null> => {
    // Use TypeORM repository to find the user profile
    const userProfile = await userProfileRepository.findOneBy({ id: userId });
    return userProfile;
};

export const saveUserProfile = async (userId: string, profileData: UserProfileInput): Promise<UserProfile> => {
    // Create a new UserProfile entity instance or find existing
    let userProfile = await userProfileRepository.findOneBy({ id: userId });

    if (!userProfile) {
        // If no profile exists, create a new one
        userProfile = userProfileRepository.create({ id: userId, ...profileData });
    } else {
        // If profile exists, update it
        userProfileRepository.merge(userProfile, profileData);
    }

    // Use TypeORM repository to save the user profile (handles insert or update)
    const savedProfile = await userProfileRepository.save(userProfile);
    return savedProfile;
};

export const createUserProfile = async (userId: string): Promise<UserProfile | null> => {
    // Puedes personalizar los valores por defecto aquí
    const defaultProfile = {
        name: 'Usuario',
        email: `${userId}@example.com`, // O intenta obtener el email real si lo tienes
        level: 'Principiante',
    };

    // Valida el perfil con Zod
    const parsed = userProfileSchema.safeParse(defaultProfile);
    if (!parsed.success) {
        return null;
    }

    // Crea y guarda el perfil
    const userProfile = userProfileRepository.create({ id: userId, ...parsed.data });
    return await userProfileRepository.save(userProfile);
};
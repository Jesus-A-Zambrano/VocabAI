import { clerkClient } from '@clerk/express';
import { AppDataSource } from '../data-source';
import { UserProfile } from '../entity/UserProfile';
import { NotFoundError } from '../utils/errors';
import { z } from 'zod';

// Define a Zod schema for a sample user profile input
const userProfileSchema = z.object({
  level: z.string(), // Added level to the schema, making it optional
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

export const findOrCreateProfile = async (userId: string, profileData?: UserProfileInput): Promise<UserProfile> => { 
    // Create a new UserProfile entity instance or find existing
    let userProfile = await userProfileRepository.findOneBy({ id: userId });
    if (!userProfile) {
        userProfile = await createUserProfile(userId); // Recupera el perfil después de 
    } 
    //TODO: Update the user profile with the new data
    // Use TypeORM repository to save the user profile (handles insert or update)
    return userProfile;
};

export const createUserProfile = async (userId: string): Promise<UserProfile> => {
    const {emailAddresses} = await clerkClient.users.getUser(userId);
    // Puedes personalizar los valores por defecto aquí
    const defaultProfile = {
        id: userId,
        email: emailAddresses[0].emailAddress, // O intenta obtener el email real si lo tienes
        level: 'Principiante',
        learnedVocabulary: []
    };

    // Valida el perfil con Zod
    userProfileSchema.parse(defaultProfile);
    // Crea y guarda el perfil
    const userProfile = userProfileRepository.create(defaultProfile);
    return await userProfileRepository.save(userProfile);
};

export const updateUserProfileService = async (
    userId: string,
    updates: Partial<UserProfile>
): Promise<UserProfile> => {
    // Buscar el perfil existente
    let userProfile = await findOrCreateProfile(userId);

    // Actualizar los campos
    userProfile = { ...userProfile, ...updates };

    // Validar el perfil actualizado
    const result = userProfileSchema.safeParse(userProfile);
    if (!result.success) {
        throw new Error('Datos de perfil inválidos');
    }

    // Guardar y retornar
    return await userProfileRepository.save(userProfile);
};
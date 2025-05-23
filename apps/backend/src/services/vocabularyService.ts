import { Not, In } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Vocabulary } from '../entity/Vocabulary';
import { UserVocabulary } from '../entity/UserVocabulary';
import { findOrCreateProfile, findUserProfileById } from './userService';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { getWordSuggestions } from './pythonService';

const vocabularyRepository = AppDataSource.getRepository(Vocabulary);
const userVocabularyRepository = AppDataSource.getRepository(UserVocabulary);

export interface LearnedWordInput {
  vocabularyId: number;
  correct: boolean;
  learnedAt: string;
}

export const getSuggestionsService = async (userId: string) => {
  try {
    // Fetch user profile to get the level
    const userProfile = await findOrCreateProfile(userId);
    // Get the user's level from the userProfile object. Provide a default if not set.
    const { level } = userProfile; // Using a default level
    // Call the Python microservice via the service layer
    const learned = await userVocabularyRepository.find({
      where: { user: { id: userProfile.id } },
      relations: ['vocabulary'],
    });
    const learnedIds = learned.map(l => l.vocabularyId);

    // Buscar palabras del nivel, excluyendo las ya aprendidas
    const suggestions = await vocabularyRepository.find({
      where: {
        level,
        ...(learnedIds.length > 0 && { id: Not(In(learnedIds)) }),
      },
      order: { frequencyCount: 'DESC' },
      take: 10,
    });
return suggestions;  
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    throw new Error('Failed to fetch suggestions');
  }
};
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


export const saveLearnedWords = async (userId: string, registros: LearnedWordInput[]) => {

  for (const registro of registros) {
    if (
      !registro.vocabularyId ||
      typeof registro.correct !== 'boolean' ||
      !registro.learnedAt
    ) {
      throw new BadRequestError('Datos incompletos o incorrectos.');
    }
  }

  
  const userProfile = await findUserProfileById(userId);
  if (!userProfile) {
    throw new NotFoundError('User profile not found.');
  }

  const resultados = [];
  for (const registro of registros) {
    const vocabulary = await vocabularyRepository.findOneBy({ id: registro.vocabularyId });
    if (!vocabulary) {
      throw new NotFoundError(`Vocabulary word not found: ${registro.vocabularyId}`);
    }

    const userVocabulary = userVocabularyRepository.create({
      user: userProfile,
      vocabulary,
      correct: registro.correct,
      learnedAt: new Date(registro.learnedAt),
    });

    resultados.push(await userVocabularyRepository.save(userVocabulary));
  }

  return resultados;
};
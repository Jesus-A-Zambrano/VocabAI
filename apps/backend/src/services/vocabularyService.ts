import { AppDataSource } from '../data-source';
import { Vocabulary } from '../entity/Vocabulary';
import { UserVocabulary } from '../entity/UserVocabulary';
import { findUserProfileById } from './userService';
import { BadRequestError, NotFoundError } from '../utils/errors';

const vocabularyRepository = AppDataSource.getRepository(Vocabulary);
const userVocabularyRepository = AppDataSource.getRepository(UserVocabulary);

export interface LearnedWordInput {
  vocabularyId: number;
  correct: boolean;
  learnedAt: string;
}

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
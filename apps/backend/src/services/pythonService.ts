//import axios from 'axios';
import config from '../config'; // Import the config

// In a real application, you would use a library like axios or node-fetch
// to make HTTP requests to your Python microservice.

// For now, we'll simulate the response.

interface Suggestion {
  id: number; // Added id
  word: string;
  translation: string;
  description: string;
  types: string;
  level: string;
}

// Note: The level parameter is still here for now as the python service might still use it.
// We are just removing it from the *backend* API endpoint.
export const getWordSuggestions = async (level: string, userId: string): Promise<Suggestion[]> => {
  console.log(`Calling Python microservice for user ${userId} at level ${level}`);
  
  // In a real implementation, you would use config.pythonServiceUrl like this:
  // try {
  //   const response = await axios.get(`${config.pythonServiceUrl}/suggestions`, {
  //     params: {
  //       level,
  //       userId,
  //     },
  //   });
  //   return response.data;
  // } catch (error) {
  //   console.error('Error calling Python microservice:', error);
  //   throw new Error('Failed to get word suggestions'); // Or a more specific error
  // }

  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Simulate a response from the Python microservice with updated structure
  const mockSuggestions: Suggestion[] = [
    {
      id: 1,
      word: 'Eloquent',
      translation: 'Elocuente', // Example translation
      description: 'Fluent or persuasive in speaking or writing.',
      types: 'Adjective', // Example type
      level: 'Avanzado', // Example level
    },
    {
      id: 2,
      word: 'Ephemeral',
      translation: 'Efímero', // Example translation
      description: 'Lasting for a very short time.',
      types: 'Adjective', // Example type
      level: 'Intermedio', // Example level
    },
    {
      id: 3,
      word: 'Serendipity',
      translation: 'Serendipia', // Example translation
      description: 'The occurrence and development of events by chance in a happy or beneficial way.',
      types: 'Noun', // Example type
      level: 'Avanzado', // Example level
    },
  ];

  return mockSuggestions;
};

// You might also have other functions here for different interactions
// export const updateProgress = async (userId: string, progressData: any) => { ... };

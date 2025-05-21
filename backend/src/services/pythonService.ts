//import axios from 'axios';
import config from '../config'; // Import the config

// In a real application, you would use a library like axios or node-fetch
// to make HTTP requests to your Python microservice.

// For now, we'll simulate the response.

interface Suggestion {
  word: string;
  definition: string;
  example: string;
}

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

  // Simulate a response from the Python microservice
  const mockSuggestions: Suggestion[] = [
    {
      word: 'Eloquent',
      definition: 'Fluent or persuasive in speaking or writing.',
      example: 'She was an eloquent speaker, able to captivate her audience.',
    },
    {
      word: 'Ephemeral',
      definition: 'Lasting for a very short time.',
      example: 'The beauty of the cherry blossoms is ephemeral.',
    },
    {
      word: 'Serendipity',
      definition: 'The occurrence and development of events by chance in a happy or beneficial way.',
      example: 'Finding that old photograph was a moment of serendipity.',
    },
  ];

  return mockSuggestions;
};

// You might also have other functions here for different interactions
// export const updateProgress = async (userId: string, progressData: any) => { ... };

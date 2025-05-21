import * as dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  clerkSecretKey: string;
  clerkFrontendApi: string;
  pythonServiceUrl: string;
}

const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  clerkSecretKey: process.env.CLERK_SECRET_KEY || '',
  clerkFrontendApi: process.env.CLERK_FRONTEND_API || '',
  pythonServiceUrl: process.env.PYTHON_SERVICE_URL || 'http://localhost:5000', // Default URL for Python service
};

// Basic validation (you can add more comprehensive validation here)
if (!config.clerkSecretKey) {
  console.error('Missing CLERK_SECRET_KEY environment variable.');
  // In a real app, you might want to exit or throw an error here
}

if (!config.clerkFrontendApi) {
    console.error('Missing CLERK_FRONTEND_API environment variable.');
    // In a real app, you might want to exit or throw an error here
}

export default config;

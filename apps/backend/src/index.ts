import "reflect-metadata";
import express, { Application, Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import { clerkMiddleware  } from '@clerk/express'; // Corrected import
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import usersRouter from './routes/users'; // Import the users router
import vocabularyRouter from './routes/vocabulary'; // Import the vocabulary router
import progressRouter from './routes/progress'; // Import the progress router
import config from './config'; // Import the config
import { AppDataSource } from './data-source'; // Import the data source
import { errorHandler } from "./middlewares/errorHandler"; // Import the error handler

dotenv.config();

const app: Application = express();
const port = config.port; // Use port from config

// Use cors middleware to allow requests from any origin
app.use(cors());

// Initialize TypeORM Data Source
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");

        // Swagger definition
        const swaggerOptions = {
          definition: {
            openapi: '3.0.0',
            info: {
              title: 'English Learning App BFF API Documentation',
              version: '1.0.0',
              description: 'API documentation for the English learning app BFF',
            },
            servers: [
              {
                url: `http://localhost:${port}`,
              },
            ],
            components: { // Add components section for schemas
              securitySchemes: {
                bearerAuth: {
                  type: 'http',
                  scheme: 'bearer',
                  bearerFormat: 'JWT',
                },
              },
              schemas: {
                UserProfile: { // Updated UserProfile schema
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      description: 'Clerk user ID'
                    },
                    name: {
                      type: 'string',
                      description: `User's name`
                    },
                    email: {
                      type: 'string',
                      format: 'email',
                      description: `User's email address`
                    },
                    age: {
                      type: 'integer',
                      format: 'int32',
                      description: `User's age (optional)`
                    },
                    level: {
                      type: 'string',
                      description: `User's English level (optional)`,
                       enum: [
                         'Principiante',
                         'Intermedio',
                         'Avanzado'
                       ] // Added enum for level
                    }
                  },
                  required: ['id', 'name', 'email'] // Added id to required
                },
                Suggestion: { // Updated Schema for vocabulary suggestions
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                      description: 'The unique identifier of the vocabulary word.'
                    },
                    word: {
                      type: 'string',
                      description: 'The English word.'
                    },
                    translation: {
                      type: 'string',
                      description: 'The translation of the word in Spanish.'
                    },
                    description: {
                      type: 'string',
                      description: 'The definition of the word.'
                    },
                    types: {
                      type: 'string',
                      description: 'The type of word (e.g., Noun, Verb, Adjective).'
                    },
                    level: {
                      type: 'string',
                      description: 'The difficulty level of the word.',
                      enum: [
                        'Principiante',
                        'Intermedio',
                        'Avanzado'
                      ]
                    }
                  },
                  required: ['id', 'word', 'translation', 'description', 'types', 'level']
                },
                ProgressUpdate: {
                  type: 'object',
                  properties: {
                    level: {
                      type: 'string',
                      description: `User's current level`
                    },
                    score: {
                      type: 'integer',
                      format: 'int32',
                      description: `User's current score`
                    },
                    completedTopics: {
                      type: 'array',
                      items: {
                        type: 'string'
                      },
                      description: 'List of topics completed by the user (optional)'
                    }
                  },
                  required: ['level', 'score']
                }
              }
            }
          },
          apis: ['./src/routes/*.ts', './dist/routes/*.js'],
        };

        const swaggerSpec = swaggerJsdoc(swaggerOptions);

        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

        app.use(express.json());
        app.use(clerkMiddleware())
        // Health endpoint
        app.get('/health', (req: Request, res: Response) => {
          res.status(200).send('OK');
        });

        // Mount the routers
        app.use('/api/users', usersRouter);
        app.use('/api/vocabulary', vocabularyRouter);
        app.use('/api/progress', progressRouter);

        app.use(errorHandler);

        app.listen(port, () => {
          console.log(`Backend BFF listening on port ${port}`);
        });

    })
    .catch((error) => console.error("Error during Data Source initialization:", error));

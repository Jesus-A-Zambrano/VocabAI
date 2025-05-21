import "reflect-metadata";
import express, { Application, Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import * as dotenv from 'dotenv';
import { clerkMiddleware  } from '@clerk/express'; // Corrected import
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import usersRouter from './routes/users'; // Import the users router
import vocabularyRouter from './routes/vocabulary'; // Import the vocabulary router
import progressRouter from './routes/progress'; // Import the progress router
import { ZodError } from 'zod';
import config from './config'; // Import the config
import { ApiError, BadRequestError, UnauthorizedError, NotFoundError, InternalServerError } from './utils/errors'; // Import custom errors
import { AppDataSource } from './data-source'; // Import the data source

dotenv.config();

const app: Application = express();
const port = config.port; // Use port from config

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
              schemas: { // Define schemas here
                UserProfile: { // This name should match the $ref in users.ts
                  type: 'object',
                  properties: {
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
                    }
                  },
                  required: ['name', 'email'] // Zod schema requires name and email
                },
                Suggestion: { // Schema for vocabulary suggestions
                  type: 'object',
                  properties: {
                    word: {
                      type: 'string',
                      description: 'The suggested word'
                    },
                    definition: {
                      type: 'string',
                      description: 'The definition of the word'
                    },
                    example: {

                      type: 'string',
                      description: 'An example sentence using the word'
                    }
                  },
                  required: ['word', 'definition', 'example']
                },
                ProgressUpdate: { // Schema for progress updates
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
          apis: ['./src/routes/*.ts', './dist/routes/*.js'], // Path to the API routes (include .js for compiled TS)
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

        // Error handling middleware
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
          console.error(err);
        
          if (err instanceof ZodError) {
            res.status(400).json({ errors: err.errors, message: 'Validation error' });
            return;                // return *undefined* – OK for `void`
          }
        
          if (err.name === 'ClerkExpressRequireAuthError') {
            res.status(401).json({ message: 'Unauthorized: Authentication required.' });
            return;
          }
        
          if (err instanceof ApiError) {
            res.status(err.statusCode).json({ message: err.message });
            return;
          }
        
          res.status(500).json({ message: 'Something went wrong!' });
        };

        app.use(errorHandler);

        app.listen(port, () => {
          console.log(`Backend BFF listening on port ${port}`);
        });

    })
    .catch((error) => console.error("Error during Data Source initialization:", error));

# English Learning App BFF Backend

This is the Backend for Frontend (BFF) service for the English Learning App. It is built with Node.js, Express, and TypeScript.

## Features

- **Authentication:** Integrates with Clerk for user authentication.
- **Request Validation:** Uses Zod for validating incoming request data.
- **API Documentation:** Generates API documentation using Swagger.
- **Error Handling:** Implements a global middleware for consistent error handling.
- **Health Check:** Provides a `/health` endpoint to check the service status.
- **Structured Project:** Organized into controllers and services for scalability and maintainability.
- **Database Integration:** Uses TypeORM with SQLite (for development) to manage user profiles and progress.
- **Microservice Integration (Mocked):** Includes a service layer prepared to communicate with a Python microservice for features like vocabulary suggestions (currently mocked).

## Getting Started

...

## Development

1.  Navigate to the `backend` directory.
2.  Install dependencies: `npm install`
3.  Create a `.env` file in the `backend` directory and add your Clerk environment variables:

    ```
    CLERK_SECRET_KEY=your_secret_key
    CLERK_FRONTEND_API=your_frontend_api
    # Optional: Configure Python service URL if not running locally on default port
    # PYTHON_SERVICE_URL=http://localhost:5000
    ```

4.  Start the development server: `npm run dev`

The server will run on port 3000 (or the port specified in your `.env` file).

## Docker Development Container

To run the backend in a development container:

1.  Make sure you have Docker installed.
2.  Navigate to the `backend` directory.
3.  Build the Docker image: `docker build -t english-learning-app-bff-backend-dev .`
4.  Run the Docker container, mounting your local code and the `node_modules` volume to enable hot-reloading and prevent re-installing dependencies on every build:

    ```bash
    docker run -p 3000:3000 \
      -v ${PWD}:/app \
      -v /app/node_modules \
      --env-file .env \
      english-learning-app-bff-backend-dev
    ```
    *   `-p 3000:3000`: Maps port 3000 on your host to port 3000 in the container.
    *   `-v ${PWD}:/app`: Mounts your current directory (`backend`) to `/app` in the container. This allows for hot-reloading code changes.
    *   `-v /app/node_modules`: Creates a volume for `node_modules` inside the container. This is important because `node_modules` should not be overwritten by the host volume mount to avoid inconsistencies with the container's OS and architecture.
    *   `--env-file .env`: Passes environment variables from your `.env` file to the container.

## API Documentation

The API documentation (Swagger UI) will be available at `/api-docs` when the server is running.

## TODO

- [ ] Implement actual communication with the Python microservice.
- [ ] Implement remaining vocabulary features (saving learned words, etc.).
- [ ] Refine database interactions and consider migrations for production.
- [ ] Add more comprehensive error handling and logging.
- [ ] Write tests.
- [ ] Implement authentication for specific routes using Clerk middleware.
- [ ] Secure API endpoints appropriately.

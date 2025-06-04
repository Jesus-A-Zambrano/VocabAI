# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.1] - 2025-06-03

### Fixed
- Aligned `userId` type with `UserProfile.id` in `UserVocabulary`.

## [0.4.2] - 2025-06-04

### Fixed
- Corrected SQLite path to work in production builds

## [0.4.0] - 2025-05-23

### Changed
- Removed the mock in the vocabulary suggestion service; now it queries the repository directly.
- Vocabulary suggestions are now filtered by user level and show the 10 most frequent words.
- Words already learned or previously suggested are no longer shown to the user.
- Fixed access to learned vocabulary IDs in the `UserVocabulary` entity.

### Added
- Added `updateUserProfile` function to update user profiles safely.
- Used Zod's `safeParse` for user profile validation before saving updates.

## [0.3.0] - 2025-05-23

### Added
- Added `updateUserProfile` function to update user profiles safely.
- Used Zod's `safeParse` for user profile validation before saving updates.

## [0.2.1] - 2024-07-30
- Configured CORS to allow global access.

### Added
- Added `level` field to the `UserProfile` entity to store the user's English level.

## [0.2.0] - 2024-07-30

### Added
- Added `level` field to the `UserProfile` entity to store the user's English level.

### Changed
- Modified the `Vocabulary` entity:
  - Added `translation` field for the word's Spanish translation.
  - Renamed `definition` field to `description`.
  - Added `types` field for the word type (e.g., Noun, Verb).
  - Added `level` field for the word's difficulty level.
  - Removed the `example` field.
- Updated the `/api/vocabulary/suggestions` endpoint:
  - Removed the `level` query string parameter.
  - The user's level is now fetched from their `UserProfile`.
  - The response now includes the `id` of the vocabulary word.
- Updated relevant services (`pythonService`, `userService`), controllers (`vocabularyController`), and Swagger documentation (`routes/vocabulary.ts`, `index.ts`) to reflect the changes in the `Vocabulary` and `UserProfile` entities and the `/api/vocabulary/suggestions` endpoint.

## [0.1.0] - 2024-07-29

### Added
- Initial backend setup with Express.js framework.
- TypeORM integration with SQLite for database management.
- Clerk integration for user authentication.
- Swagger UI for API documentation (`/api-docs`).
- Health check endpoint (`/health`).
- User profile management:
    - API endpoints for creating/updating and retrieving user profiles (`/api/users/profile`, `/api/users/me`).
    - `UserProfile` entity to store user details.
- User progress tracking:
    - API endpoints for updating and retrieving user learning progress (`/api/progress/update`, `/api/progress/me`).
    - `UserProgress` entity to store level, score, and completed topics.
- Vocabulary features:
    - API endpoint for fetching word suggestions based on user level (`/api/vocabulary/suggestions`), currently mocked.
    - `Vocabulary` entity for storing words, definitions, and examples.
    - `UserVocabulary` entity to link users with learned vocabulary (basic structure).
- Configuration management using environment variables (`.env` file) for port, Clerk keys, and external service URLs.
- Centralized error handling middleware.
- Basic Zod validation for request inputs.

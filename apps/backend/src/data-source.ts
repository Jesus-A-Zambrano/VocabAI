import "reflect-metadata";
import { DataSource } from "typeorm";

import { UserProfile } from './entity/UserProfile';
import { UserProgress } from './entity/UserProgress';
import { Vocabulary } from './entity/Vocabulary'; // Import the new entity
import { UserVocabulary } from "./entity/UserVocabulary";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/database.sqlite", // SQLite database file
    synchronize: true, // WARNING: synchronize: true is for development only - do not use in production
    logging: false, // Set to true to see SQL logs
    entities: [UserProfile, UserProgress, Vocabulary, UserVocabulary], // Add the new entity here
    migrations: [],
    subscribers: [],
});

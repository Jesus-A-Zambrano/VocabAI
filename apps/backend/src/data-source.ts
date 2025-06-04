import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";

import { UserProfile } from './entity/UserProfile';
import { UserProgress } from './entity/UserProgress';
import { Vocabulary } from './entity/Vocabulary'; // Import the new entity
import { UserVocabulary } from "./entity/UserVocabulary";

const databasePath = path.join(__dirname, "../src/database.sqlite");

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: databasePath, // SQLite database file
    synchronize: true, // WARNING: synchronize: true is for development only - do not use in production
    logging: false, // Set to true to see SQL logs
    entities: [UserProfile, UserProgress, Vocabulary, UserVocabulary], // Add the new entity here
    migrations: [],
    subscribers: [],
});

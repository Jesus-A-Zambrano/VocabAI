import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserVocabulary } from "./UserVocabulary"; // Import the linking entity

@Entity()
export class Vocabulary {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    word!: string;

    @Column()
    translation!: string; // Added translation

    @Column()
    description!: string; // Renamed definition to description

    @Column()
    types!: string; // Added types

    @Column()
    level!: string; // Added level

    // One-to-many relationship with UserVocabulary
    @OneToMany(() => UserVocabulary, userVocabulary => userVocabulary.vocabulary)
    userLearners!: UserVocabulary[];
}

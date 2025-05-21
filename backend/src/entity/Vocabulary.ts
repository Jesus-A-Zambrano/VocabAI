import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserVocabulary } from "./UserVocabulary"; // Import the linking entity

@Entity()
export class Vocabulary {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    word!: string;

    @Column()
    definition!: string;

    @Column()
    example!: string;

    // One-to-many relationship with UserVocabulary
    @OneToMany(() => UserVocabulary, userVocabulary => userVocabulary.vocabulary)
    userLearners!: UserVocabulary[];
}

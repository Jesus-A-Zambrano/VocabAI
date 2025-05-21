import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { UserVocabulary } from "./UserVocabulary"; // Import the linking entity

@Entity()
export class UserProfile {

    @PrimaryColumn()
    id!: string; // Clerk user ID

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column({
        nullable: true
    })
    age?: number;

    // One-to-many relationship with UserVocabulary
    @OneToMany(() => UserVocabulary, userVocabulary => userVocabulary.user)
    learnedVocabulary!: UserVocabulary[];
}

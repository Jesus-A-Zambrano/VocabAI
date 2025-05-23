import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UserProfile } from "./UserProfile";
import { Vocabulary } from "./Vocabulary"; // Import the Vocabulary entity

@Entity()
export class UserVocabulary {

    @PrimaryGeneratedColumn()
    id: number;

    // Many-to-one relationship with UserProfile
    @ManyToOne(() => UserProfile, userProfile => userProfile.learnedVocabulary)
    @JoinColumn({ name: "userId" }) // This column will store the user's ID
    user: UserProfile;

    // Many-to-one relationship with Vocabulary
    @ManyToOne(() => Vocabulary, vocabulary => vocabulary.userLearners)
    @JoinColumn({ name: "vocabularyId" }) // This column will store the vocabulary word's ID
    vocabulary: Vocabulary;

    @Column({
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP"
    })
    learnedAt: Date;

    @Column({
        type: "boolean",
        default: false,
        comment: "Indica si el usuario acertó (true) o falló (false) al aprender la palabra"
    })
    correct: boolean;

    // We can also add a unique constraint to prevent a user from learning the same word multiple times
    // @Index(["user", "vocabulary"], { unique: true })
}

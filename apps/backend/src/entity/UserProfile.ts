import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { UserVocabulary } from "./UserVocabulary"; // Import the linking entity

@Entity()
export class UserProfile {

    @PrimaryColumn()
    id!: string; // Clerk user ID

    @Column()
    email!: string;

    @Column({
        nullable: true // Assuming level might be optional initially
    })
    level!: string; // Added level field

    // One-to-many relationship with UserVocabulary
    @OneToMany(
        () => UserVocabulary,
        uv => uv.user,
        { cascade: ["remove"] }       // si borras un usuario, elimina sus registros
      )
      learnedVocabulary!: UserVocabulary[];
}

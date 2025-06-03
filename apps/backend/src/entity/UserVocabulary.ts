import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Unique,
    RelationId,
  } from "typeorm";
import { UserProfile } from "./UserProfile";
import { Vocabulary } from "./Vocabulary"; // Import the Vocabulary entity

@Entity()
@Unique(["user", "vocabulary"])  // evita que un mismo usuario repita la misma palabra
export class UserVocabulary {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(
    () => UserProfile,
    user => user.learnedVocabulary,
    { onDelete: "CASCADE" }      // al borrar un UserProfile, borra estos registros
  )
  @JoinColumn({ name: "userId" })
  user!: UserProfile;

  // Use string to match UserProfile's primary key type
  @RelationId((uv: UserVocabulary) => uv.user)
  userId!: string;

  @ManyToOne(
    () => Vocabulary,
    vocab => vocab.userLearners,
    { onDelete: "CASCADE" }      // al borrar un Vocabulary, borra estos registros
  )
  @JoinColumn({ name: "vocabularyId" })
  vocabulary!: Vocabulary;

  @RelationId((uv: UserVocabulary) => uv.vocabulary)
  vocabularyId!: number;

  @Column({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  learnedAt!: Date;

  @Column({
    type: "boolean",
    default: false,
    comment: "true si el usuario acertó, false si falló",
  })
  correct!: boolean;
}


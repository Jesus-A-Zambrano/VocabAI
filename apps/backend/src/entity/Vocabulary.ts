import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserVocabulary } from "./UserVocabulary"; // Import the linking entity

@Entity()
export class Vocabulary {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  word!: string;

  @Column()
  translation!: string;

  @Column()
  description!: string;

  @Column()
  types!: string;

  @Column()
  level!: string;
  
  @Column({ type: "integer", default: 0 })
  frequencyCount!: number;

  @OneToMany(
    () => UserVocabulary,
    uv => uv.vocabulary,
    { cascade: ["remove"] }       // si borras un Vocabulary, eliminará sus UserVocabulary
  )
  userLearners!: UserVocabulary[];
}

import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class UserProgress {

    @PrimaryColumn()
    userId: string; // Clerk user ID

    @Column()
    level: string;

    @Column()
    score: number;

    @Column("simple-array", { nullable: true })
    completedTopics: string[];
}

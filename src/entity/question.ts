import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableInheritance} from "typeorm";
import Quiz from "./quiz";
import Attempt from "./attempt";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export default class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    problemStatement: string;

    @Column()
    correctAnswer: string;

    @ManyToOne(() => Quiz, quiz => quiz.questions)
    quiz: Quiz;

    @OneToMany(() => Attempt, attempt => attempt.user)
    attempts: Attempt[];

    constructor(title: string, problemStatement: string, correctAnswer: string) {
        this.title = title;
        this.problemStatement = problemStatement;
        this.correctAnswer = correctAnswer;
    }
}

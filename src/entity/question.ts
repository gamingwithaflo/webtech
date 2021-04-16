import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, TableInheritance} from "typeorm";
import Quiz from "./quiz";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export default class Question {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    title: string;

    @Column()
    problemStatement: string;

    @Column()
    correctAnswer: string;

    @ManyToOne(() => Quiz, quiz => quiz.questions)
    quiz: Quiz;

    constructor(title: string, problemStatement: string, correctAnswer: string) {
        this.title = title;
        this.problemStatement = problemStatement;
        this.correctAnswer = correctAnswer;
    }
}

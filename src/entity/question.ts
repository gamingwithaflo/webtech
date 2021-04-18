/*

- Question table for sqlite -
two types of questions: mpc and open

*/

import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableInheritance} from "typeorm";
import Quiz from "./quiz";
import Attempt from "./attempt";

@Entity()
@TableInheritance({ column: { name: "type", type: "varchar" } })
export default class Question {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    title: string;

    @Column()
    problemStatement: string;

    @Column({ select: false })
    correctAnswer: string;

    @ManyToOne(() => Quiz, quiz => quiz.questions)
    quiz: Quiz;

    @Column()
    type: string

    @OneToMany(() => Attempt, attempt => attempt.user)
    attempts: Attempt[];

    constructor(title: string, problemStatement: string, correctAnswer: string) {
        this.title = title;
        this.problemStatement = problemStatement;
        this.correctAnswer = correctAnswer;
    }
}

import Question from "./question";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Topic from "./topic";
import Attempt from "./attempt";

@Entity()
export default class Quiz {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => Topic, topic => topic.quizzes)
    topic: Topic;

    @OneToMany(() => Question, question => question.quiz)
    questions: Question[];

    @OneToMany(() => Attempt, attempt => attempt.user)
    attempts: Attempt[];

    // score: number;
    // currentQuestion: object;
}

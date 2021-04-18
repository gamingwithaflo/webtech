/*

- Question table for sqlite -
should be self-explanatory

*/

import Question from "./question";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Topic from "./topic";

@Entity()
export default class Quiz {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => Topic, topic => topic.quizzes)
    topic: Topic;

    @OneToMany(() => Question, question => question.quiz)
    questions: Question[];
}

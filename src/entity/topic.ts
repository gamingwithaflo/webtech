import Quiz from "./quiz";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class Topic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    link: string;

    @OneToMany(() => Quiz, quiz => quiz.topic)
    quizzes: Quiz[];
}

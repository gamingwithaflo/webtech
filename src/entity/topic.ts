/*

- Topic table for sqlite -
nothing much to say about this

*/

import Quiz from "./quiz";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class Topic {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    title: string;

    @Column()
    link: string;

    @OneToMany(() => Quiz, quiz => quiz.topic)
    quizzes: Quiz[];
}

import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import User from "./user";
import Quiz from "./quiz";

@Entity()
export default class Attempt {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    grade: number;

    @ManyToOne(() => User, user => user.attempts)
    user: User;

    @ManyToOne(() => Quiz, quiz => quiz.attempts)
    quiz: Quiz;
}

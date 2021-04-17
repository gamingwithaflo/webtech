import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import User from "./user";
import Question from "./question";

@Entity()
export default class Attempt {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    grade: number;

    @ManyToOne(() => User, user => user.attempts)
    user: User;

    @ManyToOne(() => Question, question => question.attempts)
    question: Question;

    @Column({name: "date_time_attempt"})
    dateTimeAttempt: Date;
}

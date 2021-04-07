import Question from './question';
import {ChildEntity, Column} from "typeorm";

@ChildEntity()
export default class MultipleChoice extends Question {
    @Column("simple-array")
    answers: string[];

    constructor(title: string, problemStatement: string, correctAnswer: string, answers: Array<string>) {
        super(title, problemStatement, correctAnswer);
        this.answers = answers;
    }
}

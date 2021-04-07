import Question from './question';
import {ChildEntity} from "typeorm";

@ChildEntity()
export default class Open extends Question {
    constructor(title: string, problemStatement: string, correctAnswer: string) {
        super(title, problemStatement, correctAnswer);
    }
}
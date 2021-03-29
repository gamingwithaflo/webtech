import Question from './question.js';

export default class MultipleChoice extends Question{
    answers: Array<string>;

    constructor(title: string, problemStatement: string, correctAnswer: string, answers: Array<string>) {
        super(title, problemStatement, correctAnswer);
        this.answers = answers;
    }
}

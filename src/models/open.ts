import Question from './question.js';

export default class Open extends Question {
    constructor(title: string, problemStatement: string, correctAnswer: string) {
        super(title, problemStatement, correctAnswer);
    }
}

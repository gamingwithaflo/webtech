import Question from './question.js';

export default class Open extends Question {
    constructor(title, problemStatement, correctAnswer) {
        super(title, problemStatement, correctAnswer);
    }
}

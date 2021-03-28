import Question from './question.js';

export default class MultipleChoice extends Question{
    answers: Array<String>;

    constructor(title, problemStatement, correctAnswer, answers) {
        super(title, problemStatement, correctAnswer);
        this.answers = answers;
    }
}

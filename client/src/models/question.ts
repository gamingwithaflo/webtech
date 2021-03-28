export default class Question {
    title: string;
    problemStatement: string;
    correctAnswer: string;

    constructor(title, problemStatement, correctAnswer) {
        this.title = title;
        this.problemStatement = problemStatement;
        this.correctAnswer = correctAnswer;
    }
}

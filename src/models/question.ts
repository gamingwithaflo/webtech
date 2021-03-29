export default class Question {
    title: string;
    problemStatement: string;
    correctAnswer: string;

    constructor(title: string, problemStatement: string, correctAnswer: string) {
        this.title = title;
        this.problemStatement = problemStatement;
        this.correctAnswer = correctAnswer;
    }
}

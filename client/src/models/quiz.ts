import Question from "./question";

export default class Quiz {
    title: string;
    questions: Array<Question>;
    // score: number;
    // currentQuestion: object;

    constructor(title) {
        this.title = title;
    }

    /*
     * add questions to quiz
     */
    addQuestions(questions) {
        this.questions.push(questions);
    }
}

import Question from "./question";

export default class Quiz {
    title: string;
    questions: Array<Question> = [];
    // score: number;
    // currentQuestion: object;

    constructor(title: string) {
        this.title = title;
    }

    /*
     * add question to quiz
     */
    addQuestion(question: Question) {
        this.questions.push(question);
    }

    /*
     * add questions to quiz
     */
    addQuestions(questions: Array<Question>) {
        this.questions.push(...questions);
    }
}

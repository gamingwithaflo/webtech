import Quiz from "./quiz";

export default class Topic {
    title: string;
    linkToDescription: string;
    quizzes: Array<Quiz> = [];

    constructor(title: string, linkToDescription: string) {
        this.title = title;
        this.linkToDescription = linkToDescription;
    }

    /*
     * add quiz to topic
     */
    addQuiz(quiz: Quiz) {
        this.quizzes.push(quiz);
    }

    /*
     * add quizzes to topic
     */
    addQuizzes(quizzes: Array<Quiz>) {
        this.quizzes.push(...quizzes);
    }
}

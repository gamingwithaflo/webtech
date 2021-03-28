import Quiz from "./quiz";

export default class Topic {
    title: string;
    linkToDescription: string;
    quizzes: Array<Quiz>;

    constructor(title, linkToDescription) {
        this.title = title;
        this.linkToDescription = linkToDescription;
    }

    /*
     * add quizzes to topic
     */
    addQuizzes(quizzes) {
        this.quizzes.push(quizzes);
    }
}

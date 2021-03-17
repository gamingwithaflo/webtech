export default class Question {
    constructor(title, problemStatement, correctAnswer) {
        this.title = title;
        this.problemStatement = problemStatement;
        this.correctAnswer = correctAnswer;
    }

    /*
     * returns section element as general question
     */
    templateQuestion() {
        // section
        const section = document.createElement("section");
        section.setAttribute('class', 'question');

        // title
        var title = document.createElement("h3");
        title.innerText = this.title;
        section.appendChild(title);

        // problem statement
        var problemStatement = document.createElement("p");
        problemStatement.innerText = this.problemStatement;
        section.appendChild(problemStatement);

        return section;
    }
}

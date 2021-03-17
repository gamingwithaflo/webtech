import questionsObject from '../../data/questions.js';
import Assessment from "./assessment.js";
import QuestionFactory from "./questionfactory.js";

/*
 * main function for building assessments
 */
function main() {
    const assessment = new Assessment();
    const questionFactory = new QuestionFactory();

    // loop objects and create questions based on type
    for (let question of questionsObject.questions) {
        assessment.addQuestion(questionFactory.createQuestion(question, question.type));
    }

    // find assessment element by id
    const element = document.getElementById("assessment");

    // title
    const title = document.createElement("h2");
    title.innerText = "Questions";
    element.appendChild(title);

    // append assessment template
    element.appendChild(assessment.template());
}

main();

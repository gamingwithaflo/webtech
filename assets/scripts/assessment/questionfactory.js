import MultipleChoice from "./questions/multiplechoice.js";
import FillInTheBlank from "./questions/fillintheblank.js";

export default class QuestionFactory {
    /*
     * returns question based on type
     */
    createQuestion(question, type) {
        switch(type) {
            case "multiplechoice":
                return new MultipleChoice(question.title, question.problemStatement, question.correctAnswer, question.answers);
                break;
            case "open":
                return new FillInTheBlank(question.title, question.problemStatement, question.correctAnswer);
        }
    }
}

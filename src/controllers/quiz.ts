import { Request, Response } from "express";
import MultipleChoice from "../models/multiplechoice";
import Open from "../models/open";
import Question from "../models/question";

// TODO experimental
enum QuestionType {
    mcq,
    oq
}

// TODO database connection
const questions = [
    {
        "type": "mcq",
        "title": "Question 1",
        "problemStatement": "The lifecycle methods are mainly used for ___.",
        "correctAnswer": "keeping track of event history",
        "answers": [
            "keeping track of event history",
            "enhancing components",
            "freeing up resources",
            "none of the above"
        ]
    },
    {
        "type": "mcq",
        "title": "Question 2",
        "problemStatement": "The lifecycle methods are mainly used for ___.",
        "correctAnswer": "keeping track of event history",
        "answers": [
            "keeping track of event history",
            "enhancing components",
            "freeing up resources",
            "none of the above"
        ]
    }
]
const result: Array<Question> = [];
for (const q of questions) {
    result.push(questionFactory(q, QuestionType.mcq));
}

function questionFactory(question: any, type: QuestionType) {
    switch(type) {
        case QuestionType.mcq:
            return new MultipleChoice(question.title, question.problemStatement, question.correctAnswer, question.answers);
            break;
        case QuestionType.oq:
            return new Open(question.title, question.problemStatement, question.correctAnswer);
    }
}

export const getQuizzes = (req: Request, res: Response) => {
    res.send({
        "quiz": [
            result
        ]
    });
};

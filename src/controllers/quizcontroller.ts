import { Request, Response } from "express";
import Quiz from "../entity/quiz";
import {getRepository, Repository} from "typeorm";

export default class QuizController {
    private quizRepository: Repository<Quiz>;

    constructor() {
        this.quizRepository = getRepository(Quiz);
    }

    /*
     * get quiz
     * route GET /api/assessment/quizzes/:quizId
     */
    async getQuiz(req: Request, res: Response) {
        const items = await this.quizRepository
            .createQueryBuilder("quiz")
            .leftJoinAndSelect("quiz.questions", "question")
            .where("quiz.id = :id", { id: req.params.quizId })
            .getMany();

        res.send(items);
    }
}

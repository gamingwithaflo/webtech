import {getRepository, Repository} from "typeorm";
import {Request, Response} from "express";
import Attempt from "../entity/attempt";
import User from "../entity/user"

export default class AttemptController {
    private attemptRepository: Repository<Attempt>;

    constructor() {
        this.attemptRepository = getRepository(Attempt);
    }

    /*
     * get attempts
     * @route GET /api/attempts
     */
    async getAttempts(req: Request, res: Response) {
      if(req.user) {
        const user = req.user as User;
        const userId = user.id;

        const items = await this.attemptRepository
            .createQueryBuilder("attempt")
            .where("attempt.user.id = :user_id", {user_id: userId})
            .getMany();

        res.json(items);
      } else {
        const errMsg = { msg: "User is not logged in" };
        res.json(errMsg);
      }
    }

    async getLastAttempt(req: Request, res: Response) {
      if(req.user) {
        const user = req.user as User;
        const userId = user.id;

        const item = await this.attemptRepository
          .createQueryBuilder("attempt")
          .where("attempt.user.id = :user_id", {user_id: userId})
          .orderBy("dateTimeAttempt", "DESC")
          .limit(1)
          .getOne();

          res.json(item);
      } else {
        const errMsg = { msg: "User is not logged in" };
        res.json(errMsg);
      }
    }

    /*
     * post attempt
     * @route POST /api/attempts
     */
    async postAttempt(req: Request, res: Response) {
      if(req.user) {
        // TODO api: check if user logged in and set attempt
        const questionId = req.query.questionId;
        const newGrade = 10;

        const questionFromId = await this.attemptRepository
          .createQueryBuilder("question")
          .where("question.id = :question_id", {question_id: questionId})
          .getOne();

        await this.attemptRepository
          .createQueryBuilder()
          .insert()
          .into(Attempt)
          .values([
            {question: questionFromId, user: req.user, grade: newGrade}
          ])
          .execute();
      } else {
        const errMsg = { msg: "User is not logged in" };
        res.json(errMsg);
      }
    }
}

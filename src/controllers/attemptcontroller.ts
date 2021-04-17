import {getRepository, Repository} from "typeorm";
import {Request, Response} from "express";
import Attempt from "../entity/attempt";

export default class Attemptcontroller {
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
        // @ts-ignore
        const userId = req.user.id;

        const items = await this.attemptRepository
            .createQueryBuilder("attempt")
            .where("attempt.user_id = :user_id", {user_id: userId})
            .getMany();

        res.json(items);
      } else {
        res.redirect("/login");
      }
    }

    async getLastAttempt(req: Request, res: Response) {
      if(req.user) {
        const item = await this.attemptRepository
          .createQueryBuilder("attempt")
          .orderBy("dateTimeAttempt", "DESC")
          .limit(1)
          .getOne();

          res.json(item);
      } else {
        res.redirect("/login");
      }
    }

    /*
     * post attempt
     * @route GET /api/attempts
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
        res.redirect("/login");
      }
    }
}

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
    getAttempts(req: Request, res: Response) {
        res.json({});
    }

    /*
     * post attempt
     * @route GET /api/attempts
     */
    postAttempt(req: Request, res: Response) {
        // TODO api: check if user logged in and set attempt
        res.json({});
    }
}
